<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pinSection = ref(null)
let ctx

const allImages = [
  ...Array.from({ length: 16 }, (_, i) => `/images/landscape/landsape${i + 1}.webp`),
  ...Array.from({ length: 16 }, (_, i) => `/images/vertical/vertical${i + 1}.webp`)
]

const shuffleArray = (arr) => {
  const newArr = [...arr]
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }
  return newArr
}

const shuffledImages = shuffleArray(allImages)
const track1 = shuffledImages.slice(0, 16)
const track2 = shuffledImages.slice(16, 32)

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection.value,
        pin: true,
        scrub: 1, 
        start: "top top",
        end: "+=100%", 
      }
    })

    tl.to('.track-left', { xPercent: -25, ease: 'none' }, 0)
      .to('.track-right', { xPercent: 25, ease: 'none' }, 0)

  }, pinSection.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="pinSection" class="relative w-full h-screen bg-[#e1e2eb] overflow-hidden flex flex-col justify-center gap-6 md:gap-10 pt-24 md:pt-32 pb-10">
    
    <div class="px-6 max-w-4xl mx-auto w-full z-10 text-center flex flex-col items-center mb-2">
      <h2 class="text-3xl md:text-5xl font-light tracking-wide text-[#07090F]">
        Visual <span class="font-serif italic text-cyan-700">Explorations</span>
      </h2>
      <p class="text-[10px] md:text-xs font-normal text-gray-500 mt-2 uppercase tracking-widest">A glimpse into the creative process</p>
    </div>

    <div class="flex flex-col gap-5 md:gap-8 w-full opacity-95 mt-4">
      
      <div class="track-left flex gap-4 md:gap-6 w-max">
        <template v-for="n in 3" :key="'t1-'+n">
          <div v-for="(img, idx) in track1" :key="'t1-img-'+idx" class="h-28 md:h-36 shrink-0 rounded-xl overflow-hidden shadow-sm border-2 md:border-[3px] border-white bg-black/5">
            <img :src="img" loading="lazy" class="h-full w-auto object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300" />
          </div>
        </template>
      </div>

      <div class="track-right flex gap-4 md:gap-6 w-max -ml-[100vw] md:-ml-[50vw]">
        <template v-for="n in 3" :key="'t2-'+n">
          <div v-for="(img, idx) in track2" :key="'t2-img-'+idx" class="h-28 md:h-36 shrink-0 rounded-xl overflow-hidden shadow-sm border-2 md:border-[3px] border-white bg-black/5">
            <img :src="img" loading="lazy" class="h-full w-auto object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300" />
          </div>
        </template>
      </div>

    </div>
  </section>
</template>