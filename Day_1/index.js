const http = require('http');
const { handleProducts } = require('./ProductsController');
const { handleCategories } = require('./CategoriesController');
const { handleUsers } = require('./UsersController');

function sendJSON(res, statusCode, payload) {
	const body = JSON.stringify(payload);
	res.writeHead(statusCode, { 'Content-Type': 'application/json' });
	res.end(body);
}

const server = http.createServer(async (req, res) => {
	const url = req.url || '';
	const pathname = url.split('?')[0];
	const method = (req.method || 'GET').toUpperCase();

	if (await handleProducts(req, res, pathname, method)) return;
	if (await handleCategories(req, res, pathname, method)) return;
	if (await handleUsers(req, res, pathname, method)) return;

	sendJSON(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:3000`);
});

server.on('error', (err) => {
	console.error('Server error:', err);
	process.exit(1);
});