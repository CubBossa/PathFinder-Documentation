<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="header-1" style="background-color: var(--c-bg)">
      <q-toolbar inset style="height: 70px;">
        <q-toolbar-title>
          PathFinder
          <q-chip dense label='v4.0.0'/>
        </q-toolbar-title>
        <q-btn :icon="Dark.isActive ? 'light_mode' : 'dark_mode'" @click="Dark.toggle()" round flat :ripple="false">
          <q-tooltip>Toggle Dark Mode</q-tooltip>
        </q-btn>
        <q-btn :icon="ionLogoGithub" round flat :ripple="false" :href="GITHUB_LINK" target="_blank">
          <q-tooltip>Open on GitHub</q-tooltip>
        </q-btn>
        <q-btn icon="download" round flat :ripple="false" :href="DOWNLOAD_LINK" target="_blank">
          <q-tooltip>Download</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      :model-value="drawer"
    >
      <q-scroll-area style="height: calc(100vh - 70px)">
        <q-img src="../pages/images/banner.png" style="width: 100%">
        </q-img>
        <h3 class="text-center text-weight-bold">
          Navigation
        </h3>
        <q-item>
          <PageTree :pages="pages"/>
        </q-item>
      </q-scroll-area>
    </q-drawer>


    <q-page-container>
      <q-item class="header-2 cursor text-white row" style="z-index: 1000">
        <q-toolbar>
          <q-btn icon="menu" round flat @click="drawer = !drawer"/>
          <q-toolbar-title>
            {{ projects.currentPage?.label }}
          </q-toolbar-title>
        </q-toolbar>
      </q-item>
      <q-scroll-area style="height: calc(100vh - 136px)">
        <q-page class="row justify-evenly" style="background-color: var(--c-bg)">
          <div class="q-pa-lg row items-start">
            <div class="q-px-xl q-py-md" style="min-width: 900px; max-width: 900px">
              <component :is="projects.currentPage?.component()" :key="$route?.fullpath"/>
              <q-separator class="q-mt-xl"/>
              <div class="row">
                <q-item clickable dense @click="$router.push(projects.pagePath(projects.previous(projects.currentPage)) || '')">
                  <q-item-section side>
                    <q-icon name="chevron_left"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label header>
                      {{ projects.previous(projects.currentPage).label }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-space/>
                <q-item clickable @click="$router.push(projects.pagePath(projects.next(projects.currentPage)) || '')">
                  <q-item-section>
                    <q-item-label header>
                      {{ projects.next(projects.currentPage).label }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="chevron_right"/>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </div>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ionLogoGithub} from '@quasar/extras/ionicons-v6'
import {useProjects} from 'stores/project-store';
import {defineAsyncComponent, defineComponent, onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {Dark} from 'quasar';
import PageTree from "components/PageTree.vue";
import {DOWNLOAD_LINK, GITHUB_LINK, pages} from "pages/pages";
import IntroductionPage from "pages/getting_started/IntroductionPage.vue";
import Router from "src/router";

const router = useRouter()
const route = useRoute()
const projects = useProjects()
const drawer = ref(true)

Dark.set(true);

watch(() => route.path, (value, oldValue) => {
  projects.navigate(router, value)
})

onMounted(() => {
  projects.navigate(router, useRoute().path)
})

</script>



<style lang="sass">
p
  line-height: 170%

.header-1
  color: var(--c-text)

.header-2
  width: 100%
  background-color: var(--c-brand)

</style>
