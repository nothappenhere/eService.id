<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="text-center flex flex-col justify-center items-center my-36">
    <i class="fas fa-exclamation-triangle text-[#be0027] fa-4x mb-4"></i>
    <h1 class="text-6xl font-bold mb-4">404 Not Found</h1>
    <p class="text-xl mb-5">This page does not exist</p>

    <div>
      <RouterLink
        class="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#ff9900] px-8 py-3 focus:outline-hidden"
        to="/"
      >
        <span class="absolute -start-full transition-all group-hover:start-4">
          <svg
            class="size-5 rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        <span class="text-sm font-medium transition-all group-hover:ms-4">Go Back</span>
      </RouterLink>
    </div>
  </section>
</template>
