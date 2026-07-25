<script setup>
import Navbar from '../components/Navbar.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
    <Navbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
