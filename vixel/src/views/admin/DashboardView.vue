<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

// IMPORT KOMPONEN ADMIN
// (Yang belum dibikin sengaja di-comment dulu biar nggak error layarnya putih)
import OverviewManager from '@/components/admin/OverviewManager.vue'
import CategoriesManager from '@/components/admin/CategoriesManager.vue'
import PortfolioManager from '@/components/admin/PortfolioManager.vue'
import VisualsManager from '@/components/admin/VisualsManager.vue'
// import BrandsManager from '@/components/admin/BrandsManager.vue'
// import SettingsManager from '@/components/admin/SettingsManager.vue'

const router = useRouter()
const userEmail = ref('')
const activeTab = ref('overview') // Default pas buka admin langsung ke Overview
const isMobileMenuOpen = ref(false)

// MAPPING KOMPONEN
const componentsMap = {
  overview: OverviewManager,
  categories: CategoriesManager,
  items: PortfolioManager,
  visuals: VisualsManager,
  // brands: BrandsManager,
  // settings: SettingsManager
}

const activeComponent = computed(() => componentsMap[activeTab.value])

// LIST MENU SESUAI SCREENSHOT DESAINMU
const menuItems = [
  { id: 'overview', name: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'categories', name: 'Categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' },
  { id: 'items', name: 'Portfolio Items', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'visuals', name: 'Visual Explorations', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'brands', name: 'Clients & Brands', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 8h8' },
  { id: 'settings', name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
]

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) userEmail.value = user.email
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/admin')
}
</script>

<template>
  <div class="relative min-h-screen bg-[#050505] text-white font-sans overflow-hidden flex">
    
    <!-- BACKGROUND AMBIENT -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-cyan-600/10 blur-[120px]"></div>
    </div>

    <!-- SIDEBAR -->
    <aside class="w-[260px] bg-[#0A0A0A] border-r border-white/5 flex flex-col justify-between shrink-0 z-50">
      <div>
        <div class="h-20 flex items-center px-6 border-b border-white/5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]"><span class="text-[#050505] font-bold text-sm tracking-tighter">AF</span></div>
          <h1 class="text-sm font-semibold tracking-wide">CMS Workspace</h1>
        </div>
        
        <nav class="p-4 space-y-1.5">
          <p class="px-3 text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-4 mt-2">Manage Content</p>
          <button v-for="item in menuItems" :key="item.id" @click="activeTab = item.id"
            :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300', activeTab === item.id ? 'bg-white/10 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5']">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" /></svg>
            {{ item.name }}
          </button>
        </nav>
      </div>

      <div class="p-4 border-t border-white/5">
        <div class="flex items-center gap-3 px-3 py-2 mb-2">
          <div class="w-8 h-8 rounded-full bg-[#1F2937] border border-white/10 flex items-center justify-center text-gray-300 text-xs font-medium">
            {{ userEmail ? userEmail.charAt(0).toUpperCase() : 'U' }}
          </div>
          <div class="overflow-hidden flex-1">
            <p class="text-[10px] text-white truncate">{{ userEmail }}</p>
            <p class="text-[9px] text-gray-500 tracking-wider">ADMINISTRATOR</p>
          </div>
        </div>
        <button @click="handleLogout" class="w-full px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- MAIN AREA -->
    <div class="relative flex-1 flex flex-col h-screen w-full z-10">
      
      <header class="absolute top-4 left-8 right-8 h-[60px] bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-6 z-30 shadow-xl">
        <h2 class="text-sm font-semibold capitalize flex items-center gap-2 text-white">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          {{ activeTab.replace('-', ' ') }}
        </h2>
        <a href="/" target="_blank" class="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-[10px] font-bold uppercase tracking-widest transition-colors">Live Site ↗</a>
      </header>

      <main class="flex-1 overflow-y-auto pt-[100px] px-8 pb-12 w-full h-full z-20">
        <div class="max-w-5xl mx-auto">
          
          <!-- RENDER KOMPONEN DINAMIS DI SINI -->
          <component v-if="activeComponent" :is="activeComponent" />
          
          <div v-else class="flex flex-col items-center justify-center h-[50vh] bg-[#111111] rounded-[2rem] border border-white/5 text-center px-6">
            <svg class="w-12 h-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            <p class="text-gray-400 text-sm">Modul <strong class="text-white uppercase tracking-widest">{{ activeTab }}</strong> masih diracik (Dalam Pengembangan).</p>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>