/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const baseUrl = 'https://syncbrew.vercel.app';
	
	// Define all static routes
	const routes = [
		'',
		'/origin',
		'/process',
		'/shop',
		'/cart',
		'/reservation'
	];
	
	// Generate sitemap XML
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `	<url>
		<loc>${baseUrl}${route}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}

