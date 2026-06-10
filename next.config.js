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

		if (nodeEnv === 'production') {
			headers.push({
				key: 'Content-Security-Policy',
				value: [
					"default-src 'self'",
					"base-uri 'self'",
					"frame-ancestors 'none'",
					"form-action 'self'",
					"object-src 'none'",
					"img-src 'self' data: https:",
					"font-src 'self' data:",
					"style-src 'self' 'unsafe-inline'",
					"script-src 'self' 'unsafe-inline'",
					"connect-src 'self' https://au-api.basiq.io https://consent.basiq.io",
					'upgrade-insecure-requests',
				].join('; '),
			});
		}

		return [
			{
				source: '/:path*',
				headers,
			},
		];
	},
};

module.exports = nextConfig;
