<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    router.push('/admin/dashboard')
  } catch (error) {
    errorMessage.value = 'Email atau password tidak valid.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 w-full relative overflow-hidden bg-[#07090F]">
    
    <!-- Ambient Glow Khusus Login -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

    <!-- Card Login Glassmorphism -->
    <div class="w-full max-w-md p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]" data-aos="zoom-in" data-aos-duration="800">
      
      <!-- Branding Af Rizal -->
      <div class="text-center mb-10">
        <div class="w-12 h-12 mx-auto border border-white/20 rounded-full flex items-center justify-center mb-4 bg-white/5">
          <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
        </div>
        <h1 class="text-3xl font-light tracking-wide text-white mb-2">
          Af Rizal <span class="font-serif italic text-cyan-400">Workspace</span>
        </h1>
        <p class="text-[9px] text-white/40 uppercase tracking-[0.2em]">Portfolio Management System</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div>
          <label class="block text-[9px] text-white/50 uppercase tracking-widest mb-2 ml-1">Email Access</label>
          <input 
            v-model="email" 
            type="email" 
            required
            class="w-full bg-[#07090F]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/5 transition-all duration-300"
            placeholder="rizqi@example.com"
          >
        </div>

        <div>
          <label class="block text-[9px] text-white/50 uppercase tracking-widest mb-2 ml-1">Security Key</label>
          <input 
            v-model="password" 
            type="password" 
            required
            class="w-full bg-[#07090F]/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/5 transition-all duration-300"
            placeholder="••••••••"
          >
        </div>

        <p v-if="errorMessage" class="text-red-400 text-[11px] text-center mt-1 bg-red-400/10 py-2 rounded-lg border border-red-400/20">{{ errorMessage }}</p>

        <button 
          type="submit" 
          :disabled="loading"
          class="mt-6 w-full bg-white text-[#07090F] hover:bg-cyan-50 hover:scale-[1.02] text-xs font-semibold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-[#07090F]/20 border-t-[#07090F] rounded-full animate-spin"></span>
          {{ loading ? 'Authenticating...' : 'Enter Workspace' }}
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-1 transition-transform">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </form>

      <!-- Vixel Credit -->
      <div class="mt-8 text-center">
        <p class="text-[8px] text-white/20 tracking-widest uppercase">System developed by Vixel Creative</p>
      </div>

    </div>
  </div>
</template>