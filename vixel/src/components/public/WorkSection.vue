<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
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
  <section class="relative w-full bg-[#050505] pt-20 md:pt-24 pb-16 z-20 overflow-hidden">
    
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    
    <div class="absolute top-[12%] left-[-2%] text-[16vw] font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.08)] text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap overflow-hidden z-0">
      CREATIVE
    </div>
    <div class="absolute bottom-[20%] right-[-2%] text-[16vw] font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.08)] text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap overflow-hidden z-0">
      WORKS
    </div>

    <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

    <div class="max-w-6xl mx-auto w-full flex flex-col justify-center relative z-10">

      <div class="px-6 mb-8 md:mb-10 text-center">
        <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-wide">
          Featured <span class="font-serif italic text-cyan-500 font-normal">Disciplines.</span>
        </h2>
        <p class="text-white/60 font-medium mt-2 max-w-md mx-auto text-[11px] md:text-sm tracking-widest uppercase">Pillars of my creative expertise</p>
      </div>

      <div v-if="isLoading" class="w-full h-[300px] md:h-[360px] flex items-center justify-center">
        <p class="text-white/50 text-sm animate-pulse tracking-widest uppercase font-medium">Memuat Disiplin...</p>
      </div>

      <div v-else class="w-full h-[300px] md:h-[360px] relative px-4 md:px-0">
        
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
          class="w-full h-full pb-14"
        >
          <SwiperSlide v-for="(cat, i) in mainCategories" :key="cat.id" class="my-swiper-slide w-[200px] h-[260px] md:w-[240px] md:h-[320px] rounded-[1.5rem] overflow-hidden relative border border-white/10 group bg-[#050505]">
            
            <div class="absolute inset-0">
              <img :src="cat.image_url || '/images/landscape/landsape8.webp'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <div class="card-overlay absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent transition-opacity duration-500"></div>
            </div>

            <div class="card-content absolute inset-0 p-4 md:p-5 flex flex-col justify-between">
              
              <div class="flex justify-start">
                <div class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                  <span class="text-white font-bold text-[10px] md:text-[11px]">{{ i + 1 }}</span>
                </div>
              </div>

              <div class="flex justify-between items-end gap-2 w-full">
                <div class="flex flex-col items-start w-[60%]">
                  <h3 class="text-lg md:text-xl font-bold text-white tracking-wide leading-tight drop-shadow-md">
                    {{ cat.title }}
                  </h3>
                  <p class="text-gray-300 font-medium mt-1 text-[9px] md:text-[10px] line-clamp-2 drop-shadow-md">
                    {{ cat.description || 'Eksplorasi karya dalam disiplin ini.' }}
                  </p>
                </div>

                <RouterLink :to="`/category/${cat.slug}`" class="mb-0.5 shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)] group/btn gap-1 md:gap-1.5">
                  <span class="text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Visit</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform -rotate-45 group-hover/btn:rotate-0 transition-transform">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </RouterLink>
              </div>

            </div>
          </SwiperSlide>
        </Swiper>

        <div class="absolute top-[40%] md:top-[45%] left-0 right-0 w-full flex justify-between px-2 md:px-8 z-30 pointer-events-none">
          <button class="sw-prev w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all pointer-events-auto shadow-xl">
            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button class="sw-next w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:scale-110 transition-all pointer-events-auto shadow-xl">
            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>

      <div v-if="otherCategories.length > 0" class="max-w-3xl mx-auto w-full px-6 mt-0 md:mt-4 z-20">
        <div class="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          
          <RouterLink 
            v-for="cat in otherCategories" 
            :key="cat.id" 
            :to="`/category/${cat.slug}`" 
            class="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center gap-2.5 group shadow-sm"
          >
            <h4 class="text-[11px] md:text-[11.5px] font-medium text-white/60 group-hover:text-white transition-colors tracking-wide">
              {{ cat.title }}
            </h4>
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
:deep(.swiper-pagination-bullet) {
  background-color: rgba(255, 255, 255, 0.4);
  width: 6px;
  height: 6px;
  transition: all 0.3s ease;
  margin: 0 5px !important;
}
:deep(.swiper-pagination-bullet-active) {
  background-color: #ffffff;
  width: 20px;
  border-radius: 4px;
}
:deep(.swiper-pagination) {
  bottom: 0px !important;
}

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