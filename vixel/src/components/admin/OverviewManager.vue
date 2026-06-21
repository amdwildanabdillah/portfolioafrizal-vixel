<!-- src/components/admin/OverviewManager.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const stats = ref({
  portfolioItems: 0,
  visuals: 0,
  categories: 0
})

const isLoading = ref(true)

const fetchStats = async () => {
  isLoading.value = true
  try {
    // Tarik total Portofolio
    const { count: portfolioCount } = await supabase
      .from('portfolio_items')
      .select('*', { count: 'exact', head: true })

    // Tarik total Visuals
    const { count: visualCount } = await supabase
      .from('visual_explorations')
      .select('*', { count: 'exact', head: true })

    // Tarik total Categories
    const { count: categoryCount } = await supabase
      .from('work_categories')
      .select('*', { count: 'exact', head: true })

    stats.value = {
      portfolioItems: portfolioCount || 0,
      visuals: visualCount || 0,
      categories: categoryCount || 0
    }
  } catch (error) {
    console.error('Gagal mengambil statistik:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div class="animate-[fadeIn_0.3s_ease-out]">
    
    <div class="mb-8">
      <h3 class="text-2xl font-light tracking-tight text-white mb-1">Welcome back, Chief!</h3>
      <p class="text-[11px] text-gray-500 font-medium">Berikut adalah ringkasan aset digital pada portofolio kamu.</p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="i in 3" :key="i" class="h-32 bg-[#111111] rounded-3xl border border-white/5 animate-pulse"></div>
    </div>

    <!-- STATS CARDS -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
      
      <div class="bg-[#111111] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Portfolio Uploads</p>
        <h4 class="text-5xl font-light text-white">{{ stats.portfolioItems }}</h4>
      </div>

      <div class="bg-[#111111] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Visual Explorations</p>
        <h4 class="text-5xl font-light text-white">{{ stats.visuals }}</h4>
      </div>

      <div class="bg-[#111111] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-all"></div>
        <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Work Categories</p>
        <h4 class="text-5xl font-light text-white">{{ stats.categories }}</h4>
      </div>

    </div>

    <!-- QUICK ACTIONS -->
    <h4 class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Akses Cepat</h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <div>
          <h5 class="text-sm font-bold text-white mb-1">Tambah Karya Baru</h5>
          <p class="text-[10px] text-gray-500">Upload portfolio desain atau video terbaru.</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        </div>
      </div>
      <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
        <div>
          <h5 class="text-sm font-bold text-white mb-1">Update Marquee</h5>
          <p class="text-[10px] text-gray-500">Tarik gambar baru ke area visual exploration.</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
      </div>
    </div>

  </div>
</template>