<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { supabase } from '@/utils/supabase'

gsap.registerPlugin(ScrollTrigger)

const pinSection = ref(null)
const trackTop = ref(null)
const trackBottom = ref(null)
const isReady = ref(false)
let ctx

const track1 = ref([])
const track2 = ref([])

const shuffleArray = (arr) => {
  const newArr = [...arr]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

const fetchVisuals = async () => {
  try {
    const { data, error } = await supabase
      .from('visual_explorations')
      .select('image_url')
      .eq('is_active', true)

    if (error) throw error

    if (data && data.length > 0) {
      track1.value = shuffleArray(data)
      track2.value = shuffleArray(data)

      isReady.value = true
      await nextTick()
      
      setTimeout(() => {
        initGsap()
      }, 50)
    }
  } catch (error) {
    console.error('Gagal memuat visual:', error.message)
  }
}

const initGsap = () => {
  if (ctx) ctx.revert() 

  ctx = gsap.context(() => {
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection.value,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=350%",
        invalidateOnRefresh: true 
      }
    })

    tl.add("start")
      
      // 1. Teks Muncul (Posisi di atas)
      .fromTo('.intro-text', 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        "start"
      )

      .add("tracksMove", "start+=1.5")

      // 2. Track Atas Jalan (Kiri -> Kanan)
      .fromTo(trackTop.value,
        { xPercent: -100, x: 0 }, 
        { xPercent: 0, x: () => window.innerWidth, duration: 6, ease: 'none' }, 
        "tracksMove"
      )

      // 3. Track Bawah Jalan (Kanan -> Kiri)
      .fromTo(trackBottom.value,
        { xPercent: 0, x: () => window.innerWidth }, 
        { xPercent: -100, x: 0, duration: 6, ease: 'none' }, 
        "tracksMove"
      )

      // 4. Teks Hilang
      .to('.intro-text', 
        { scale: 1.05, opacity: 0, y: -20, duration: 1, ease: 'power2.inOut' },
        "tracksMove+=5" 
      )

  }, pinSection.value)
}

onMounted(() => {
  fetchVisuals()
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section id="visualexploration" ref="pinSection" class="relative w-full h-screen bg-[#e1e2eb] overflow-hidden flex flex-col justify-center">

    <div v-if="isReady" class="w-full relative flex flex-col justify-center gap-6 md:gap-8">
      
      <div class="intro-text w-full text-center flex flex-col items-center px-6 pointer-events-none mb-2 opacity-0">
        <h2 class="text-3xl md:text-5xl font-light tracking-wide text-[#07090F]">
          Visual <span class="font-serif italic text-cyan-700">Explorations</span>
        </h2>
        <p class="text-[10px] md:text-xs font-normal text-gray-500 mt-2 uppercase tracking-widest">
          A glimpse into the creative process
        </p>
      </div>

      <div class="w-full relative z-10">
        <div ref="trackTop" class="flex gap-4 md:gap-6 w-max px-4">
          <div v-for="(item, idx) in track1" :key="'top-'+idx" class="h-28 md:h-36 shrink-0 rounded-xl overflow-hidden shadow-sm border-2 md:border-[3px] border-white bg-black/5">
            <img :src="item.image_url" loading="lazy" class="h-full w-auto object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </div>

      <div class="w-full relative z-10">
        <div ref="trackBottom" class="flex gap-4 md:gap-6 w-max px-4">
          <div v-for="(item, idx) in track2" :key="'bottom-'+idx" class="h-28 md:h-36 shrink-0 rounded-xl overflow-hidden shadow-sm border-2 md:border-[3px] border-white bg-black/5">
            <img :src="item.image_url" loading="lazy" class="h-full w-auto object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </div>

    </div>

    <div v-else class="text-center absolute inset-0 flex items-center justify-center">
      <p class="text-gray-400 text-sm animate-pulse tracking-widest uppercase">Memuat aset visual...</p>
    </div>

  </section>
</template>

<style scoped>
section {
  max-width: 100vw;
}
</style>