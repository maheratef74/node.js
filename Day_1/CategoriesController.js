const { categories } = require('./data');

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

async function handleCategories(req, res, pathname, method) {
	if (method === 'GET' && pathname === '/api/categories') {
		return sendJSON(res, 200, categories);
	}

	if (method === 'POST' && pathname === '/api/categories') {
		try {
			const body = await parseJSONBody(req);
			if (!body || typeof body.name !== 'string') {
				return sendJSON(res, 400, { error: 'Invalid category data. Require name(string).' });
			}
			const newId = Math.max(...categories.map(c => c.id), 0) + 1;
			const newCategory = { id: newId, name: body.name };
			categories.push(newCategory);
			return sendJSON(res, 201, newCategory);
		} catch (err) {
			return sendJSON(res, 400, { error: 'Invalid JSON body' });
		}
	}

	return false;
}

module.exports = { handleCategories };
