/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const baseUrl = 'https://syncbrew.vercel.app';
	
	const robots = `User-agent: *
Allow: /
Disallow: /cart
Disallow: /account

Sitemap: ${baseUrl}/sitemap.xml
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

