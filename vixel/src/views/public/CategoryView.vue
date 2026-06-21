<!-- src/views/public/CategoryView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const categorySlug = route.params.category // Menangkap tulisan dari URL (cth: 'video' atau 'design')
const category = ref(null)
const items = ref([])
const isLoading = ref(true)

const fetchCategoryAndItems = async () => {
  try {
    // 1. Cari Kategori berdasarkan Slug
    const { data: catData, error: catError } = await supabase
      .from('work_categories')
      .select('*')
      .eq('slug', categorySlug)
      .single()

    if (catError) throw catError
    category.value = catData

    // 2. Cari semua Portofolio yang ID kategorinya cocok
    const { data: itemData, error: itemError } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('category_id', catData.id)
      .order('created_at', { ascending: false })

    if (itemError) throw itemError
    items.value = itemData

  } catch (error) {
    console.error('Gagal memuat halaman kategori:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCategoryAndItems()
})
</script>

<template>
  <main class="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">
    
    <!-- Ambient Background -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <!-- Navigasi Back -->
      <RouterLink to="/" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest mb-10 group">
        <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Home
      </RouterLink>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-[50vh]">
        <div class="w-10 h-10 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin mb-4"></div>
        <p class="text-xs text-gray-500 uppercase tracking-widest font-bold">Menyusun Galeri...</p>
      </div>

      <!-- Tampilan Galeri -->
      <div v-else-if="category">
        
        <!-- Header Kategori -->
        <div class="mb-14 md:mb-20">
          <h1 class="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
            {{ category.title }}
          </h1>
          <p class="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed font-light">
            {{ category.description || 'Kumpulan karya dan eksplorasi terbaik dalam disiplin ini.' }}
          </p>
        </div>

        <!-- Grid Portofolio -->
        <div v-if="items.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          <RouterLink 
            v-for="item in items" 
            :key="item.id" 
            :to="`/project/${item.id}`" 
            class="group block relative rounded-3xl overflow-hidden bg-[#111] border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
          >
            <!-- Thumbnail Image -->
            <div class="w-full aspect-[4/3] relative overflow-hidden bg-black/50">
              <img :src="item.image_url" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            </div>

            <!-- Meta Data (Muncul di atas gambar) -->
            <div class="absolute bottom-0 left-0 w-full p-6">
              <div class="flex items-center gap-2 mb-3">
                <span v-if="item.sub_category" class="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/20 bg-white/10 backdrop-blur-md text-white/90">
                  {{ item.sub_category }}
                </span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-white mb-2 leading-snug drop-shadow-md group-hover:text-cyan-300 transition-colors">
                {{ item.title }}
              </h3>
              
              <div class="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4 group-hover:text-white transition-colors">
                View Project 
                <svg class="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </RouterLink>

        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
          <svg class="w-12 h-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <p class="text-gray-400 text-sm">Belum ada karya untuk kategori ini.</p>
        </div>

      </div>

    </div>
  </main>
</template>