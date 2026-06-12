/** @type {import('next').NextConfig} */
const ALLOWED_NODE_ENVS = ['development', 'test', 'production'];

function getValidatedNodeEnv() {
	const nodeEnv = process.env.NODE_ENV ?? 'development';
	if (!ALLOWED_NODE_ENVS.includes(nodeEnv)) {
		throw new Error(`Invalid NODE_ENV value: ${nodeEnv}`);
	}
	return nodeEnv;
}

const nextConfig = {
	turbopack: {
		root: __dirname,
	},

	async headers() {
		const nodeEnv = getValidatedNodeEnv();
		const headers = [
			{ key: 'X-Frame-Options', value: 'DENY' },
			{ key: 'X-Content-Type-Options', value: 'nosniff' },
			{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
			{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
			{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
		];

		// CSP is now handled by pages/_document.js with per-request nonce
		// to prevent 'unsafe-inline' script/style execution.

		return [
			{
				source: '/:path*',
				headers,
			},
		];
	},
};

module.exports = nextConfig;
