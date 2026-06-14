<script setup>
const courses = ['Perencanaan Kreatif Media', 'Periklanan', 'Fotografi', 'Desain Audio Visual', 'Desain Grafis']
</script>

<template>
  <section id="about" class="min-h-screen py-16 px-4 md:px-12 w-full mx-auto relative z-10 flex items-center justify-center overflow-hidden">

    <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent -z-20"></div>
    <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-6xl relative z-10">

      <!-- KOLOM KIRI -->
      <div class="lg:col-span-7 order-2 lg:order-1 relative">

        <div class="absolute -top-4 -left-2 md:-top-6 md:-left-6 w-1/3 h-[50%] border-l border-t border-white/20 pointer-events-none z-0">
            <div class="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-[#07090F] border border-white/60"></div>
        </div>

        <div class="space-y-6 md:space-y-8 relative z-10 pl-2 md:pl-0">

          <div data-aos="fade-right">
            <div class="flex items-center gap-3 mb-2">
              <span class="w-6 h-px bg-cyan-400"></span>
              <span class="text-[9px] md:text-[10px] font-normal tracking-[0.2em] text-cyan-400 uppercase">Ahmad Rizqi Af Rizal</span>
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
              Hai, <span class="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-cyan-300 font-serif italic">saya</span>
            </h2>
          </div>

          <div class="space-y-4" data-aos="fade-up" data-aos-delay="100">
            <p class="text-gray-300 text-sm md:text-base leading-relaxed font-light">
              <i class="font-serif text-white/80">Ahmad Rizqi Af Rizal</i> seorang Visual Creative Designer dengan pengalaman 
lebih dari 3 tahun di bidang desain grafis, video editing, motion graphics, dan fotografi. Saya 
berfokus pada menciptakan visual yang tidak hanya menarik secara estetika, tetapi juga 
mampu menyampaikan pesan dan membangun koneksi dengan audiens melalui storytelling 
yang kuat.
            </p>
            <p class="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Dengan pengalaman menggunakan Adobe Photoshop, Illustrator, Premiere Pro, After Effects, 
CapCut, dan Firefly, saya membantu mengubah ide menjadi konten visual yang efektif, 
kreatif, dan berorientasi pada hasil. 
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="200" class="pt-2">
            <div class="flex flex-wrap gap-2">
              <span v-for="(course, i) in courses" :key="i" class="px-3 py-1 text-[9px] md:text-[10px] font-normal text-white/60 border border-white/10 rounded-sm bg-white/5">
                {{ course }}
              </span>
            </div>
          </div>

          <!-- DIGITAL ARSENAL (Manual SVG) -->
          <div class="relative pt-6 mt-4 border-t border-white/10" data-aos="fade-up" data-aos-delay="300">
            <!-- Fading Grid Background -->
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:12px_12px] [mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)] -z-10"></div>

            <h3 class="text-white/80 font-normal uppercase tracking-[0.2em] text-[10px] mb-4 text-center md:text-left">
              Digital Arsenal
            </h3>

            <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">

              <!-- 1. PHOTOSHOP -->
              <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-[#07090F]/50 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_4px_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer group relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <path fill="#001e36" d="M22.667 1.6h82.666C117.867 1.6 128 11.733 128 24.267v79.466c0 12.534-10.133 22.667-22.667 22.667H22.667C10.133 126.4 0 116.267 0 103.733V24.267C0 11.733 10.133 1.6 22.667 1.6"/>
                  <path fill="#31a8ff" d="M45.867 33.333c-1.6 0-3.2 0-4.853.054c-1.654.053-3.201.053-4.641.107c-1.44.053-2.773.053-4.053.106c-1.227.053-2.08.053-2.987.053c-.373 0-.533.213-.533.587v54.88c0 .48.213.694.64.694h10.347c.373-.054.64-.374.586-.747v-17.12c1.013 0 1.76 0 2.294.053c.533.053 1.386.053 2.666.053c4.374 0 8.374-.48 12-1.813c3.467-1.28 6.454-3.52 8.587-6.507q3.2-4.48 3.2-11.36c0-2.4-.426-4.693-1.226-6.933A17 17 0 0 0 64 39.36a19.05 19.05 0 0 0-7.147-4.374c-2.987-1.12-6.613-1.653-10.986-1.653m1.19 10.505c1.9.036 3.75.368 5.476 1.068c1.547.587 2.827 1.654 3.734 3.04a8.8 8.8 0 0 1 1.227 4.748c0 2.346-.534 4.16-1.654 5.493c-1.174 1.333-2.667 2.347-4.373 2.827c-1.974.64-4.054.959-6.134.959h-2.827c-.64 0-1.332-.053-2.079-.106v-17.92c.373-.054 1.12-.107 2.187-.053c1.013-.054 2.239-.054 3.626-.054q.41-.01.817-.002m44.73 2.723c-3.787 0-6.934.586-9.44 1.866c-2.293 1.067-4.267 2.773-5.6 4.906c-1.173 1.974-1.814 4.16-1.814 6.454a11.45 11.45 0 0 0 1.227 5.44a13.8 13.8 0 0 0 4.054 4.533a32.6 32.6 0 0 0 7.573 3.84c2.613 1.013 4.373 1.813 5.227 2.506c.853.694 1.28 1.387 1.28 2.134c0 .96-.587 1.867-1.44 2.24c-.96.48-2.4.747-4.427.747c-2.133 0-4.267-.267-6.294-.8a22.8 22.8 0 0 1-6.613-2.613c-.16-.107-.32-.16-.48-.053c-.16.106-.213.319-.213.479v9.28c-.053.427.213.8.587 1.013a21.5 21.5 0 0 0 5.44 1.707c2.4.48 4.799.693 7.252.693c3.84 0 7.041-.586 9.654-1.706c2.4-.96 4.48-2.613 5.973-4.747a12.4 12.4 0 0 0 2.08-7.093a11.5 11.5 0 0 0-1.226-5.493c-1.014-1.814-2.454-3.307-4.214-4.427a38.6 38.6 0 0 0-8.213-3.894a49 49 0 0 1-3.787-1.76c-.693-.373-1.333-.853-1.813-1.44c-.32-.427-.533-.906-.533-1.386s.16-1.013.426-1.44c.374-.533.96-.907 1.653-1.067c1.014-.266 2.134-.427 3.2-.374c2.027 0 4 .267 5.974.694c1.814.373 3.52.96 5.12 1.814c.213.106.48.106.96 0a.66.66 0 0 0 .267-.534v-8.693c0-.214-.054-.427-.107-.64c-.107-.213-.32-.427-.533-.48A18.8 18.8 0 0 0 98.4 47.04a46 46 0 0 0-6.613-.48z"/>
                </svg>
                <span class="absolute -top-8 bg-white text-[#07090F] text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-normal shadow-lg">
                  Photoshop
                </span>
              </div>

              <!-- 2. ILLUSTRATOR -->
              <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-[#07090F]/50 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-orange-400/50 hover:shadow-[0_4px_15px_rgba(251,146,60,0.2)] transition-all cursor-pointer group relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <path fill="#330000" d="M22.7 1.6h82.7c12.5 0 22.7 10.1 22.7 22.7v79.5c0 12.5-10.1 22.7-22.7 22.7H22.7C10.1 126.4 0 116.3 0 103.7V24.3C0 11.7 10.1 1.6 22.7 1.6"/>
                  <path fill="#ff9a00" d="M61.9 76.3H42l-4 12.5c-.1.5-.5.8-1 .7H27c-.6 0-.7-.3-.6-1l17.2-49.4c.2-.5.3-1.1.5-1.8c.2-1.1.3-2.3.3-3.5c-.1-.3.2-.5.4-.6h13.8c.4 0 .6.2.7.4l19.5 54.9c.2.6 0 .9-.5.9H67.1c-.4.1-.7-.2-.9-.6zM45.1 65.4h13.5c-.3-1.1-.7-2.5-1.2-3.8c-.5-1.4-1-3-1.4-4.6c-.5-1.7-1-3.3-1.5-4.9c-.5-1.7-1-3.2-1.4-4.7q-.6-2.25-1.2-4.2h-.1q-.75 3.45-1.8 6.9c-.8 2.6-1.6 5.2-2.5 7.9c-.8 2.7-1.6 5.2-2.4 7.4m45.6-22.7c-1.8.1-3.5-.6-4.7-1.9s-1.9-3.1-1.8-4.9c-.1-1.8.6-3.5 1.9-4.7s3-1.9 4.7-1.9c2.1 0 3.7.6 4.9 1.9s1.8 3 1.8 4.7c.1 1.8-.6 3.6-1.9 4.9s-3.1 2-4.9 1.9m-6 46.3V47.9c0-.5.2-.7.7-.7H96c.5 0 .7.3.7.7V89c0 .6-.2.9-.7.9H85.5c-.5-.1-.8-.4-.8-.9"/>
                </svg>
                <span class="absolute -top-8 bg-white text-[#07090F] text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-normal shadow-lg">
                  Illustrator
                </span>
              </div>

              <!-- 3. PREMIERE PRO -->
              <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-[#07090F]/50 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-purple-400/50 hover:shadow-[0_4px_15px_rgba(192,132,252,0.2)] transition-all cursor-pointer group relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <g fill="none">
                    <rect width="256" height="256" fill="#00005B" rx="60"/>
                    <path fill="#99F" d="M54 182.68V72.813c0-.746.32-1.173 1.067-1.173c1.813 0 3.52 0 5.973-.107c2.56-.106 5.227-.106 8.107-.213s5.973-.107 9.28-.213C81.733 71 84.933 71 88.133 71c8.747 0 16 1.067 21.974 3.307a38.1 38.1 0 0 1 14.293 8.746a34 34 0 0 1 7.787 12.16c1.6 4.48 2.453 9.067 2.453 13.867q0 13.76-6.4 22.72c-4.267 5.973-10.24 10.453-17.173 13.013c-7.254 2.667-15.254 3.627-24 3.627c-2.56 0-4.267 0-5.334-.107c-1.066-.106-2.56-.106-4.586-.106v34.24c.106.746-.427 1.386-1.174 1.493H55.28c-.853 0-1.28-.427-1.28-1.387zm23.253-90.347v35.84c1.494.107 2.88.214 4.16.214h5.654c4.16 0 8.32-.64 12.266-1.92c3.414-.96 6.4-2.987 8.747-5.654c2.24-2.666 3.307-6.293 3.307-10.986a17.56 17.56 0 0 0-2.454-9.494c-1.813-2.773-4.373-4.906-7.466-6.08c-3.947-1.6-8.214-2.24-12.587-2.133c-2.773 0-5.227 0-7.253.107c-2.134-.107-3.627 0-4.374.106M150 98.627h18.667c1.067 0 1.92.746 2.24 1.706c.32.854.533 1.707.64 2.667c.213 1.067.427 2.24.533 3.307c.107 1.173.214 2.453.214 3.84a39.7 39.7 0 0 1 11.413-9.174c4.907-2.773 10.56-4.16 16.213-4.16c.747-.106 1.387.427 1.494 1.174v21.226c0 .854-.534 1.174-1.707 1.174c-3.84-.107-7.787.213-11.52 1.066q-4.64.96-8.96 2.88c-2.027.96-3.947 2.24-5.44 3.947v54.4c0 1.067-.427 1.493-1.387 1.493h-21.013c-.853.107-1.6-.426-1.707-1.28v-59.52c0-2.56 0-5.226-.106-8c-.107-2.773-.107-5.546-.214-8.32c0-2.453-.213-4.8-.426-7.253c-.107-.533.213-1.067.746-1.173c0-.107.214-.107.32 0"/>
                  </g>
                </svg>
                <span class="absolute -top-8 bg-white text-[#07090F] text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-normal shadow-lg">
                  Premiere Pro
                </span>
              </div>

              <!-- 4. AFTER EFFECTS -->
              <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-[#07090F]/50 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-[0_4px_15px_rgba(129,140,248,0.2)] transition-all cursor-pointer group relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <g fill="none">
                    <rect width="256" height="256" fill="#00005B" rx="60"/>
                    <path fill="#99F" d="M105.157 156.12h-39.68l-8.107 25.173c-.213.96-1.066 1.6-2.026 1.494H35.29c-1.173 0-1.493-.64-1.173-1.92l34.347-98.454c.32-1.066.64-2.026 1.066-3.306c.427-2.24.64-4.587.64-6.934c-.106-.533.32-1.066.853-1.173H98.65c.747 0 1.28.32 1.387.853l38.933 108.8c.32 1.174 0 1.707-1.066 1.707H115.61c-.746.107-1.493-.427-1.706-1.173l-8.747-25.6zm-33.493-21.227h27.093c-.64-2.24-1.494-4.906-2.454-7.68c-.96-2.88-1.92-5.973-2.88-9.173c-1.066-3.307-2.026-6.507-3.093-9.813s-2.026-6.4-2.88-9.494c-.853-2.986-1.6-5.76-2.347-8.32h-.213c-.96 4.587-2.133 9.174-3.627 13.76c-1.6 5.12-3.2 10.454-4.906 15.787c-1.387 5.44-3.094 10.453-4.693 14.933m130.133 11.627h-33.813c.426 3.307 1.493 6.613 3.306 9.493c1.92 2.88 4.587 5.12 7.787 6.4c4.267 1.814 8.96 2.774 13.653 2.667c3.734-.107 7.467-.427 11.094-1.173a40 40 0 0 0 9.493-2.454c.533-.426.853-.213.853.854v16.32c0 .426-.106.853-.213 1.28c-.213.32-.427.533-.747.746a45.6 45.6 0 0 1-10.666 3.2a72 72 0 0 1-15.147 1.28c-8.107 0-14.933-1.28-20.48-3.733c-5.227-2.24-9.813-5.76-13.44-10.133a39.15 39.15 0 0 1-7.36-13.974c-1.493-5.013-2.24-10.24-2.24-15.573c0-5.76.853-11.413 2.667-16.96a43.5 43.5 0 0 1 8-14.613c3.52-4.267 7.893-7.68 12.906-10.134c5.014-2.453 10.987-3.306 17.814-3.306c5.653-.107 11.306.96 16.533 3.306c4.373 1.92 8.213 4.8 11.2 8.534c2.773 3.626 5.013 7.68 6.4 12.16c1.387 4.266 2.027 8.64 2.027 13.013c0 2.56-.107 4.8-.214 6.827c-.213 2.026-.32 3.52-.426 4.48c-.107.746-.747 1.386-1.494 1.386c-.64 0-1.813.107-3.52.214c-1.706.213-3.733.32-6.186.32c-2.454 0-5.014-.427-7.787-.427m-33.813-15.573h22.506c2.774 0 4.8 0 6.08-.107c.854-.107 1.707-.32 2.454-.853v-1.067a12.3 12.3 0 0 0-.64-3.947c-1.92-5.973-7.574-10.026-13.867-9.813a15.02 15.02 0 0 0-14.187 8.107c-1.28 2.453-2.026 5.013-2.346 7.68"/>
                  </g>
                </svg>
                <span class="absolute -top-8 bg-white text-[#07090F] text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-normal shadow-lg">
                  After Effects
                </span>
              </div>

              <!-- 5. LIGHTROOM -->
              <div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-[#07090F]/50 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-[0_4px_15px_rgba(96,165,250,0.2)] transition-all cursor-pointer group relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 250" class="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  <rect width="256" height="249.6" fill="#001E36" rx="42.5"/>
                  <path fill="#31A8FF" d="M134.443 176.409H66.78q-1.719 0-1.717-1.89V65.47a1.366 1.366 0 0 1 1.545-1.546H87.56a1.064 1.064 0 0 1 1.202 1.203v89.645h49.287q1.545 0 1.203 1.545l-3.092 18.547a1.64 1.64 0 0 1-.687 1.288a2.3 2.3 0 0 1-1.03.258m17-85.352h18.719c1.044.01 1.956.71 2.232 1.718a8.3 8.3 0 0 1 .86 2.404q.358 1.659.514 3.349q.17 1.803.172 3.864a40.1 40.1 0 0 1 11.42-9.188a32.15 32.15 0 0 1 15.886-3.864a1.366 1.366 0 0 1 1.545 1.546v20.78q0 1.203-1.717 1.202a43.36 43.36 0 0 0-20.179 3.606a18.2 18.2 0 0 0-5.753 3.95v54.44q0 1.545-1.374 1.545h-20.78a1.517 1.517 0 0 1-1.717-1.717v-59.077q0-2.157-.028-4.457l-.035-2.334q-.01-.593-.023-1.194a418 418 0 0 0-.178-6.263l-.08-2.066a54.5 54.5 0 0 0-.686-7.041a.987.987 0 0 1 1.075-1.227z"/>
                </svg>
                <span class="absolute -top-8 bg-white text-[#07090F] text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-normal shadow-lg">
                  Lightroom
                </span>
              </div>

              <!-- 6. META -->
              <!-- Ganti bagian blok Meta yang lama dengan ini -->
<div class="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-[#07090F]/50 border border-white/10 backdrop-blur-md hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_4px_15px_rgba(0,129,251,0.2)] transition-all cursor-pointer group relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 153" class="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity fill-blue-500">
           <path d="M60.1 152.9c-15.6 0-30.8-6.1-41.9-17.2C7.1 124.6.8 109.3.8 93.6c0-15.7 6.3-31 17.4-42.1C29.3 40.4 44.5 34.3 60.1 34.3c14 0 27.5 5 38.3 14 11.2 9.3 19 22.1 22.3 36.4 3.3-14.3 11.1-27.1 22.3-36.4 10.8-9 24.3-14 38.3-14 15.6 0 30.8 6.1 41.9 17.2 11.1 11.1 17.4 26.4 17.4 42.1s-6.3 31-17.4 42.1c-11.1 11.1-26.3 17.2-41.9 17.2-13.8 0-27-4.8-37.7-13.6-11.6-9.6-19.8-23-23.2-37.9-3.4 14.9-11.6 28.3-23.2 37.9-10.7 8.8-23.9 13.6-37.7 13.6zm0-95.6c-9.5 0-18.4 3.7-25.1 10.4-6.7 6.7-10.4 15.6-10.4 25.1 0 9.5 3.7 18.4 10.4 25.1 6.7 6.7 15.6 10.4 25.1 10.4 8.7 0 17-3.2 23.5-8.8 8.4-7.2 14.2-17.4 16.5-28.5-2-12-8.3-22.9-17.4-30.4-6.3-5.2-14.2-8.3-22.6-8.3zm120.7 0c-8.4 0-16.3 3.1-22.6 8.3-9.1 7.5-15.4 18.4-17.4 30.4 2.3 11.1 8.1 21.3 16.5 28.5 6.5 5.6 14.8 8.8 23.5 8.8 9.5 0 18.4-3.7 25.1-10.4 6.7-6.7 10.4-15.6 10.4-25.1 0-9.5-3.7-18.4-10.4-25.1-6.7-6.7-15.6-10.4-25.1-10.4z"/>
        </svg>
        <span class="absolute -top-8 bg-white text-[#07090F] text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-normal shadow-lg">Meta Ads</span>
      </div>

            </div>
          </div>

        </div>
      </div>

      <!-- KOLOM KANAN (Foto) -->
      <div class="lg:col-span-5 order-1 lg:order-2 relative w-full flex justify-center mt-8 md:mt-0" data-aos="zoom-in" data-aos-duration="1200">

        <div class="absolute -right-2 md:-right-6 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent flex-col items-center justify-between py-4 pointer-events-none hidden md:flex">
          <span class="w-2 h-px bg-white/40"></span>
          <span class="w-1 h-px bg-white/20"></span>
          <span class="w-1.5 h-px bg-white/30"></span>
          <span class="w-1 h-px bg-white/20"></span>
          <span class="w-2 h-px bg-white/40"></span>
        </div>

        <div class="relative w-[70%] md:w-[60%] lg:w-[90%] aspect-[3/4]">
          <img
            src="/images/profil/fotoprofil-1.png"
            alt="Ahmad Rizqi Af Rizal Profile"
            class="relative z-10 w-full h-full object-cover object-top grayscale-[20%] hover:grayscale-0 transition-all duration-700 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] -webkit-mask-image:-webkit-linear-gradient(top,black_50%,transparent_100%)"
          >

          <div class="absolute top-1/3 -left-4 md:-left-8 border border-white/10 rounded-full px-4 py-2 backdrop-blur-xl bg-white/5 z-20 flex items-center gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-[bounce_4s_infinite]">
             <span class="w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]"></span>
             <span class="text-[8px] font-normal tracking-[0.2em] text-white/80 uppercase">Video Editor</span>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
