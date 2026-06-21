<!-- src/components/admin/CategoriesManager.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const categories = ref([])
const isLoading = ref(true)
const isSaving = ref(false)
const editingId = ref(null)

const toastNotification = ref({ show: false, message: '', type: 'success' })
const showToast = (message, type = 'success') => {
  toastNotification.value = { show: true, message, type }
  setTimeout(() => { toastNotification.value.show = false }, 4000)
}

// Form state buat edit
const editForm = ref({
  title: '',
  description: '',
  image_url: '',
  imageFile: null,
  imagePreview: null
})

const fetchCategories = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('work_categories')
      .select('*')
      .order('order_index', { ascending: true })
    if (error) throw error
    categories.value = data
  } catch (error) {
    showToast('Gagal memuat data kategori.', 'error')
  } finally {
    isLoading.value = false
  }
}

const startEdit = (cat) => {
  editingId.value = cat.id
  editForm.value = {
    title: cat.title,
    description: cat.description || '',
    image_url: cat.image_url,
    imageFile: null,
    imagePreview: cat.image_url || null
  }
}

const cancelEdit = () => {
  editingId.value = null
  editForm.value = { title: '', description: '', image_url: '', imageFile: null, imagePreview: null }
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    return showToast('Pilih file gambar yang valid.', 'error')
  }
  editForm.value.imageFile = file
  editForm.value.imagePreview = URL.createObjectURL(file)
}

const saveCategory = async () => {
  if (!editForm.value.title) return showToast('Judul tidak boleh kosong.', 'error')
  
  isSaving.value = true
  try {
    let finalImageUrl = editForm.value.image_url

    // Kalau user pilih gambar baru, upload dulu ke storage
    if (editForm.value.imageFile) {
      const file = editForm.value.imageFile
      const fileExt = file.name.split('.').pop()
      const fileName = `category_${editingId.value}_${Date.now()}.${fileExt}`
      const filePath = `categories/${fileName}`

      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath)
      finalImageUrl = publicUrl
    }

    // Update data di database
    const { error: dbError } = await supabase
      .from('work_categories')
      .update({
        title: editForm.value.title,
        description: editForm.value.description,
        image_url: finalImageUrl
      })
      .eq('id', editingId.value)

    if (dbError) throw dbError

    showToast('Kategori berhasil diperbarui!', 'success')
    cancelEdit()
    await fetchCategories()
  } catch (error) {
    showToast('Gagal menyimpan perubahan.', 'error')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => fetchCategories())
</script>

<template>
  <div class="animate-[fadeIn_0.3s_ease-out]">
    
    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="toastNotification.show" class="fixed bottom-8 right-8 z-[100] px-5 py-3 rounded-2xl bg-[#1A1A1A] border border-white/10 shadow-xl flex items-center gap-3 backdrop-blur-xl">
        <p class="text-sm font-medium text-white/90">{{ toastNotification.message }}</p>
      </div>
    </transition>

    <div class="mb-8">
      <h3 class="text-2xl font-light tracking-tight text-white mb-1">Work Categories</h3>
      <p class="text-[11px] text-gray-500 font-medium">Atur judul, deskripsi, dan thumbnail untuk setiap kategori karya.</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-48 border border-dashed border-white/10 rounded-3xl bg-[#111111]">
      <div class="w-8 h-8 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin"></div>
    </div>

    <!-- Data List -->
    <div v-else class="space-y-4">
      <div v-for="cat in categories" :key="cat.id" class="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden transition-all group">
        
        <!-- MODE VIEW -->
        <div v-if="editingId !== cat.id" class="flex flex-col sm:flex-row p-4 gap-5 items-center">
          
          <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-black/50 border border-white/10 overflow-hidden shrink-0 relative">
            <img v-if="cat.image_url" :src="cat.image_url" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-600">No Img</div>
            <span v-if="cat.is_main" class="absolute top-2 left-2 bg-cyan-500 text-black text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Main</span>
            <span v-else class="absolute top-2 left-2 bg-white/20 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Side</span>
          </div>
          
          <div class="flex-1 min-w-0 w-full text-center sm:text-left">
            <h4 class="text-lg font-bold text-white tracking-wide">{{ cat.title }}</h4>
            <p class="text-sm text-gray-400 mt-1 line-clamp-2">{{ cat.description || 'Belum ada deskripsi.' }}</p>
          </div>
          
          <div class="shrink-0">
            <button @click="startEdit(cat)" class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all w-full sm:w-auto">
              Edit Data
            </button>
          </div>
        </div>

        <!-- MODE EDIT -->
        <div v-else class="p-5 bg-white/[0.02] border-t border-cyan-500/30">
          <div class="flex flex-col md:flex-row gap-6">
            
            <!-- Edit Thumbnail -->
            <div class="shrink-0 flex flex-col items-center gap-3">
              <div class="w-32 h-40 rounded-xl bg-black border border-dashed border-white/20 overflow-hidden relative group/img">
                <img v-if="editForm.imagePreview" :src="editForm.imagePreview" class="w-full h-full object-cover opacity-80" />
                <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity">
                  <label class="px-3 py-1.5 bg-white text-black text-[10px] font-bold uppercase rounded cursor-pointer">
                    Ganti
                    <input type="file" accept="image/*" class="hidden" @change="handleFileSelect">
                  </label>
                </div>
              </div>
              <p class="text-[9px] text-gray-500 uppercase tracking-widest text-center">Rasio 3:4<br/>(Portrait)</p>
            </div>

            <!-- Edit Teks -->
            <div class="flex-1 space-y-4">
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Judul Kategori</label>
                <input v-model="editForm.title" type="text" class="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors">
              </div>
              <div>
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Deskripsi Singkat</label>
                <textarea v-model="editForm.description" rows="3" class="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"></textarea>
              </div>
              
              <div class="flex items-center gap-3 pt-2">
                <button @click="saveCategory" :disabled="isSaving" class="px-6 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-2">
                  <span v-if="isSaving" class="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
                </button>
                <button @click="cancelEdit" :disabled="isSaving" class="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all">
                  Batal
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px) scale(0.9); }
</style>