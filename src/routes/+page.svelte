<script>
	import '../app.css';
	import Footer from '$lib/components/landing/Footer.svelte';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import FeaturesSection from '$lib/components/landing/FeaturesSection.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
	import CallToAction from '$lib/components/landing/CallToAction.svelte';
	import NavBar from '$lib/components/landing/NavBar.svelte';
</script>

<NavBar />
<main class="font-sans bg-white text-gray-900">
	<HeroSection />
	<FeaturesSection />
	<HowItWorks />
	<CallToAction />
</main>

<Footer />