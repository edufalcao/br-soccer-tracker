<template>
  <div class="flex min-h-screen flex-col bg-surface text-slate-900">
    <LayoutAppHeader />
    <main class="flex-1">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <LayoutAppFooter />
  </div>
</template>
