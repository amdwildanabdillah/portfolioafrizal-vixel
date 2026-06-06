<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
  })
})
</script>

<template>
  <!-- GLOBAL DYNAMIC BACKGROUND -->
  <div class="fixed inset-0 z-0 bg-[#07090F] pointer-events-none">
    <!-- Layer 1: Noise Texture -->
    <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
    
    <!-- Layer 2: Animated Floating Orbs -->
    <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px] animate-blob"></div>
    <div class="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
  </div>

  <!-- MAIN VIEWPORT -->
  <div class="relative z-10 min-h-screen w-full overflow-x-hidden text-white font-sans">
    <RouterView />
  </div>
</template>

<style>
/* Pindah CSS Animasi ke sini biar berlaku global */
.animate-blob {
  animation: blob 10s infinite alternate;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
</style>