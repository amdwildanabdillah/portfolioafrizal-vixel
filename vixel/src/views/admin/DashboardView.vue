<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const userEmail = ref('')
const activeTab = ref('visuals')
const isMobileMenuOpen = ref(false)

// State Visuals
const visuals = ref([])
const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const uploadStatusText = ref('')
const toastNotification = ref({ show: false, message: '', type: 'success' })

const menuItems = [
  { id: 'dashboard', name: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'categories', name: 'Categories', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' },
  { id: 'items', name: 'Portfolio Items', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'visuals', name: 'Visual Explorations', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'brands', name: 'Clients & Brands', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { id: 'settings', name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
]

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) userEmail.value = user.email
  fetchVisuals()
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/admin')
}

const showToast = (message, type = 'success') => {
  toastNotification.value = { show: true, message, type }
  setTimeout(() => { toastNotification.value.show = false }, 4000)
}

// FORMATTER HELPERS
const getFileNameFromUrl = (url) => {
  const parts = url.split('/')
  return parts[parts.length - 1] || 'Unknown File'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

const fetchVisuals = async () => {
  try {
    const { data, error } = await supabase.from('visual_explorations').select('*').order('created_at', { ascending: false })
    if (error) throw error
    visuals.value = data
  } catch (error) {
    console.error('Fetch error:', error.message)
  }
}

// LOGIKA DETEKSI ORIENTASI GAMBAR (Landscape / Vertical)
const checkImageOrientation = (file) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      resolve(img.width >= img.height ? 'landscape' : 'vertical')
    }
    img.src = URL.createObjectURL(file)
  })
}

// LOGIKA BULK UPLOAD & DRAG DROP
const processFiles = async (files) => {
  const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
  if (validFiles.length === 0) {
    showToast('Pilih format gambar yang valid (JPG/PNG/WEBP)', 'error')
    return
  }

  isUploading.value = true
  uploadProgress.value = 0
  let successCount = 0

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i]
    uploadStatusText.value = `Mengunggah ${i + 1} dari ${validFiles.length}...`
    uploadProgress.value = Math.round((i / validFiles.length) * 100)

    try {
      // 1. Deteksi Orientasi sebelum upload
      const orientation = await checkImageOrientation(file)

      // 2. Upload ke Storage
      const fileExt = file.name.split('.').pop()
      const originalName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')
      const fileName = `${originalName}_${Date.now()}.${fileExt}` // Pertahankan nama asli
      const filePath = `visuals/${fileName}`

      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file)
      if (uploadError) throw uploadError

      // 3. Ambil URL Publik
      const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath)

      // 4. Simpan ke Database lengkap dengan orientasi
      const { error: dbError } = await supabase.from('visual_explorations').insert([{ 
        image_url: publicUrl, 
        orientation: orientation,
        is_active: true 
      }])
      
      if (dbError) throw dbError
      successCount++
    } catch (error) {
      console.error(`Gagal upload ${file.name}:`, error.message)
    }
  }

  uploadProgress.value = 100
  uploadStatusText.value = 'Semua file berhasil diunggah!'
  
  setTimeout(() => {
    isUploading.value = false
    uploadProgress.value = 0
    showToast(`${successCount} gambar berhasil ditambahkan.`)
    fetchVisuals()
  }, 1500)
}

const onDrop = (e) => {
  isDragging.value = false
  processFiles(e.dataTransfer.files)
}
const onFileSelect = (e) => {
  processFiles(e.target.files)
  e.target.value = ''
}

// TOGGLE ACTIVE / INACTIVE
const toggleVisibility = async (id, currentStatus) => {
  try {
    const { error } = await supabase.from('visual_explorations').update({ is_active: !currentStatus }).eq('id', id)
    if (error) throw error
    // Update state lokal biar UI langsung berubah tanpa reload
    const item = visuals.value.find(v => v.id === id)
    if (item) item.is_active = !currentStatus
  } catch (error) {
    showToast('Gagal merubah visibilitas.', 'error')
  }
}

// DELETE ITEM
const deleteVisual = async (id, imageUrl) => {
  if (!confirm('Yakin ingin menghapus gambar ini permanen?')) return
  try {
    // 1. Hapus dari DB
    await supabase.from('visual_explorations').delete().eq('id', id)
    
    // 2. Hapus dari Storage
    const urlParts = imageUrl.split('/')
    await supabase.storage.from('portfolio-assets').remove([`visuals/${urlParts[urlParts.length - 1]}`])
    
    fetchVisuals()
    showToast('Gambar berhasil dihapus.', 'success')
  } catch (error) {
    showToast('Gagal menghapus gambar.', 'error')
  }
}
</script>

<template>
  <div class="relative min-h-screen bg-[#050505] text-white font-sans overflow-hidden flex">
    
    <transition name="toast">
      <div v-if="toastNotification.show" class="fixed bottom-8 right-8 z-[100] px-5 py-3 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 backdrop-blur-xl">
        <div :class="toastNotification.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'" class="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
          <svg v-if="toastNotification.type === 'success'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </div>
        <p class="text-sm font-medium text-white/90">{{ toastNotification.message }}</p>
      </div>
    </transition>

    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-cyan-600/10 blur-[120px] opacity-60 mix-blend-normal"></div>
      <div class="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-700/10 blur-[120px] opacity-50 mix-blend-normal"></div>
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
    </div>

    <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"></div>
    <aside :class="['fixed md:static inset-y-0 left-0 w-[260px] bg-[#0A0A0A] border-r border-white/5 flex flex-col justify-between shrink-0 z-50 transition-transform duration-300', isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
      <div>
        <div class="h-20 flex items-center px-6 border-b border-white/5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(6,182,212,0.3)]"><span class="text-[#050505] font-bold text-sm tracking-tighter">AF</span></div>
          <h1 class="text-sm font-semibold tracking-wide">CMS Workspace</h1>
        </div>
        <nav class="p-4 space-y-1.5">
          <p class="px-3 text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-4 mt-2">Manage Content</p>
          <button v-for="item in menuItems" :key="item.id" @click="activeTab = item.id; isMobileMenuOpen = false" :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300', activeTab === item.id ? 'bg-white/10 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5']">
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

    <div class="relative flex-1 flex flex-col h-screen w-full z-10">
      
      <header class="absolute top-4 left-4 right-4 md:left-[28px] md:right-8 h-[60px] bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-between px-6 z-30">
        <div class="flex items-center gap-3">
          <button @click="isMobileMenuOpen = true" class="md:hidden p-1.5 text-gray-400 hover:text-white rounded-full"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h10" /></svg></button>
          <h2 class="text-sm font-semibold tracking-wide text-white capitalize flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 hidden md:block"></span>{{ activeTab.replace('-', ' ') }}</h2>
        </div>
        <a href="/" target="_blank" class="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-1.5">Live Site</a>
      </header>

      <main class="flex-1 overflow-y-auto pt-[100px] px-4 md:px-8 pb-12 w-full h-full z-20 custom-scrollbar">
        <div class="max-w-5xl mx-auto">
          
          <div v-if="activeTab === 'visuals'" class="animate-[fadeIn_0.3s_ease-out]">
            
            <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 class="text-2xl font-light tracking-tight text-white mb-1">Visual Explorations</h3>
                <p class="text-[11px] text-gray-500 font-medium">Upload dan kelola antrean gambar untuk section marquee di beranda.</p>
              </div>
            </div>

            <div 
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onDrop"
              :class="isDragging ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]' : 'border-white/10 bg-[#111111]/80 hover:border-white/20'"
              class="relative w-full py-8 px-6 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-300 mb-8 overflow-hidden group"
            >
              <div v-if="isUploading" class="w-full max-w-md mx-auto z-10 flex flex-col items-center">
                <div class="w-8 h-8 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin mb-3"></div>
                <h4 class="text-sm text-white font-medium mb-1">{{ uploadStatusText }}</h4>
                <div class="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300 ease-out" :style="{ width: uploadProgress + '%' }"></div>
                </div>
              </div>
              <div v-else class="z-10 flex flex-col items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-gray-400 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                <h4 class="text-sm text-white font-medium mb-1 pointer-events-auto">Tarik gambarmu ke sini, atau klik tombol di bawah</h4>
                <label class="pointer-events-auto bg-white hover:bg-gray-200 text-[#050505] mt-3 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-colors shadow-lg">
                  Pilih File
                  <input type="file" multiple accept="image/*" @change="onFileSelect" class="hidden">
                </label>
              </div>
            </div>

            <div v-if="visuals.length > 0" class="space-y-3">
              <h4 class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Daftar Aset Tersimpan ({{ visuals.length }})</h4>
              
              <div v-for="item in visuals" :key="item.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#111111] border border-white/5 hover:border-white/10 rounded-2xl transition-all gap-4 group" :class="!item.is_active ? 'opacity-50 grayscale' : ''">
                
                <div class="flex items-center gap-4 overflow-hidden">
                  <div class="w-16 h-16 rounded-xl bg-black/50 border border-white/10 overflow-hidden shrink-0 relative">
                    <img :src="item.image_url" loading="lazy" class="w-full h-full object-cover" />
                    <div v-if="!item.is_active" class="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    </div>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-semibold text-white truncate mb-1" :title="getFileNameFromUrl(item.image_url)">
                      {{ getFileNameFromUrl(item.image_url) }}
                    </p>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border border-transparent"
                            :class="item.orientation === 'landscape' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20'">
                        {{ item.orientation || 'Unknown' }}
                      </span>
                      <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/10">
                        {{ getFileNameFromUrl(item.image_url).split('.').pop() }}
                      </span>
                      <span class="text-[10px] text-gray-500 ml-1">{{ formatDate(item.created_at) }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <button @click="toggleVisibility(item.id, item.is_active)" class="px-4 py-2 rounded-xl text-xs font-semibold transition-all border" :class="item.is_active ? 'bg-white/5 text-gray-300 hover:bg-white/10 border-transparent hover:border-white/10' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'">
                    {{ item.is_active ? 'Hide' : 'Show' }}
                  </button>
                  
                  <button @click="deleteVisual(item.id, item.image_url)" class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-all border border-red-500/20" title="Hapus Permanen">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>

              </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center h-48 text-center border border-dashed border-white/10 rounded-3xl bg-[#111111]">
              <p class="text-sm text-gray-500">Belum ada aset visual. Mulai upload di atas.</p>
            </div>

          </div>

          <div v-else class="animate-[fadeIn_0.3s_ease-out] flex flex-col items-center justify-center h-[50vh] text-center bg-[#111111] rounded-[2rem] border border-white/5">
            <p class="text-gray-400 text-sm">Modul <strong class="text-white uppercase tracking-widest text-[10px] mx-1">{{ activeTab }}</strong> dalam pengembangan.</p>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px) scale(0.9); }
</style>