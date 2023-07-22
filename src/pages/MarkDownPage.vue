<template>
  <q-page class="row justify-evenly" style="background-color: var(--c-bg)">
    <div class="q-pa-lg row items-start">
      <div class="q-px-xl q-py-md" style="min-width: 900px; max-width: 900px">
        <q-spinner v-if="markdown === undefined" color="primary" size="3em"/>
        <NodeGroup/>
        <q-markdown
          ref="md"
          v-if="markdown !== undefined"
          :src="markdown"
          class="col self-center"
          toc
          @data="onToc"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">

import {ref, Ref, watch} from 'vue';
import {useProjects} from 'stores/project-store';
import {useRoute} from 'vue-router';
import PermissionBadge from "components/PermissionBadge.vue";
import CmdLine from "components/CmdLine.vue";
import CmdArg from "components/CmdArg.vue";
import NodeGroup from "pages/commands/NodeGroup.vue";

const projects = useProjects()

const tree = ref(null)
const md = ref(null)
const route = useRoute()
const markdown: Ref = ref(undefined);
const toc = ref(undefined)
const tocFlat = ref(undefined)

function onToc(data: any) {
  tocFlat.value = data
}

function loadMarkdown() {
  const projectString: string = route.params.project.toString()
  const versionString: string = route.params.version.toString()
  const pageString: string = route.params.page.toString()

  projects.currentProject = projects.projects.find(value => value.key === projectString)
  if (projects.currentProject !== undefined) {
    projects.currentVersion = projects.currentProject.versions.find(value => value.version === versionString)
    if (projects.currentVersion !== undefined) {
      projects.currentPage = projects.currentVersion.pages.pages.flatMap(projects.convertToFlat).find(value => value.name === pageString)
    }
  }

  if (projects.currentPage?.markdown !== undefined) {
    import('../assets/markdown/' + projects.currentProject?.key + '/' + projects.currentVersion?.version + '/' + projects.currentPage?.markdown  + '.md').then(value => {
      markdown.value = value.default
    })
  }
  setTimeout(() => {
    toc.value = tocFlat.value === undefined || tocFlat.value.length === 0 ? [] : md.value?.makeTree(tocFlat.value)
    setTimeout(() => {
      tree.value?.expandAll()
    }, 10)
  }, 50)
}

loadMarkdown()
watch(() => route.path, () => loadMarkdown())

</script>

<style lang="sass">
// When navigating (scrolling) to an anchor and to avoid that the anchor gets
// hidden by the fixed page header we offset the scrolling by the header height.
.q-markdown [class^="q-markdown--heading-h"]
  scroll-margin-top: 70px
</style>
