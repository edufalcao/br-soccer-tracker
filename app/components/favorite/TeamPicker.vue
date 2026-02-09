<script setup lang="ts">
  const props = defineProps<{
    teams: Team[]
    favoriteIds: readonly number[]
  }>()

  const emit = defineEmits<{
    toggle: [externalId: number]
  }>()

  const { t } = useI18n()

  const search = ref('')

  const competitions: Competition[] = ['serie_a', 'serie_b', 'copa_do_brasil']

  const favoriteSet = computed(() => new Set(props.favoriteIds))

  const filteredGroups = computed(() => {
    const query = search.value.toLowerCase().trim()

    return competitions
      .map((comp) => {
        let teams = props.teams.filter((team) => team.competition === comp)

        if (query) {
          teams = teams.filter(
            (team) =>
              team.name.toLowerCase().includes(query) ||
              team.shortName.toLowerCase().includes(query) ||
              (team.nameEn && team.nameEn.toLowerCase().includes(query)),
          )
        }

        return { competition: comp, teams }
      })
      .filter((group) => group.teams.length > 0)
  })
</script>

<template>
  <div class="space-y-6">
    <!-- Search -->
    <div class="relative">
      <input
        v-model="search"
        type="text"
        :placeholder="t('favorites.search')"
        class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm outline-none transition-colors focus:border-pitch-500 focus:ring-2 focus:ring-pitch-500/20"
      />
      <svg
        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!-- Grouped teams -->
    <div v-for="group in filteredGroups" :key="group.competition" class="space-y-3">
      <h3 class="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {{ t(`competitions.${group.competition}`) }}
      </h3>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        <button
          v-for="team in group.teams"
          :key="team.externalId"
          class="flex items-center gap-2.5 rounded-lg border p-3 text-left transition-all"
          :class="
            favoriteSet.has(team.externalId)
              ? 'border-2 border-accent bg-accent/10'
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
          "
          @click="emit('toggle', team.externalId)"
        >
          <TeamBadge :team="team" size="sm" />
          <span class="truncate text-sm font-medium">{{ team.name }}</span>
          <FavoriteStarIcon v-if="favoriteSet.has(team.externalId)" size="xs" class="ml-auto" />
        </button>
      </div>
    </div>

    <!-- No results -->
    <p v-if="!filteredGroups.length && search" class="text-center text-sm text-slate-500">
      {{ t('common.noResults') }}
    </p>
  </div>
</template>
