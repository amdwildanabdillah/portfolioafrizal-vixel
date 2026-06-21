<!-- src/components/admin/PortfolioManager.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const items = ref([])
const categories = ref([])
const isLoading = ref(true)
const isSaving = ref(false)
const showForm = ref(false)

const toastNotification = ref({ show: false, message: '', type: 'success' })
const showToast = (message, type = 'success') => {
  toastNotification.value = { show: true, message, type }
  setTimeout(() => { toastNotification.value.show = false }, 4000)
}

// State Form
const form = ref({
  id: null,
  title: '',
  description: '',
  category_id: '',
  sub_category: '', // Contoh: Meta Ads, Poster, Feed
  image_url: '',
  imageFile: null,
  imagePreview: null
})

// Tarik data Portfolio & Kategori buat Dropdown
const fetchData = async () => {
  isLoading.value = true
  try {
    // 1. Ambil List Kategori
    const { data: catData } = await supabase.from('work_categories').select('id, title').order('order_index')
    categories.value = catData || []

    // 2. Ambil List Portfolio
    const { data: itemData, error } = await supabase
      .from('portfolio_items')
      .select('*, work_categories(title)')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    items.value = itemData
  } catch (error) {
    showToast('Gagal memuat data.', 'error')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (!file.type.startsWith('image/')) return showToast('Pilih format gambar', 'error')
  
  form.value.imageFile = file
  form.value.imagePreview = URL.createObjectURL(file)
}

const resetForm = () => {
  form.value = { id: null, title: '', description: '', category_id: '', sub_category: '', image_url: '', imageFile: null, imagePreview: null }
  showForm.value = false
}

const openEdit = (item) => {
  form.value = {
    id: item.id,
    title: item.title,
    description: item.description || '',
    category_id: item.category_id,
    sub_category: item.sub_category || '',
    image_url: item.image_url,
    imageFile: null,
    imagePreview: item.image_url
  }
  showForm.value = true
}

const saveItem = async () => {
  if (!form.value.title || !form.value.category_id) {
    return showToast('Judul dan Kategori Master wajib diisi.', 'error')
  }

  isSaving.value = true
  try {
    let finalImageUrl = form.value.image_url

    // Upload gambar baru jika ada
    if (form.value.imageFile) {
      const file = form.value.imageFile
      const fileExt = file.name.split('.').pop()
      const fileName = `portfolio_${Date.now()}.${fileExt}`
      const filePath = `portfolio/${fileName}`

      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath)
      finalImageUrl = publicUrl
    }

    const payload = {
      title: form.value.title,
      description: form.value.description,
      category_id: form.value.category_id,
      sub_category: form.value.sub_category,
      image_url: finalImageUrl
    }

    if (form.value.id) {
      // Update data lama
      const { error } = await supabase.from('portfolio_items').update(payload).eq('id', form.value.id)
      if (error) throw error
      showToast('Karya berhasil diperbarui!', 'success')
    } else {
      // Masukin data baru
      const { error } = await supabase.from('portfolio_items').insert([payload])
      if (error) throw error
      showToast('Karya baru berhasil ditambahkan!', 'success')
    }

    resetForm()
    await fetchData()
  } catch (error) {
    showToast('Gagal menyimpan data.', 'error')
    console.error(error)
  } finally {
    isSaving.value = false
  }
}

const deleteItem = async (id, imageUrl) => {
  if (!confirm('Yakin ingin menghapus karya ini permanen?')) return
  try {
    await supabase.from('portfolio_items').delete().eq('id', id)
    if (imageUrl) {
      const fileName = imageUrl.split('/').pop()
      await supabase.storage.from('portfolio-assets').remove([`portfolio/${fileName}`])
    }
    showToast('Karya berhasil dihapus.', 'success')
    fetchData()
  } catch (error) {
    showToast('Gagal menghapus data.', 'error')
  }
}

onMounted(() => fetchData())
</script>

<template>
  <div class="animate-[fadeIn_0.3s_ease-out]">
    
    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="toastNotification.show" class="fixed bottom-8 right-8 z-[100] px-5 py-3 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-xl flex items-center gap-3 backdrop-blur-xl">
        <p class="text-sm font-medium text-white/90">{{ toastNotification.message }}</p>
      </div>
    </transition>

    <!-- Header & Action -->
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h3 class="text-2xl font-light tracking-tight text-white mb-1">Portfolio Items</h3>
        <p class="text-[11px] text-gray-500 font-medium">Upload dan kelola karya-karyamu di sini.</p>
      </div>
      <button v-if="!showForm" @click="showForm = true" class="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        Tambah Karya Baru
      </button>
    </div>

    <!-- FORM TAMBAH/EDIT KARYA -->
    <div v-if="showForm" class="bg-[#111111] border border-white/10 rounded-3xl p-6 mb-8 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
      <div class="flex flex-col md:flex-row gap-8">
        
        <!-- Thumbnail Upload -->
        <div class="shrink-0 flex flex-col items-center gap-3 w-full md:w-[200px]">
          <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest w-full text-left">Thumbnail</label>
          <div class="w-full aspect-[4/3] rounded-xl bg-black border border-dashed border-white/20 overflow-hidden relative group cursor-pointer hover:border-cyan-500/50 transition-colors">
            <img v-if="form.imagePreview" :src="form.imagePreview" class="w-full h-full object-cover opacity-80" />
            <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
              <svg class="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span class="text-[10px]">Klik untuk upload</span>
            </div>
            <input type="file" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="handleFileSelect">
          </div>
        </div>

        <!-- Inputs Form -->
        <div class="flex-1 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Judul Karya <span class="text-red-400">*</span></label>
              <input v-model="form.title" type="text" placeholder="Cth: Poster Bundling INB" class="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors">
            </div>
            <div>
              <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Kategori Master <span class="text-red-400">*</span></label>
              <select v-model="form.category_id" class="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
                <option value="" disabled selected>Pilih kategori...</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sub Kategori / Tag (Opsional)</label>
            <input v-model="form.sub_category" type="text" placeholder="Cth: Social Media Design, 3D Text, dll" class="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors">
          </div>

          <div>
            <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Deskripsi Singkat / Brief</label>
            <textarea v-model="form.description" rows="3" class="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
          </div>

          <!-- Buttons -->
          <div class="flex items-center gap-3 pt-2">
            <button @click="saveItem" :disabled="isSaving" class="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2">
              <span v-if="isSaving" class="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              {{ isSaving ? 'Menyimpan...' : 'Simpan Karya' }}
            </button>
            <button @click="resetForm" :disabled="isSaving" class="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all">
              Batal
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- LOADING LIST -->
    <div v-if="isLoading && !showForm" class="flex justify-center items-center h-48 border border-dashed border-white/10 rounded-3xl bg-[#111111]">
      <div class="w-8 h-8 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin"></div>
    </div>

    <!-- DATA LIST KARYA -->
    <div v-else-if="items.length > 0 && !showForm" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="item in items" :key="item.id" class="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors group relative flex flex-col">
        
        <div class="w-full aspect-video bg-black/50 border-b border-white/5 overflow-hidden relative">
          <img v-if="item.image_url" :src="item.image_url" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-600">No Image</div>
          
          <!-- Tombol Aksi (Muncul saat di hover) -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
            <button @click="openEdit(item)" class="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors" title="Edit">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>
            <button @click="deleteItem(item.id, item.image_url)" class="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors" title="Hapus">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
        
        <div class="p-4 flex flex-col flex-1">
          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {{ item.work_categories?.title || 'No Category' }}
            </span>
            <span v-if="item.sub_category" class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/10">
              {{ item.sub_category }}
            </span>
          </div>
          <h4 class="text-sm font-bold text-white mb-1 line-clamp-1" :title="item.title">{{ item.title }}</h4>
          <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">{{ item.description || 'Tidak ada deskripsi.' }}</p>
        </div>
      </div>
    </div>
    
    <div v-else-if="!showForm" class="flex flex-col items-center justify-center h-48 border border-dashed border-white/10 rounded-3xl bg-[#111111]">
      <p class="text-sm text-gray-500 mb-2">Belum ada karya yang diupload.</p>
    </div>

  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px) scale(0.9); }
</style>