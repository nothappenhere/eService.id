<script setup>
const date = new Date()
const year = date.getFullYear()
</script>

<template>
  <footer class="bg-[#145C9E] shadow-xl">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-4">
      <span class="block text-md text-white text-center"
        >&copy; {{ year }}. Made with <span class="text-red-600">&hearts;</span> by
        <a
          href="https://www.linkedin.com/in/mhmmdrzkyakbr/"
          target="_blank"
          class="hover:underline text-gray-100"
          >Muhammad Rizky Akbar</a
        >.</span
      >
    </div>
  </footer>
</template>
