<template>
  <div class="flex min-h-screen flex-col bg-surface-muted text-slate-900">
    <LayoutAppHeader />
    <main class="flex-1 pb-16 md:pb-0">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <LayoutAppFooter />
    <LayoutMobileBottomNav />
  </div>
</template>
