<template>
  <NavbarView />

  <!--start main content -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
        <router-view v-slot="{ Component, route }">
          <transition name="route" mode="out-in">
            <div :key="route.name">
              <component :is="Component"></component>
            </div>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
  <!--end main content -->
</template>

<script setup>
import NavbarView from "@/components/Navbar.vue";

</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(10px)
}

.route-enter-active,
.route-leave-active {
  transition: all .2s ease-out
}

.route-leave-to {
  opacity: 0;
  transform: translateY(10px)
}
</style>
