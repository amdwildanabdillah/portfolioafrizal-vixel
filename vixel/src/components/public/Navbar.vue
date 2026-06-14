<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
const closeMenu = () => isMobileMenuOpen.value = false
</script>

<template>
  <nav
    data-aos="fade-down"
    data-aos-delay="100"
    class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] max-w-4xl z-50 rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl px-4 md:px-5 py-2.5 md:py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-300"
  >
    <a href="#home" class="text-xl font-medium tracking-wide text-white flex items-center gap-1.5 group pl-2 hover:opacity-80 transition-opacity">
      Af Rizal<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mb-0.5 group-hover:scale-150 transition-transform"></span>
    </a>

    <div class="hidden md:flex items-center gap-8 text-xs font-normal text-gray-400">
      <a href="#home" class="hover:text-white transition-colors">Home</a>
      <a href="#about" class="hover:text-white transition-colors">About</a>
      <a href="#visualexploration" class="hover:text-white transition-colors">Work</a>

      <a href="/resume.pdf" target="_blank" class="hover:text-white transition-colors flex items-center gap-1.5">
        Resume
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </a>
    </div>

    <div class="flex items-center gap-3 relative">
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden text-white/80 p-1.5 hover:text-white transition-colors focus:outline-none"
      >
        <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"/>
          <line x1="4" x2="20" y1="6" y2="6"/>
          <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" x2="6" y1="6" y2="18"/>
          <line x1="6" x2="18" y1="6" y2="18"/>
        </svg>
      </button>

      <a href="#footer" class="px-5 py-2 rounded-full bg-white text-[#07090F] text-xs font-medium active:scale-95 md:hover:scale-105 transition-transform flex items-center gap-2">
        Connect
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="hidden md:block">
          <path d="M5 12h14"/>
          <path d="m12 5 7 7-7 7"/>
        </svg>
      </a>
    </div>

    <div
      v-show="isMobileMenuOpen"
      class="absolute top-full left-0 mt-3 w-full rounded-2xl border border-white/20 bg-[#07090F]/80 backdrop-blur-2xl p-4 flex flex-col items-center gap-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] md:hidden z-40"
    >
      <a href="#home" @click="closeMenu" class="text-sm font-normal text-white/80 hover:text-white w-full text-center py-2 border-b border-white/5">Home</a>
      <a href="#about" @click="closeMenu" class="text-sm font-normal text-white/80 hover:text-white w-full text-center py-2 border-b border-white/5">About</a>
      <a href="#visualexploration" @click="closeMenu" class="text-sm font-normal text-white/80 hover:text-white w-full text-center py-2 border-b border-white/5">Work</a>
      <a href="/resume.pdf" target="_blank" @click="closeMenu" class="text-sm font-normal text-cyan-400 w-full text-center py-2">Resume PDF</a>
    </div>
  </nav>
</template>
