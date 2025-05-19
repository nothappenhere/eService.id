<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.ts'
import router from '@/router'
import axios from 'axios'
import logo from '@/assets/img/logo.png'

const login = reactive({
  email: '',
  password: '',
  isSubmitting: false,
})

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!login.email || !login.password) {
    return toast.error('All fields are required!', toastOpt.toastOptions)
  }
  if (login.password.length < 8) {
    return toast.error('Password must be at least 8 characters.', toastOpt.toastOptions)
  }

  const newLogin = {
    ...login,
  }

  try {
    login.isSubmitting = !login.isSubmitting
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const response = await axios.post('http://localhost:8000/api/auth/login', newLogin)
    const user = response.data.data

    // localStorage.setItem('authToken', response.data.token) // Simpan token di localStorage
    // localStorage.setItem('userId', user.user_id) // Simpan id user di localStorage
    // localStorage.setItem('UserFullName', user.full_name) // Simpan nama lengkap user di localStorage
    // localStorage.setItem('userRole', user.role) // Simpan role user di localStorage

    //! Arahkan ke halaman sesuai role
    // if (user.role === 'admin') {
    //   router.push('/dashboard/admin')
    // } else if (user.role === 'user') {
    //   router.push(`/dashboard/user`)
    // } else if (user.role === 'company') {
    //   localStorage.setItem('companyId', user.company_id) // Simpan id company di localStorage
    //   localStorage.setItem('userEmail', user.email) // Simpan email user di localStorage

    //   router.push('/dashboard/company/company-details')
    // } else {
    //   router.push('/') // Default jika role tidak dikenali
    // }

    toast.success(`Welcome ${user.full_name}.`, toastOpt.toastOptions)
  } catch (error) {
    toast.error('Something went wrong, please try again.', toastOpt.toastOptions)
  } finally {
    // Reset input
    login.email = ''
    login.password = ''
    login.isSubmitting = !login.isSubmitting
  }
}
</script>

<template>
  <section class="bg-[#F6F6F9]">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" :src="logo" alt="Vue Jobs" />
          <h2 class="text-3xl text-center font-bold mb-8">Log in to your account</h2>

          <div class="mb-2">
            <i class="fa-solid fa-envelope me-2"></i>
            <label class="text-gray-700 font-bold mb-4">Email Address</label>
            <input
              type="email"
              v-model="login.email"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="eg. example@mail.com"
              required
            />
          </div>

          <div class="mb-4">
            <i class="fa-solid fa-lock me-2"></i>
            <label class="text-gray-700 font-bold">Password</label>
            <input
              type="password"
              v-model="login.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            :class="[
              !login.isSubmitting
                ? 'bg-[#ff9900] hover:bg-[#e27200]  text-white font-bold py-4 px-4 w-full cursor-pointer'
                : 'bg-[#ffd246]  text-white font-bold py-4 px-4 w-full',
            ]"
            type="submit"
          >
            Sign In
          </button>

          <div class="flex justify-between mt-5">
            <RouterLink to="/forgot-password" class="text-gray-500 hover:text-gray-600"
              >Forgot Password?</RouterLink
            >
            <RouterLink to="/register/citizen" class="text-gray-500 hover:text-gray-600"
              >Create Free Account</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
