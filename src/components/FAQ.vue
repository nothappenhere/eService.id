<template>
  <div class="bg-[#F6F0ED] space-y-4 mx-12 mb-6">
    <details
      class="group border-s-4 border-gray-200 bg-gray-50 p-4 [&_summary::-webkit-details-marker]:hidden"
      open
    >
      <summary class="flex items-center justify-between gap-1.5 text-gray-900">
        <h2 class="text-lg font-medium">What is the main purpose of this app?</h2>
        <svg
          class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <p class="pt-4 text-gray-900">
        This application is designed to digitize the public administration process to make it
        faster, more efficient, and transparent. We utilize cloud technology to support document
        storage, database management, and scalable system management.
      </p>
    </details>

    <details
      class="group border-s-4 border-gray-200 bg-gray-50 p-4 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex items-center justify-between gap-1.5 text-gray-900">
        <h2 class="text-lg font-medium">What technologies are used in this platform?</h2>
        <svg
          class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <p class="pt-4 text-gray-900">
        The platform is built with AWS Cloud infrastructure. We use Amazon RDS for database
        management, Amazon S3 for secure and scalable document storage, and EC2 for flexible
        application deployment.
      </p>
    </details>

    <details
      class="group border-s-4 border-gray-200 bg-gray-50 p-4 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex items-center justify-between gap-1.5 text-gray-900">
        <h2 class="text-lg font-medium">Is user data safe on this platform?</h2>
        <svg
          class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <p class="pt-4 text-gray-900">
        Yes. We implement password encryption, apply input validation, and set strict access
        controls. Our cloud infrastructure also follows industry security standards.
      </p>
    </details>

    <details
      class="group border-s-4 border-gray-200 bg-gray-50 p-4 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex items-center justify-between gap-1.5 text-gray-900">
        <h2 class="text-lg font-medium">Who can use these platforms?</h2>
        <svg
          class="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>

      <p class="pt-4 text-gray-900">
        This platform can be used by government agencies, public institutions, and the general
        public who need digital access to administrative services or online submission of letters.
      </p>
    </details>
  </div>
</template>
