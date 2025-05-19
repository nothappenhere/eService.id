<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    class="flex justify-center items-center bg-[#EDF7F6] h-screen overflow-y-scroll custom-scroll"
  >
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="bg-[#202B3C] p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-xl text-center">
            <h2 class="text-2xl font-bold text-white md:text-3xl mb-5">
              Digital Transformation of Public Services with Cloud Technology
            </h2>

            <p class="hidden text-white/90 sm:mt-4 sm:block">
              Our platform is built on AWS Cloud technology — utilizing Amazon RDS for secure
              database management, Amazon S3 for reliable document storage, and EC2 for scalable
              system deployment. Support fast, transparent and efficient public services through
              modern digitization.
            </p>

            <div class="mt-4 md:mt-8">
              <RouterLink
                class="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#ff9900] px-8 py-3 focus:outline-hidden"
                to="/login"
              >
                <span class="absolute -start-full transition-all group-hover:start-4">
                  <svg
                    class="size-5"
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

                <span class="text-sm font-medium transition-all group-hover:ms-4">
                  Get Started
                </span>
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
          <img alt="" src="/amazon-store.jpg" class="h-40 w-full object-cover sm:h-56 md:h-full" />
          <img alt="" src="/skill-builder.png" class="h-20 w-full object-cover sm:h-56 md:h-full" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
