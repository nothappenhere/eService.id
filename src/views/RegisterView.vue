<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useToastOption } from '@/stores/toast.ts'
import router from '@/router'
import axios from 'axios'
import logo from '@/assets/img/logo.png'

const isActiveLink = (routePath: string) => {
  const route = useRoute()
  return route.path === routePath
}

const register = reactive({
  full_name: '',
  email: '',
  password: '',
  isSubmitting: false,
})

const route = useRoute()
const role = computed(() => route.params.role)
const validRoles = ['citizen', 'agency']
if (!validRoles.includes(role.value)) {
  router.replace('/404')
}

const handleSubmit = async () => {
  const toast = useToast()
  const toastOpt = useToastOption()

  if (!register.full_name || !register.email || !register.password) {
    return toast.error('All fields are required!', toastOpt.toastOptions)
  }
  if (register.password.length < 8) {
    return toast.error('Password must be at least 8 characters.', toastOpt.toastOptions)
  }

  const newRegister = {
    ...register,
    role: role.value,
  }

  console.log(newRegister.role)

  try {
    register.isSubmitting = !register.isSubmitting
    // await new Promise((resolve) => setTimeout(resolve, 3000))

    const response = await axios.post(
      `http://localhost:8000/api/auth/register/${role.value}`,
      newRegister,
    )
    const user = response.data

    if (user.user_id) {
      router.push('/login')
      toast.success(`Registration successful.`, toastOpt.toastOptions)
    }
  } catch (error) {
    toast.error('Something went wrong, please try again.', toastOpt.toastOptions)
  } finally {
    // Reset input
    register.full_name = ''
    register.email = ''
    register.password = ''
    register.isSubmitting = !register.isSubmitting
  }
}
</script>

<template>
  <!-- Citizen Registration -->
  <section class="bg-[#F6F6F9]" v-if="isActiveLink('/register/citizen')">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" :src="logo" alt="Vue Jobs" />
          <h2 class="text-3xl text-center font-bold mb-2">Create Your Citizen Account</h2>
          <p class="text-center text-gray-500 mb-8">
            Fill in your details to register as a citizen.
          </p>

          <div class="mb-2 hidden">
            <input type="text" :value="role" class="border w-full py-2 px-3 mb-4 mt-2" required />
          </div>

          <div class="mb-2">
            <i class="fa-solid fa-user me-2"></i>
            <label class="text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              v-model="register.full_name"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Enter Full Name"
              required
            />
          </div>

          <div class="mb-2">
            <i class="fa-solid fa-envelope me-2"></i>
            <label class="text-gray-700 font-bold mb-4">Email Address</label>
            <input
              type="email"
              v-model="register.email"
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
              v-model="register.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            :class="[
              !register.isSubmitting
                ? 'bg-[#ff9900] hover:bg-[#e27200] text-white font-bold py-4 px-4 w-full cursor-pointer'
                : 'bg-[#ffd246] text-white font-bold py-4 px-4 w-full',
            ]"
            type="submit"
          >
            Sign Up
          </button>

          <div class="flex flex-col justify-center items-center mt-5">
            <p class="text-gray-500 mt-2">
              Registering as an agency?
              <RouterLink to="/register/agency" class="text-[#e27200] hover:text-[#ff9900]">
                Register here
              </RouterLink>
            </p>
            <p class="text-gray-500 my-2">— or —</p>
            <p class="text-gray-500">
              Already have an account?
              <RouterLink to="/login" class="text-[#e27200] hover:text-[#ff9900]">
                Log In
              </RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- Agency Registration -->
  <section class="bg-[#F6F6F9]" v-if="isActiveLink('/register/agency')">
    <div class="container m-auto max-w-lg py-14">
      <div class="bg-white px-6 py-8 mb-4 rounded-xl m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <img class="h-20 w-auto m-auto" :src="logo" alt="Vue Jobs" />
          <h2 class="text-3xl text-center font-bold mb-2">Get Started as an Agency</h2>
          <p class="text-center text-gray-500 mb-8">Register your agency to access the platform.</p>

          <div class="mb-2 hidden">
            <input type="text" :value="role" class="border w-full py-2 px-3 mb-4 mt-2" required />
          </div>

          <div class="mb-2">
            <i class="fa-solid fa-user me-2"></i>
            <label class="text-gray-700 font-bold mb-2">Full Name</label>
            <input
              type="text"
              v-model="register.full_name"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Enter Full Name"
              required
            />
          </div>

          <div class="mb-2">
            <i class="fa-solid fa-envelope me-2"></i>
            <label class="text-gray-700 font-bold mb-4">Email Address</label>
            <input
              type="email"
              v-model="register.email"
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
              v-model="register.password"
              class="border w-full py-2 px-3 mb-4 mt-2"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            :class="[
              !register.isSubmitting
                ? 'bg-[#ff9900] hover:bg-[#e27200]  text-white font-bold py-4 px-4 w-full cursor-pointer'
                : 'bg-[#ffd246]  text-white font-bold py-4 px-4 w-full',
            ]"
            type="submit"
          >
            Sign Up
          </button>

          <div class="flex flex-col justify-center items-center mt-5">
            <p class="text-gray-500 mt-2">
              Registering as a citizen?
              <RouterLink to="/register/citizen" class="text-[#e27200] hover:text-[#ff9900]">
                Register here
              </RouterLink>
            </p>
            <p class="text-gray-500 my-2">— or —</p>
            <p class="text-gray-500">
              Already have an account?
              <RouterLink to="/login" class="text-[#e27200] hover:text-[#ff9900]">
                Log In
              </RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
