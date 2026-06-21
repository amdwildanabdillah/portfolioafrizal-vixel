<!-- src/components/admin/VisualsManager.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const visuals = ref([])
const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const uploadStatusText = ref('')
const toastNotification = ref({ show: false, message: '', type: 'success' })

const showToast = (message, type = 'success') => {
  toastNotification.value = { show: true, message, type }
  setTimeout(() => { toastNotification.value.show = false }, 4000)
}

const getFileNameFromUrl = (url) => url.split('/').pop() || 'Unknown File'
const formatDate = (dateString) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateString))

const fetchVisuals = async () => {
  try {
    const { data, error } = await supabase.from('visual_explorations').select('*').order('created_at', { ascending: false })
    if (error) throw error
    visuals.value = data
  } catch (error) {
    console.error('Fetch error:', error.message)
  }
}

const checkImageOrientation = (file) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img.width >= img.height ? 'landscape' : 'vertical')
    img.src = URL.createObjectURL(file)
  })
}

const processFiles = async (files) => {
  const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
  if (validFiles.length === 0) return showToast('Pilih format gambar yang valid', 'error')

  isUploading.value = true
  let successCount = 0

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i]
    uploadStatusText.value = `Mengunggah ${i + 1} dari ${validFiles.length}...`
    uploadProgress.value = Math.round((i / validFiles.length) * 100)

    try {
      const orientation = await checkImageOrientation(file)
      const fileExt = file.name.split('.').pop()
      const originalName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-')
      const fileName = `${originalName}_${Date.now()}.${fileExt}`
      const filePath = `visuals/${fileName}`

      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath)

      const { error: dbError } = await supabase.from('visual_explorations').insert([{ 
        image_url: publicUrl, orientation, is_active: true 
      }])
      
      if (dbError) throw dbError
      successCount++
    } catch (error) {
      console.error(`Gagal upload ${file.name}:`, error.message)
    }
  }

  uploadProgress.value = 100
  uploadStatusText.value = 'Selesai!'
  
  setTimeout(() => {
    isUploading.value = false
    showToast(`${successCount} gambar berhasil ditambahkan.`)
    fetchVisuals()
  }, 1500)
}

const onDrop = (e) => { isDragging.value = false; processFiles(e.dataTransfer.files) }
const onFileSelect = (e) => { processFiles(e.target.files); e.target.value = '' }

const toggleVisibility = async (id, currentStatus) => {
  try {
    await supabase.from('visual_explorations').update({ is_active: !currentStatus }).eq('id', id)
    const item = visuals.value.find(v => v.id === id)
    if (item) item.is_active = !currentStatus
  } catch (error) {
    showToast('Gagal merubah visibilitas', 'error')
  }
}

const deleteVisual = async (id, imageUrl) => {
  if (!confirm('Yakin ingin menghapus permanen?')) return
  try {
    await supabase.from('visual_explorations').delete().eq('id', id)
    const urlParts = imageUrl.split('/')
    await supabase.storage.from('portfolio-assets').remove([`visuals/${urlParts[urlParts.length - 1]}`])
    fetchVisuals()
    showToast('Gambar dihapus', 'success')
  } catch (error) {
    showToast('Gagal menghapus', 'error')
  }
}

onMounted(() => fetchVisuals())
</script>

<template>
  <div class="animate-[fadeIn_0.3s_ease-out]">
    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="toastNotification.show" class="fixed bottom-8 right-8 z-[100] px-5 py-3 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-xl flex items-center gap-3 backdrop-blur-xl">
        <p class="text-sm font-medium text-white/90">{{ toastNotification.message }}</p>
      </div>
    </transition>

    <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h3 class="text-2xl font-light tracking-tight text-white mb-1">Visual Explorations</h3>
        <p class="text-[11px] text-gray-500 font-medium">Upload dan kelola antrean gambar section marquee.</p>
      </div>
    </div>

    <!-- Dropzone -->
    <div @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="onDrop"
      :class="isDragging ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]' : 'border-white/10 bg-[#111111]/80 hover:border-white/20'"
      class="relative w-full py-8 px-6 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all duration-300 mb-8 overflow-hidden group">
      <div v-if="isUploading" class="w-full max-w-md mx-auto z-10 flex flex-col items-center">
        <div class="w-8 h-8 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin mb-3"></div>
        <h4 class="text-sm text-white font-medium mb-1">{{ uploadStatusText }}</h4>
        <div class="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
          <div class="h-full bg-cyan-400 transition-all duration-300 ease-out" :style="{ width: uploadProgress + '%' }"></div>
        </div>
      </div>
      <div v-else class="z-10 flex flex-col items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-gray-400 mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        <h4 class="text-sm text-white font-medium mb-1 pointer-events-auto">Tarik gambarmu ke sini</h4>
        <label class="pointer-events-auto bg-white text-[#050505] mt-3 px-5 py-2 rounded-full text-[10px] font-bold uppercase cursor-pointer">
          Pilih File <input type="file" multiple accept="image/*" @change="onFileSelect" class="hidden">
        </label>
      </div>
    </div>

    <!-- Data List -->
    <div v-if="visuals.length > 0" class="space-y-3">
      <h4 class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Daftar Aset ({{ visuals.length }})</h4>
      <div v-for="item in visuals" :key="item.id" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#111111] border border-white/5 rounded-2xl gap-4 group" :class="!item.is_active ? 'opacity-50 grayscale' : ''">
        <div class="flex items-center gap-4 overflow-hidden">
          <div class="w-16 h-16 rounded-xl bg-black/50 border border-white/10 overflow-hidden shrink-0">
            <img :src="item.image_url" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white truncate mb-1">{{ getFileNameFromUrl(item.image_url) }}</p>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider" :class="item.orientation === 'landscape' ? 'bg-blue-500/10 text-blue-400' : 'bg-fuchsia-500/10 text-fuchsia-400'">{{ item.orientation }}</span>
              <span class="text-[10px] text-gray-500">{{ formatDate(item.created_at) }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button @click="toggleVisibility(item.id, item.is_active)" class="px-4 py-2 rounded-xl text-xs font-semibold border" :class="item.is_active ? 'bg-white/5 text-gray-300' : 'bg-cyan-500/10 text-cyan-400'">{{ item.is_active ? 'Hide' : 'Show' }}</button>
          <button @click="deleteVisual(item.id, item.image_url)" class="p-2 rounded-xl bg-red-500/10 text-red-400"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-48 border border-dashed border-white/10 rounded-3xl bg-[#111111]">
      <p class="text-sm text-gray-500">Belum ada aset visual.</p>
    </div>
  </div>
</template>