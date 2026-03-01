const { products } = require('./data');

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

async function handleProducts(req, res, pathname, method) {
	// GET /api/products
	if (method === 'GET' && pathname === '/api/products') {
		return sendJSON(res, 200, products);
	}

	// Routes with id: /api/products/:id
	if (pathname.startsWith('/api/products/')) {
		const parts = pathname.split('/').filter(Boolean);
		if (parts.length === 3 && parts[0] === 'api' && parts[1] === 'products') {
			const id = Number(parts[2]);
			if (!Number.isInteger(id)) return sendJSON(res, 400, { error: 'Invalid id' });

			const index = products.findIndex(p => p.id === id);
			const existing = products[index];

			if (method === 'GET') {
				if (!existing) return sendJSON(res, 404, { error: 'Product not found' });
				return sendJSON(res, 200, existing);
			}

			if (method === 'PUT') {
				try {
					const body = await parseJSONBody(req);
					if (!body || typeof body.name !== 'string' || typeof body.price !== 'number' || typeof body.categoryId !== 'number') {
						return sendJSON(res, 400, { error: 'Invalid product data. Require name(string), price(number), categoryId(number).' });
					}
					if (index === -1) return sendJSON(res, 404, { error: 'Product not found' });
					const replaced = { id, name: body.name, price: body.price, categoryId: body.categoryId };
					products[index] = replaced;
					return sendJSON(res, 200, replaced);
				} catch (err) {
					return sendJSON(res, 400, { error: 'Invalid JSON body' });
				}
			}

			if (method === 'PATCH') {
				try {
					const body = await parseJSONBody(req);
					if (index === -1) return sendJSON(res, 404, { error: 'Product not found' });
					if (!body || typeof body !== 'object') return sendJSON(res, 400, { error: 'Invalid JSON body' });
					if (body.id && Number(body.id) !== id) return sendJSON(res, 400, { error: 'ID in body does not match URL' });
					const updated = Object.assign({}, existing, body);
					products[index] = updated;
					return sendJSON(res, 200, updated);
				} catch (err) {
					return sendJSON(res, 400, { error: 'Invalid JSON body' });
				}
			}

			if (method === 'DELETE') {
				if (index === -1) return sendJSON(res, 404, { error: 'Product not found' });
				products.splice(index, 1);
				res.writeHead(204);
				return res.end();
			}
		}
	}

	return false;
}

module.exports = { handleProducts };
