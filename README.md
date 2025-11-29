# SyncBrew - Hero Component

Bu proje, Threlte (Svelte için Three.js wrapper) kullanarak oluşturulmuş bir Hero bileşeni içerir.

## Özellikler

- ✨ Fotorealistik 3D kahve fincanı
- 🎭 Yavaş yüzen ve dönen animasyon
- 💡 Volümetrik aydınlatma ile dramatik atmosfer
- 🖱️ Fare hareketine göre kamera parallax efekti
- 📝 "Taste the Future" başlığı mix-blend-mode ile 3D sahneye entegre

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

## Kullanım

Hero bileşenini projenizde şu şekilde kullanabilirsiniz:

```svelte
<script>
	import Hero from './Hero.svelte';
</script>

<Hero />
```

## Notlar

- Kahve fincanı şu anda basit geometrilerle oluşturulmuştur. Daha fotorealistik bir görünüm için GLTF modeli kullanabilirsiniz.
- GLTF modeli kullanmak için `@threlte/extras` paketinden `GLTF` bileşenini import edin ve model yolunu belirtin.

