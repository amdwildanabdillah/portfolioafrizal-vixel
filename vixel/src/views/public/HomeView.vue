<script setup>
import Navbar from '@/components/public/Navbar.vue'
import Hero from '@/components/public/Hero.vue'
import AboutSnippet from '@/components/public/AboutSnippet.vue'
import VisualExploration from '@/components/public/VisualExploration.vue'
import WorkSection from '@/components/public/WorkSection.vue'
import Footer from '@/components/public/Footer.vue'
</script>

<template>
  <main class="relative w-full">
    <Navbar />
    <Hero />
    <AboutSnippet />
    <VisualExploration />
    <WorkSection />
    <Footer />
  </main>
</template>