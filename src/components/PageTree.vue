<template>
  <q-list>
    <div v-for="e in entries" :key="e.page.route">
      <q-item
        dense :clickable="e.page.component != undefined"
        :class="{
          selectedleaf: pageStore.pagePath(pageStore.currentPage) == e.path,
          parent: e.page.children,
          incomplete: e.page.incomplete
        }"
        class="leaf"
        :style="'padding-left: ' + (10 + e.indent * 20) + 'px'"
        @click="$router?.push(pageStore.pagePath(e.page))"
      >
        {{ e.page.label }}
        <q-tooltip v-if="e.page.incomplete">Page is incomplete</q-tooltip>
      </q-item>
    </div>
  </q-list>
</template>

<script setup lang="ts">

import {Page} from "src/models";
import {Ref, ref} from "vue";
import {useProjects} from "stores/project-store";
import {useRouter} from "vue-router";

const pageStore = useProjects();

type Entry = {
  indent: number,
  path: string,
  page: Page
}

const props = defineProps<{
  pages: Page[]
}>()

const entries: Ref<Entry[]> = ref([]);
props.pages.forEach(p => flatMap(p, 0))

function flatMap(page: Page, indent: number) {
  const path = pageStore.pagePath(page);
  let entry = {indent, path, page}
  entries.value.push(entry)
  for (let p of page.children || []) {
    flatMap(p, indent + 1)
  }
}

</script>

<style lang="sass">

.leaf
  user-select: none
.selectedleaf
  color: $accent

.parent
  font-weight: bolder

.incomplete
  font-style: italic
  text-decoration: line-through

</style>
