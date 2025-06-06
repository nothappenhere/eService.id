<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.ts'
import router from '@/router'
import axios from 'axios'
import logo from '@/assets/img/logo.png'

const resetCredentials = reactive({
  email: '',
  password: '',
  isEmailValid: false,
  isSubmitting: false,
})

const toast = useToast()
const toastOpt = useToastOption()

const checkEmailExist = async () => {
  if (!resetCredentials.email) {
    return toast.error('All fields are required!', toastOpt.toastOptions)
  }

  try {
    resetCredentials.isSubmitting = !resetCredentials.isSubmitting
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const response = await axios.post('http://localhost:8000/api/auth/check-email', {
      email: resetCredentials.email,
    })

    if (response.data.exists) {
      toast.success('Valid email address, please enter new password.', toastOpt.toastOptions)
      resetCredentials.isEmailValid = !resetCredentials.isEmailValid
    }
  } catch (error) {
    toast.info('Invalid email address, please enter a valid email.', toastOpt.toastOptions)
  } finally {
    resetCredentials.isSubmitting = !resetCredentials.isSubmitting
  }
}

const handleSubmit = async () => {
  if (!resetCredentials.email || !resetCredentials.password) {
    return toast.error('All fields are required!', toastOpt.toastOptions)
  }
  if (resetCredentials.password.length < 8) {
    return toast.error('Password must be at least 8 characters.', toastOpt.toastOptions)
  }

  const newCredentials = {
    ...resetCredentials,
  }

  try {
    resetCredentials.isSubmitting = !resetCredentials.isSubmitting
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    await axios.post('http://localhost:8000/api/auth/reset-password', newCredentials)

    router.push('/login')
    toast.success('Password reset successful.')
  } catch (error) {
    toast.error('Something went wrong, please try again.', toastOpt.toastOptions)
  } finally {
    // Reset input
    resetCredentials.email = ''
    resetCredentials.password = ''
    resetCredentials.isSubmitting = !resetCredentials.isSubmitting
  }
}
</script>

<template>
  <section class="bg-[#F6F6F9]">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" :src="logo" alt="Vue Jobs" />
          <h2 class="text-3xl text-center font-bold mb-8">Set a New Password</h2>

          <div class="mb-2">
            <i class="fa-solid fa-envelope me-2"></i>
            <label class="text-gray-700 font-bold mb-4">Email Address</label>
            <input
              type="email"
              v-model="resetCredentials.email"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="eg. example@mail.com"
              required
            />
          </div>

          <div class="mb-4" v-if="resetCredentials.isEmailValid">
            <i class="fa-solid fa-lock me-2"></i>
            <label class="text-gray-700 font-bold">New Password</label>
            <input
              type="password"
              v-model="resetCredentials.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Enter new password"
              required
            />
          </div>

          <!-- Check Email Button -->
          <button
            v-if="!resetCredentials.isEmailValid"
            :class="[
              !resetCredentials.isSubmitting
                ? 'bg-[#ff9900] hover:bg-[#e27200]  text-white font-bold py-4 px-4 w-full cursor-pointer'
                : 'bg-[#ffd246]  text-white font-bold py-4 px-4 w-full',
            ]"
            type="button"
            @click="checkEmailExist"
          >
            Check Email
          </button>

          <!-- Reset Password Button -->
          <button
            v-else
            :class="[
              !resetCredentials.isSubmitting
                ? 'bg-[#ff9900] hover:bg-[#e27200]  text-white font-bold py-4 px-4 w-full cursor-pointer'
                : 'bg-[#ffd246]  text-white font-bold py-4 px-4 w-full',
            ]"
            type="submit"
          >
            Reset Password
          </button>

          <div class="flex justify-start items-center mt-5">
            <i class="fa fa-solid fa-arrow-left me-2 mt-[0.2rem]"></i>
            <RouterLink to="/login" class="text-gray-500 hover:text-gray-600">
              Return to Login Page
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
