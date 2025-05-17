<script setup>
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
})

const toast = useToast()
const toastOpt = useToastOption()

const checkEmailExist = async () => {
  try {
    const response = await axios.post('/api/check-email', {
      email: resetCredentials.email,
    })

    if (response.data.exists) {
      toast.success('Email is valid, please enter your new password.')
      resetCredentials.isEmailValid = true
    } else {
      toast.info('Invalid credentials. Please check your email address.')
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      toast.error(error.response.data.error) // Pesan error dari server
    } else {
      toast.error('Something went wrong, please try again.')
    }
  }
}

const handleSubmit = async () => {
  if (!resetCredentials.email || !resetCredentials.password) {
    return toast.error('All fields are required.')
  } else if (!resetCredentials.email.includes('@')) {
    return toast.error("Invalid email format, must be include '@' sign.")
  }
  if (resetCredentials.password.length < 8) {
    return toast.error('Password must be at least 8 characters long.')
  }

  const newCredential = {
    email: resetCredentials.email,
    password: resetCredentials.password,
  }

  try {
    await axios.post('/api/resetCredentials-password', newCredential)

    router.push('/login')
    toast.success('Password resetCredentials successfully.')
  } catch (error) {
    if (error.response && error.response.data.error) {
      toast.error(error.response.data.error) // Pesan error dari server
    } else {
      toast.error('Something went wrong, please try again.')
    }
  } finally {
    resetCredentials.email = ''
    resetCredentials.password = ''
  }
}
</script>

<template>
  <section class="bg-[#F6F6F9]">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto mb-4" :src="logo" alt="Vue Jobs" />
          <h2 class="text-3xl text-center font-semibold mb-10">Reset Password</h2>

          <!-- Email Input -->
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

          <!-- Password Input -->
          <div class="mb-4" v-if="resetCredentials.isEmailValid">
            <i class="fa-solid fa-lock me-2"></i>
            <label class="text-gray-700 font-bold mb-2">New Password</label>
            <input
              type="password"
              v-model="resetCredentials.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Enter new password"
              required
            />
          </div>

          <!-- Email Input -->
          <button
            v-if="!resetCredentials.isEmailValid"
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 w-full"
            type="button"
            @click="checkEmailExist"
          >
            Check Email
          </button>

          <!-- Password Input -->
          <button
            v-else
            class="bg-green-600 hover:bg-green-700 rounded-sm text-white font-bold py-4 px-4 w-full"
            type="submit"
          >
            ResetCredentials Password
          </button>

          <div class="flex justify-start items-center mt-5">
            <i class="fa fa-solid fa-arrow-left me-2 mt-[0.2rem]"></i>
            <RouterLink to="/login" class="text-gray-500 hover:text-gray-600"
              >Back to Login</RouterLink
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
