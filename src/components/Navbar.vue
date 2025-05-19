<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import router from '@/router'
import logo from '@/assets/img/logo.png'

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}

const role = ref(localStorage.getItem('userRole'))

const logout = () => {
  const toast = useToast()

  localStorage.removeItem('authToken')
  localStorage.removeItem('userId')
  localStorage.removeItem('userRole')
  localStorage.removeItem('admin-instansiId')
  localStorage.removeItem('userEmail')

  role.value = null

  toast.success('Log out Successfully')
  router.push('/')
}
</script>

<template>
  <nav class="bg-[#145C9E] border-b border-[#172754]">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink to="/" class="flex flex-shrink-0 items-center">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-3 hover:text-gray-100">
              eService.id
            </span>
          </RouterLink>

          <!-- Default Section -->
          <div v-if="role === null" class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-[#134879] hover:bg-[#163d64]'
                    : 'hover:bg-[#163d64] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/about"
                :class="[
                  isActiveLink('/about')
                    ? 'bg-[#134879] hover:bg-[#163d64]'
                    : 'hover:bg-[#163d64] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >About</RouterLink
              >
              <RouterLink
                to="/services"
                :class="[
                  isActiveLink('/services')
                    ? 'bg-[#134879] hover:bg-[#163d64]'
                    : 'hover:bg-[#163d64] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Services</RouterLink
              >
              <RouterLink
                to="/login"
                :class="[
                  isActiveLink('/login')
                    ? 'bg-[#134879] hover:bg-[#163d64]'
                    : 'hover:bg-[#163d64] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Log in</RouterLink
              >
              <RouterLink
                to="/register/citizen"
                :class="[
                  isActiveLink('/register/citizen') || isActiveLink('/register/agency')
                    ? 'bg-[#134879] hover:bg-[#163d64] hover:border-[#163d64] border-2 border-[#134879]'
                    : 'hover:bg-[#163d64] border-2 border-[#163d64]',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Sign Up</RouterLink
              >
            </div>
          </div>

          <!-- user Section -->
          <div v-else-if="role === 'user'" class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/dashboard/user"
                :class="[
                  isActiveLink('/dashboard/user')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Dashboard</RouterLink
              >
              <RouterLink
                to="/dashboard/user/submit-letter"
                :class="[
                  isActiveLink('/dashboard/user/submit-letter')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Ajukan Surat</RouterLink
              >
              <RouterLink
                to="/dashboard/user/apply-history"
                :class="[
                  isActiveLink('/dashboard/user/apply-history')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Riwayat Pengajuan</RouterLink
              >
              <RouterLink
                to="/dashboard/user/profile"
                :class="[
                  isActiveLink('/dashboard/user/profile')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Profil</RouterLink
              >
              <button
                type="button"
                @click="logout"
                class="hover:bg-[#172754] border-2 text-white rounded-md px-3 py-2"
              >
                Keluar
              </button>
            </div>
          </div>

          <!-- admin-instansi Section -->
          <div v-else-if="role === 'admin-instansi'" class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/dashboard/admin-instansi"
                :class="[
                  isActiveLink('/dashboard/admin-instansi')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Dashboard</RouterLink
              >
              <RouterLink
                to="/dashboard/admin-instansi/search"
                :class="[
                  isActiveLink('/dashboard/admin-instansi/search')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Daftar Pengajuan Masuk</RouterLink
              >
              <RouterLink
                to="/dashboard/admin-instansi/add-job"
                :class="[
                  isActiveLink('/dashboard/admin-instansi/add-job')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Add job</RouterLink
              >
              <RouterLink
                to="/dashboard/admin-instansi/apply-history"
                :class="[
                  isActiveLink('/dashboard/admin-instansi/apply-history')
                    ? 'bg-[#1e44af] hover:bg-[#172754]'
                    : 'hover:bg-[#172754] hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                ]"
                >Manage applicant</RouterLink
              >
              <button
                type="button"
                @click="logout"
                class="hover:bg-[#172754] border-2 text-white rounded-md px-3 py-2"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
