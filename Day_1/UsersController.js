const { users } = require('./data');

function sendJSON(res, statusCode, payload) {
	const body = JSON.stringify(payload);
	res.writeHead(statusCode, { 'Content-Type': 'application/json' });
	res.end(body);
}

function parseJSONBody(req) {
	return new Promise((resolve, reject) => {
		let data = '';
		req.on('data', chunk => { data += chunk; });
		req.on('end', () => {
			if (!data) return resolve(null);
			try { resolve(JSON.parse(data)); } catch (err) { reject(err); }
		});
		req.on('error', err => reject(err));
	});
}

async function handleUsers(req, res, pathname, method) {
	// GET /api/users
	if (method === 'GET' && pathname === '/api/users') {
		return sendJSON(res, 200, users);
	}

	// Routes with id: /api/users/:id
	if (pathname.startsWith('/api/users/')) {
		const parts = pathname.split('/').filter(Boolean);
		if (parts.length === 3 && parts[0] === 'api' && parts[1] === 'users') {
			const id = Number(parts[2]);
			if (!Number.isInteger(id)) return sendJSON(res, 400, { error: 'Invalid id' });

			const index = users.findIndex(u => u.id === id);
			const existing = users[index];

			if (method === 'GET') {
				if (!existing) return sendJSON(res, 404, { error: 'User not found' });
				return sendJSON(res, 200, existing);
			}

			if (method === 'PATCH') {
				try {
					const body = await parseJSONBody(req);
					if (index === -1) return sendJSON(res, 404, { error: 'User not found' });
					if (!body || typeof body !== 'object') return sendJSON(res, 400, { error: 'Invalid JSON body' });
					if (body.id && Number(body.id) !== id) return sendJSON(res, 400, { error: 'ID in body does not match URL' });
					const updated = Object.assign({}, existing, body);
					users[index] = updated;
					return sendJSON(res, 200, updated);
				} catch (err) {
					return sendJSON(res, 400, { error: 'Invalid JSON body' });
				}
			}

			if (method === 'DELETE') {
				if (index === -1) return sendJSON(res, 404, { error: 'User not found' });
				users.splice(index, 1);
				res.writeHead(204);
				return res.end();
			}
		}
	}

	// POST /api/users
	if (method === 'POST' && pathname === '/api/users') {
		try {
			const body = await parseJSONBody(req);
			if (!body || typeof body.name !== 'string' || typeof body.email !== 'string' || typeof body.password !== 'string') {
				return sendJSON(res, 400, { error: 'Invalid user data. Require name(string), email(string), password(string).' });
			}
			const newId = Math.max(...users.map(u => u.id), 0) + 1;
			const newUser = { id: newId, name: body.name, email: body.email, password: body.password };
			users.push(newUser);
			return sendJSON(res, 201, newUser);
		} catch (err) {
			return sendJSON(res, 400, { error: 'Invalid JSON body' });
		}
	}

	return false;
}

module.exports = { handleUsers };
