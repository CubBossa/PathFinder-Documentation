<template>
  <pre class="language-yaml">
    <slot/>
  </pre>
</template>

<script setup lang="ts">

import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/';
import {onMounted} from 'vue';

type language = 'js' | 'java' | 'yml' | 'properties'

const props = defineProps<{
  language: language
}>()

onMounted(() => {
  Prism.highlightAll();
})


</script>
