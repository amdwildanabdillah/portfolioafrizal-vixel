<!-- src/views/public/ProjectDetailView.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { supabase } from '@/utils/supabase'

const route = useRoute()
const router = useRouter()
const projectId = route.params.id
const project = ref(null)
const isLoading = ref(true)

const fetchProjectDetail = async () => {
  try {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*, work_categories(title, slug)')
      .eq('id', projectId)
      .single()

    if (error) throw error
    project.value = data
  } catch (error) {
    console.error('Gagal memuat detail project:', error.message)
    // Kalau project ga ketemu, lempar balik ke home
    router.push('/')
  } finally {
    isLoading.value = false
  }
}

// Format tanggal jadi cantik (Bulan Tahun)
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long' }
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString))
}

onMounted(() => {
  fetchProjectDetail()
})
</script>

<template>
  <main class="min-h-screen bg-[#050505] text-white pt-24 pb-24 relative overflow-hidden">
    
    <!-- Ambient Background -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]"></div>
      <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center h-[70vh] relative z-10">
      <div class="w-12 h-12 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin mb-4"></div>
      <p class="text-xs text-gray-500 uppercase tracking-widest font-bold">Membuka Arsip...</p>
    </div>

    <!-- Project Content -->
    <article v-else-if="project" class="max-w-6xl mx-auto px-6 relative z-10">
      
      <!-- Top Bar: Navigasi Back & Meta Info -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
        <button @click="$router.back()" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest w-max group">
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to {{ project.work_categories?.title || 'Gallery' }}
        </button>

        <div class="flex items-center gap-3 md:gap-4 flex-wrap">
          <span v-if="project.sub_category" class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
            {{ project.sub_category }}
          </span>
          <span class="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-gray-400">
            {{ formatDate(project.created_at) }}
          </span>
        </div>
      </div>

      <!-- Hero Title -->
      <h1 class="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter leading-[1.1] mb-10 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40">
        {{ project.title }}
      </h1>

      <!-- Hero Image -->
      <div class="w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#111] border border-white/10 mb-12 md:mb-20 shadow-2xl relative group">
        <img :src="project.image_url" :alt="project.title" class="w-full h-auto max-h-[80vh] object-cover md:object-contain object-center group-hover:scale-[1.02] transition-transform duration-700" />
      </div>

      <!-- Detail & Description Section -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
        
        <!-- Left Column: Info Metadata -->
        <div class="md:col-span-4 space-y-8 border-t border-white/10 pt-8 md:pt-10">
          <div>
            <h4 class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">Discipline</h4>
            <p class="text-white font-medium text-sm md:text-base">{{ project.work_categories?.title || 'Creative Design' }}</p>
          </div>
          <div v-if="project.sub_category">
            <h4 class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">Tags / Expertise</h4>
            <p class="text-white font-medium text-sm md:text-base">{{ project.sub_category }}</p>
          </div>
          <div>
            <h4 class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-2">Client / Status</h4>
            <p class="text-white font-medium text-sm md:text-base">Portfolio Showcase</p>
          </div>
        </div>

        <!-- Right Column: Brief / Description -->
        <div class="md:col-span-8 border-t border-white/10 pt-8 md:pt-10">
          <h4 class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-6">Project Overview</h4>
          
          <div v-if="project.description" class="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed">
            <!-- Pakai properti white-space pre-wrap biar kalau kamu ngetik enter di admin, di sini ikutan enter -->
            <p class="whitespace-pre-wrap">{{ project.description }}</p>
          </div>
          <div v-else class="text-gray-500 italic font-light">
            <p>Detail brief untuk proyek ini sedang disusun. Karya ini merupakan representasi dari eksplorasi visual yang berfokus pada estetika dan fungsi penyampaian pesan.</p>
          </div>
        </div>

      </div>

    </article>

  </main>
</template>