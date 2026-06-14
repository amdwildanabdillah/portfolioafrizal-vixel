<script setup>
const currentYear = new Date().getFullYear()

// Data Sosmed dengan icon SVG bersih
const socialLinks = [
  { 
    platform: 'WhatsApp', 
    url: 'https://wa.me/6289523635264',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5"><path d="M11.996 0A11.968 11.968 0 0 0 1.66 17.585L0 24l6.571-1.724A11.97 11.97 0 0 0 11.996 24c6.617 0 12.004-5.385 12.004-12S18.613 0 11.996 0zm6.602 17.15c-.276.783-1.611 1.47-2.222 1.547-.563.071-1.294.218-4.062-.916-3.34-1.373-5.503-4.832-5.67-5.056-.166-.222-1.353-1.802-1.353-3.437 0-1.636.85-2.453 1.154-2.787.303-.335.663-.418.885-.418.222 0 .445.004.64.013.203.01.477-.078.747.575.277.669.945 2.308 1.028 2.476.084.167.139.36.028.583-.11.222-.166.36-.333.555-.166.195-.347.43-.5.597-.166.182-.345.38-.146.721.198.341.884 1.463 1.897 2.366 1.306 1.164 2.395 1.528 2.74 1.695.344.167.545.139.752-.097.208-.236.89-1.042 1.13-1.403.238-.36.478-.298.793-.18.315.118 1.994.94 2.338 1.107.345.168.575.25.658.389.083.139.083.805-.193 1.588z"/></svg>`
  },
  { 
    platform: 'Instagram', 
    url: 'https://instagram.com/_ahmadrizq',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`
  },
  { 
    platform: 'Behance', 
    url: '#', // Isi URL Asli
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5"><path d="M22 7h-7v2h7V7zm1.72 5.61c0-2.58-1.55-4.61-4.72-4.61-3.05 0-4.8 2.37-4.8 5.43 0 3.32 1.83 5.57 5.04 5.57 2.65 0 4.19-1.39 4.67-3.4h-2.31c-.24 1.1-.96 1.54-2.19 1.54-1.39 0-2.36-.67-2.52-2.12h7.02c.04-.33.06-.82.06-1.39l-.25-1.02zm-6.95-1.12c.16-1.1 1.05-1.68 2.21-1.68 1.15 0 2.02.58 2.16 1.68h-4.37zM4.19 5.5H0v13h4.63c3.05 0 4.88-1.06 4.88-3.79 0-1.78-1.1-2.93-2.64-3.32v-.14c1.15-.38 2.06-1.54 2.06-3.07 0-2.45-1.68-3.55-4.74-3.55v.87zm-1.87 5.04V7.52h2.21c1.3 0 2.06.48 2.06 1.63 0 1.25-.82 1.73-2.26 1.73H2.32zm0 5.86v-4.18h2.5c1.44 0 2.4.53 2.4 1.97 0 1.49-1.01 2.21-2.5 2.21H2.32z"/></svg>`
  },
  { 
    platform: 'LinkedIn', 
    url: '#', // Isi URL Asli
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 md:w-5 md:h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
  }
]
</script>

<template>
  <footer id="footer" class="relative w-full bg-[#07090F] pt-24 md:pt-36 overflow-hidden z-20 border-t border-white/5">
    
    <!-- ====== BACKGROUND PEMANIS ====== -->
    <!-- Ambient Glow Konsisten dengan Tema -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[300px] bg-indigo-600/10 rounded-t-full blur-[120px] -z-10 pointer-events-none"></div>
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,black_80%)] -z-10 pointer-events-none"></div>
    <!-- ================================ -->

    <div class="max-w-5xl mx-auto w-full px-6 flex flex-col relative z-10">

      <!-- ================================ -->
      <!-- SECTION 1: CTA (CALL TO ACTION) -->
      <!-- ================================ -->
      <div class="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 md:mb-28" data-aos="fade-up">
        
        <!-- Aksen Kapsul Atas -->
        <div class="flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
          <span class="text-[9px] md:text-[10px] font-medium tracking-[0.2em] text-white/80 uppercase">
            Open To Work
          </span>
        </div>

        <!-- Headline CTA -->
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.2]">
          Siap Menjadi Bagian dari <br class="hidden md:block" />
          <span class="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">Tim Anda.</span>
        </h2>

        <!-- Deskripsi CTA -->
        <p class="text-white/50 font-light mt-6 md:mt-8 max-w-2xl text-xs md:text-sm leading-relaxed tracking-wide">
          Dengan pengalaman di bidang desain grafis, video editing, motion graphics, dan fotografi, 
          saya siap memberikan kontribusi untuk proyek dan tujuan bisnis perusahaan.
        </p>

        <!-- Tombol Aksi -->
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/6289523635264" target="_blank" class="px-8 py-3.5 rounded-full bg-white text-[#07090F] text-xs font-semibold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-2 group">
            Mari Berkolaborasi
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </div>

      </div>

      <!-- ================================ -->
      <!-- SECTION 2: MINIMALIST FOOTER -->
      <!-- ================================ -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/10 pb-12">
        
        <!-- Kiri: Brand Identity -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
          <a href="#home" class="text-xl font-medium tracking-wide text-white flex items-center gap-1.5 group mb-2 md:mb-3">
            Af Rizal<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 mb-0.5 group-hover:scale-150 transition-transform"></span>
          </a>
          <p class="text-white/40 font-light text-[10px] md:text-xs max-w-sm leading-relaxed">
            Visual Creative Designer crafting aesthetic, strategic, and impactful digital experiences.
          </p>
        </div>

        <!-- Kanan: Icon Links Sahaja -->
        <div class="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-center md:justify-end">
          <a 
            v-for="(link, i) in socialLinks" 
            :key="i" 
            :href="link.url" 
            target="_blank"
            :title="link.platform"
            class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            <!-- SVG Icon di-render lewat v-html dari data script -->
            <div v-html="link.icon" class="flex items-center justify-center"></div>
          </a>
        </div>

      </div>

      <!-- ================================ -->
      <!-- SECTION 3: COPYRIGHT BOTTOM BAR -->
      <!-- ================================ -->
      <div class="flex flex-col md:flex-row items-center justify-between py-6 border-t border-white/5 text-[9px] md:text-[10px] text-white/30 font-light tracking-wide text-center md:text-left">
        <p>&copy; {{ currentYear }} Ahmad Rizqi Af Rizal. All rights reserved.</p>
        <p class="mt-2 md:mt-0">Design & Development by Vixel Creative<span class="text-fuchsia-400/50"></span></p>
      </div>

    </div>
  </footer>
</template>