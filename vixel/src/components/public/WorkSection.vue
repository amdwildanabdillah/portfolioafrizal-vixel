<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
// Tambahkan Navigation module
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { supabase } from '@/utils/supabase'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const swiperModules = [EffectCoverflow, Pagination, Navigation]

const mainCategories = ref([])
const otherCategories = ref([])
const isLoading = ref(true)

const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('work_categories')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) throw error

    if (data) {
      mainCategories.value = data.filter(cat => cat.is_main === true)
      otherCategories.value = data.filter(cat => cat.is_main === false)
    }
  } catch (error) {
    console.error('Gagal mengambil kategori:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <section class="relative w-full bg-[#050505] pt-24 md:pt-32 pb-24 z-20 overflow-hidden">
    
    <!-- ====== BACKGROUND SHOW OFF (AGENCY STYLE) ====== -->
    <!-- 1. Tekstur Noise/Grain tipis -->
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    
    <!-- 2. Typography Outline Raksasa di Background -->
    <div class="absolute top-[15%] left-[-5%] text-[18vw] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.04)] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap overflow-hidden z-0">
      CREATIVE
    </div>
    <div class="absolute bottom-[25%] right-[-5%] text-[18vw] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap overflow-hidden z-0">
      WORKS
    </div>

    <!-- 3. Ambient Glow yang lebih maskulin/gelap -->
    <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    <!-- ============================================== -->

    <div class="max-w-6xl mx-auto w-full flex flex-col justify-center relative z-10">

      <!-- Teks Header -->
      <div class="px-6 mb-8 md:mb-12 text-center">
        <h2 class="text-3xl md:text-5xl font-light text-white tracking-wide">
          Featured <span class="font-serif italic text-cyan-500">Disciplines.</span>
        </h2>
        <p class="text-white/50 font-light mt-3 max-w-md mx-auto text-[11px] md:text-sm tracking-widest uppercase">Pillars of my creative expertise</p>
      </div>

      <!-- State Loading -->
      <div v-if="isLoading" class="w-full h-[240px] md:h-[300px] flex items-center justify-center">
        <p class="text-white/50 text-sm animate-pulse tracking-widest uppercase">Memuat Disiplin...</p>
      </div>

      <!-- CAROUSEL WRAPPER -->
      <div v-else class="w-full relative px-4 md:px-0">
        
        <Swiper
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :loop="true"
          :navigation="{ nextEl: '.sw-next', prevEl: '.sw-prev' }"
          :coverflowEffect="{ rotate: 0, stretch: 0, depth: 100, modifier: 1.5, slideShadows: false }"
          :pagination="{ clickable: true }"
          :modules="swiperModules"
          class="w-full h-full pb-16"
        >
          <!-- UKURAN BARU: Desktop 300x240, Mobile 250x200 (Rasio sama persis) -->
          <SwiperSlide v-for="(cat, i) in mainCategories" :key="cat.id" class="my-swiper-slide w-[250px] h-[200px] md:w-[300px] md:h-[240px] rounded-3xl overflow-hidden relative border border-white/10 group bg-[#050505]">
            
            <!-- Gambar & Overlay -->
            <div class="absolute inset-0">
              <img :src="cat.image_url || '/images/landscape/landsape8.webp'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <!-- Gradient Overlay (Diperpekat agar teks terbaca jelas) -->
              <div class="card-overlay absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/70 to-transparent transition-opacity duration-500"></div>
            </div>

            <!-- KONTEN DALAM CARD -->
            <div class="card-content absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
              
              <!-- Top: Circle Kaca Penomoran -->
              <div class="flex justify-start">
                <div class="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                  <span class="text-white font-bold text-[11px]">{{ i + 1 }}</span>
                </div>
              </div>

              <!-- Bottom: Text & Action -->
              <div class="flex justify-between items-end gap-3 w-full">
                
                <div class="flex flex-col items-start w-[75%]">
                  <h3 class="text-lg md:text-xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                    {{ cat.title }}
                  </h3>
                  <p class="text-gray-300 font-medium mt-1 text-[10px] md:text-xs line-clamp-2 drop-shadow-md">
                    {{ cat.description || 'Eksplorasi karya dalam disiplin ini.' }}
                  </p>
                </div>

                <RouterLink :to="`/category/${cat.slug}`" class="mb-1 shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)] group/btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform -rotate-45 group-hover/btn:rotate-0 transition-transform">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </RouterLink>

              </div>

            </div>
          </SwiperSlide>
        </Swiper>

        <!-- KONTROL NAVIGASI MANUAL (Panah Kiri & Kanan) -->
        <div class="absolute top-[40%] left-0 right-0 w-full flex justify-between px-2 md:px-8 z-30 pointer-events-none">
          <button class="sw-prev w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all pointer-events-auto shadow-xl">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button class="sw-next w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all pointer-events-auto shadow-xl">
            <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>

      <!-- KATEGORI SAMPINGAN (Pill Buttons Arrow Diagonal) -->
      <div v-if="otherCategories.length > 0" class="max-w-3xl mx-auto w-full px-6 mt-2 md:mt-6 z-20">
        <div class="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          
          <RouterLink 
            v-for="cat in otherCategories" 
            :key="cat.id" 
            :to="`/category/${cat.slug}`" 
            class="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center gap-2.5 group shadow-sm"
          >
            <h4 class="text-[11px] md:text-xs font-medium text-white/60 group-hover:text-white transition-colors tracking-wide">
              {{ cat.title }}
            </h4>
            <!-- Icon Panah Diagonal Serong Kanan Atas -->
            <svg class="w-3 h-3 text-white/30 group-hover:text-cyan-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </RouterLink>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* DOT PAGINATION: Dibesarkan & Diterangkan */
:deep(.swiper-pagination-bullet) {
  background-color: rgba(255, 255, 255, 0.4); /* Lebih terang */
  width: 8px; /* Lebih besar */
  height: 8px;
  transition: all 0.3s ease;
  margin: 0 6px !important;
}
:deep(.swiper-pagination-bullet-active) {
  background-color: #ffffff;
  width: 24px; /* Pill memanjang */
  border-radius: 4px;
}
:deep(.swiper-pagination) {
  bottom: 0px !important;
}

/* Transisi Card Blur & Scale */
.my-swiper-slide:not(.swiper-slide-active) {
  opacity: 0.35;
  filter: blur(2px);
  transform: scale(0.9);
}
.my-swiper-slide:not(.swiper-slide-active) .card-overlay {
  opacity: 0.95 !important;
}
.my-swiper-slide:not(.swiper-slide-active) .card-content {
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}
.swiper-slide-active .card-overlay {
  opacity: 1 !important;
}
.swiper-slide-active .card-content {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
</style>