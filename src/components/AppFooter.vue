<template>
  <footer class="bg-slate-900 border-t border-slate-800 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-sm text-slate-500">
      <span>&copy; {{ new Date().getFullYear() }} Peminjaman Mobil</span>
      <router-link to="/about" class="hover:text-slate-300 transition-colors">Tentang</router-link>
    </div>
  </footer>
</template>
