<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Dummy data untuk gambar Marquee
const marqueeImages = [
  'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop'
]

// State untuk Coverflow Kategori Utama
const activeCategory = ref(1) // Default tengah (Video Editor)

const mainCategories = [
  { id: 0, title: 'Graphic Design', desc: 'Social media, branding, and visual identity.', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop' },
  { id: 1, title: 'Video Editor', desc: 'Cinematic storytelling and commercial editing.', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, title: 'Photography', desc: 'Capturing moments with precision and atmospheric depth.', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop' }
]

// Data Kategori Lainnya (Meta Ads, dll)
const otherCategories = [
  { title: 'Meta Ads Campaigns', tag: 'Marketing' },
  { title: 'Color Grading', tag: 'Post-Production' },
  { title: 'Print & Editorial', tag: 'Design' },
  { title: 'Drone Operation', tag: 'Videography' }
]
</script>

<template>
  <section id="work" class="relative z-10 w-full pt-20 pb-32 flex flex-col overflow-hidden">
    
    <!-- 1. THEME BREAK: INFINITE MARQUEE MIRING -->
    <div class="relative w-[110vw] -ml-[5vw] bg-[#e1e2eb] text-[#07090F] py-16 md:py-24 -rotate-3 scale-110 z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col gap-6 md:gap-8 overflow-hidden">
      <div class="px-10 max-w-6xl mx-auto w-full mb-4">
        <h2 class="text-3xl md:text-5xl font-light tracking-tight">
          Visual <span class="font-serif italic text-cyan-700">Explorations</span>
        </h2>
        <p class="text-sm font-normal text-gray-600 mt-2 uppercase tracking-widest">A glimpse into the creative process</p>
      </div>

      <!-- Track 1: Kiri -->
      <div class="flex whitespace-nowrap animate-marquee-left items-center gap-4 md:gap-8 w-max">
        <template v-for="n in 2" :key="'track1-'+n">
          <div v-for="(img, idx) in marqueeImages" :key="idx" class="w-48 md:w-80 aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-300 relative group">
            <img :src="img" class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" alt="Work Process" />
          </div>
        </template>
      </div>

      <!-- Track 2: Kanan -->
      <div class="flex whitespace-nowrap animate-marquee-right items-center gap-4 md:gap-8 w-max -ml-40 md:-ml-80">
        <template v-for="n in 2" :key="'track2-'+n">
          <div v-for="(img, idx) in marqueeImages.slice().reverse()" :key="idx" class="w-40 md:w-64 aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-300 relative group">
            <img :src="img" class="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" alt="Work Process" />
          </div>
        </template>
      </div>
    </div>

    <!-- 2. MAIN CATEGORIES: COVERFLOW -->
    <div class="relative w-full h-[500px] flex items-center justify-center gap-4 px-4 overflow-x-auto snap-x snap-mandatory pb-4">
  
  <template v-for="(cat, i) in mainCategories" :key="cat.id">
    <!-- Tambahin snap-center biar pas digeser dia berhenti tepat di tengah -->
    <div 
      @click="activeCategory = i"
      class="snap-center shrink-0 transition-all duration-700 ease-out cursor-pointer rounded-[2rem] overflow-hidden relative border border-white/10 group flex flex-col justify-end"
      :class="[
        // Di mobile (w-[280px]), di desktop (responsive sesuai logic aktif)
        activeCategory === i 
          ? 'w-[280px] md:w-[400px] h-[400px] md:h-[500px] z-30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
          : 'w-[240px] md:w-[300px] h-[350px] md:h-[400px] z-10 opacity-60 hover:opacity-100'
      ]"
    >
      <img :src="cat.img" :alt="cat.title" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#07090F] to-transparent"></div>

      <div class="relative p-6 md:p-8">
        <h3 class="text-xl md:text-2xl font-light text-white">{{ cat.title }}</h3>
        
        <!-- View Portfolio Link (Pastikan RouterLink dipanggil) -->
        <RouterLink 
          :to="`/work/${cat.title.toLowerCase().replace(/\s+/g, '-')}`"
          @click.stop
          v-show="activeCategory === i" 
          class="mt-2 flex items-center gap-2 text-cyan-400 text-xs md:text-sm hover:underline"
        >
          View Portfolio &rarr;
        </RouterLink>
      </div>
    </div>
  </template>
</div>

    <!-- 3. OTHER CATEGORIES (RouterLink Area) -->
    <div class="max-w-[1440px] mx-auto w-full px-6 md:px-12 mt-24 md:mt-32 relative z-30" data-aos="fade-up">
      <div class="border-t border-white/10 pt-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h3 class="text-2xl font-light text-white">Other <span class="font-serif italic text-cyan-400">Expertise</span></h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- ROUTER LINK AMAN DI SINI -->
          <RouterLink 
  v-for="(cat, i) in otherCategories" :key="i"
  :to="`/work/${cat.title.toLowerCase().replace(/\s+/g, '-')}`"
  class="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors cursor-pointer group block"
>
            <span class="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-normal group-hover:text-cyan-400 transition-colors">{{ cat.tag }}</span>
            <h4 class="text-lg font-normal text-white mt-2">{{ cat.title }}</h4>
            <div class="mt-6 w-8 h-px bg-white/20 group-hover:bg-cyan-400 group-hover:w-12 transition-all duration-300"></div>
          </RouterLink>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.animate-marquee-left { animation: marqueeLeft 40s linear infinite; }
.animate-marquee-right { animation: marqueeRight 35s linear infinite; }
@keyframes marqueeLeft { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
@keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
</style>