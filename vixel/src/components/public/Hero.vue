<script setup>
const scrollToAbout = () => {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="h-screen w-full flex flex-col justify-center items-center text-center px-4 md:px-8 relative" id="home">
    
    <!-- ACCENT: DESIGNER GRID BACKGROUND -->
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_30%,transparent_100%)] z-0"></div>

    <!-- MAIN CONTENT (Tengah Layar) -->
    <div class="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl">
      
      <div class="relative border border-white/20 p-8 md:p-12 w-full max-w-2xl mx-auto flex items-center justify-center" data-aos="zoom-out" data-aos-duration="1000">
        
        <div class="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#07090F] border border-white/60"></div>
        <div class="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#07090F] border border-white/60"></div>
        <div class="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#07090F] border border-white/60"></div>
        <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#07090F] border border-white/60"></div>

        <!-- REAL GLASS PILL (Tengah Atas) -->
        <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 border border-white/30 rounded-full px-4 py-1 text-[9px] md:text-[10px] font-normal text-white uppercase tracking-[0.2em] backdrop-blur-xl bg-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.1)] whitespace-nowrap">
          Creative
        </span>
        
        <!-- Badge Biasa (Tengah Bawah) -->
        <span class="absolute -bottom-3.5 left-1/2 -translate-x-1/2 border border-white/20 rounded-full px-4 py-1 text-[7px] md:text-[9px] font-normal text-white/90 uppercase tracking-widest backdrop-blur-md bg-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] whitespace-nowrap">
          Graphic Design - Video Editor - Photography
        </span>
        
        <div class="relative mt-2 md:mt-0">
          <h1 class="absolute top-0 -left-1 md:-left-2 text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-cyan-200 opacity-20 blur-[6px] leading-[1.1] pb-4 pointer-events-none">
            Portfolio.
          </h1>
          <h1 class="absolute top-0 -right-1 md:-right-2 text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-indigo-300 opacity-20 blur-[6px] leading-[1.1] pb-4 pointer-events-none">
            Portfolio.
          </h1>
          <h1 class="relative text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 pb-4 leading-[1.1]">
            Portfolio.
          </h1>
        </div>
      </div>

    </div> <!-- Nah, ini div penutup yang benar sebelum tombol Explore Work -->

    <!-- Tombol Explore Work (Posisi Absolute nempel ke bawah layar) -->
    <div data-aos="fade-up" data-aos-delay="400" class="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-20">
      <button @click="scrollToAbout" class="relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-white/5 border border-white/20 rounded-full text-white/70 text-xs font-normal backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-500 active:scale-95 md:hover:bg-[#07090F]/80 md:hover:text-white md:hover:border-cyan-400/60 md:hover:shadow-[0_0_20px_rgba(6,182,212,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] md:hover:-translate-y-1 group cursor-pointer overflow-hidden">
        
        <span class="transition-all duration-500 group-hover:tracking-[0.1em]">Explore More</span> 
        
        <!-- Wadah Icon SVG Animasi -->
        <div class="relative flex items-center justify-center overflow-hidden h-4 w-4">
           <!-- Panah Lama -->
           <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-3 h-3 transition-all duration-500 transform group-hover:translate-y-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
             <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
           </svg>
           <!-- Panah Baru -->
           <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-3 h-3 transition-all duration-500 transform -translate-y-8 group-hover:translate-y-0 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
             <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
           </svg>
        </div>

      </button>
    </div>

  </section>
</template>