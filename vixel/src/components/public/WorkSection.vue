<script setup>
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const swiperModules = [EffectCoverflow, Pagination, Autoplay]

const mainCategories = [
  { id: 0, title: 'Graphic Design', desc: 'Social media, branding, and visual identity.', img: '/images/landscape/landsape8.webp' },
  { id: 1, title: 'Video Editor', desc: 'Cinematic storytelling and commercial editing.', img: '/images/landscape/landsape9.webp' },
  { id: 2, title: 'Photography', desc: 'Capturing moments with precision and atmospheric depth.', img: '/images/landscape/landsape10.webp' }
]

const otherCategories = [
  { title: 'Meta Ads Campaigns', tag: 'Marketing' },
  { title: 'AI Automation', tag: 'Automation' },
  { title: 'Print & Editorial', tag: 'Design' },
  { title: 'Drone Operation', tag: 'Videography' }
]
</script>

<template>
  <section class="relative w-full bg-[#07090F] pt-24 md:pt-32 pb-24 z-20 overflow-hidden">
    
    <!-- ====== BACKGROUND PEMANIS ====== -->
    <!-- 1. Ambient Glow (Indigo & Fuchsia) -->
    <div class="absolute top-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-600/10 rounded-full blur-[100px] md:blur-[140px] -z-10 pointer-events-none -translate-x-1/4 -translate-y-1/4"></div>
    <div class="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-fuchsia-600/10 rounded-full blur-[100px] md:blur-[140px] -z-10 pointer-events-none translate-x-1/4 translate-y-1/4"></div>

    <!-- 2. Subtle Designer Grid dengan Fading Edge -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_10%,transparent_100%)] -z-10 pointer-events-none"></div>
    <!-- ================================ -->

    <div class="max-w-5xl mx-auto w-full flex flex-col justify-center relative z-10">

      <!-- Teks Clean Editorial -->
      <div class="px-6 mb-8 md:mb-12 text-center" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-light text-white tracking-wide">
          Featured <span class="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-indigo-300">Disciplines.</span>
        </h2>
        <p class="text-white/40 font-light mt-2 max-w-md mx-auto text-[11px] md:text-sm tracking-wide">Pillars of my creative expertise.</p>
      </div>

      <div class="w-full h-[280px] md:h-[320px] overflow-hidden px-4 md:px-0">
        <Swiper
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'auto'"
          :loop="true"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
          :coverflowEffect="{ rotate: 0, stretch: 0, depth: 100, modifier: 1.5, slideShadows: false }"
          :pagination="{ clickable: true }"
          :modules="swiperModules"
          class="w-full h-full pb-8"
        >
          <SwiperSlide v-for="(cat, i) in mainCategories" :key="cat.id" class="my-swiper-slide w-[220px] h-[260px] md:w-[280px] md:h-[300px] rounded-2xl overflow-hidden relative border border-white/10 group cursor-pointer bg-[#07090F]">
            
            <div class="absolute inset-0">
              <img :src="cat.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100" />
              <!-- Gradient gelap tanpa neon -->
              <div class="card-overlay absolute inset-0 bg-gradient-to-t from-[#07090F] via-[#07090F]/80 to-transparent transition-opacity duration-500"></div>
            </div>

            <!-- UX Baru: Tombol di Kanan, Teks di Kiri -->
            <div class="card-content absolute bottom-0 left-0 w-full p-4 md:p-5 flex justify-between items-end gap-2">
              
              <div class="flex flex-col items-start w-[70%]">
                <!-- Aksen Kreatif: Angka Bracket -->
                <span class="text-white/40 text-[9px] font-mono tracking-[0.2em] mb-1.5 border-b border-white/10 pb-0.5 group-hover:text-fuchsia-300 transition-colors">
                  [ 0{{ i + 1 }} ]
                </span>
                <h3 class="text-base md:text-xl font-medium text-white tracking-wide break-words w-full">{{ cat.title }}</h3>
                <p class="text-white/40 font-light mt-1 text-[9px] md:text-[10px] line-clamp-2 hidden md:block">{{ cat.desc }}</p>
              </div>

              <!-- Tombol View Sleek di Kanan -->
              <RouterLink :to="`/work/${cat.title.toLowerCase().replace(/\s+/g, '-')}`" class="mb-1 shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 hover:bg-white hover:text-[#07090F] text-[9px] md:text-[10px] font-medium transition-all duration-300 flex items-center gap-1.5 group/btn shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                View
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover/btn:translate-x-1 transition-transform">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </RouterLink>

            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Kategori Bawah: Glass Pill Bersih Tanpa Neon -->
      <div class="max-w-3xl mx-auto w-full px-6 mt-6 md:mt-10" data-aos="fade-up">
        <div class="flex flex-wrap justify-center items-center gap-2.5 md:gap-4">
          
          <RouterLink 
            v-for="(cat, i) in otherCategories" 
            :key="i" 
            :to="`/work/${cat.title.toLowerCase().replace(/\s+/g, '-')}`" 
            class="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center gap-2 group shadow-sm"
          >
            <!-- Aksen Titik Indigo/Fuchsia Menyesuaikan Theme -->
            <div class="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-indigo-400 transition-colors shadow-[0_0_8px_rgba(129,140,248,0)] group-hover:shadow-[0_0_8px_rgba(129,140,248,0.6)]"></div>
            
            <h4 class="text-[10px] md:text-xs font-light text-white/60 group-hover:text-white transition-colors tracking-wide">
              {{ cat.title }}
            </h4>
          </RouterLink>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Pagination Minimalis Putih */
:deep(.swiper-pagination-bullet) {
  background-color: rgba(255, 255, 255, 0.2);
  width: 5px;
  height: 5px;
  transition: all 0.3s ease;
}
:deep(.swiper-pagination-bullet-active) {
  background-color: #ffffff;
  width: 16px;
  border-radius: 4px;
}
:deep(.swiper-pagination) {
  bottom: 0px !important;
}
.my-swiper-slide:not(.swiper-slide-active) {
  opacity: 0.35;
  filter: blur(1.5px);
  transform: scale(0.9);
}
.my-swiper-slide:not(.swiper-slide-active) .card-overlay {
  opacity: 0.9 !important;
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