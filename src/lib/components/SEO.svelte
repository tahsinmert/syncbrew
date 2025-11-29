<script lang="ts">
	import { onMount } from 'svelte';
	
	interface Props {
		title: string;
		description: string;
		image?: string;
		type?: 'website' | 'article';
	}

	let { title, description, image, type = 'website' }: Props = $props();

	// Get current URL from window.location (browser only)
	let currentUrl = '';
	let origin = '';

	onMount(() => {
		if (typeof window !== 'undefined') {
			currentUrl = window.location.href;
			origin = window.location.origin;
		}
	});

	// Generate full canonical URL using window.location
	const canonicalUrl = $derived(
		typeof window !== 'undefined' && window.location
			? `${window.location.origin}${window.location.pathname}${window.location.search}`
			: ''
	);

	// Use provided image or fallback to default
	const ogImage = $derived(image || '/syncbrew-og.jpg');
	
	// Ensure image URL is absolute
	const ogImageUrl = $derived(
		ogImage.startsWith('http')
			? ogImage
			: typeof window !== 'undefined' && window.location
				? `${window.location.origin}${ogImage}`
				: ogImage
	);

	// Format title with pattern: "{title} | SyncBrew - Luxury Coffee"
	const formattedTitle = $derived(`${title} | SyncBrew - Luxury Coffee`);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{formattedTitle}</title>
	<meta name="title" content={formattedTitle} />
	<meta name="description" content={description} />

	<!-- Canonical URL -->
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={formattedTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="SyncBrew" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonicalUrl} />
	<meta name="twitter:title" content={formattedTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImageUrl} />
</svelte:head>

