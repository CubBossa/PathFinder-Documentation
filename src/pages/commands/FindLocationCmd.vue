<template>
  <h1>Find-Location Command</h1>
  Find a certain location within reach of your graph.
  Use <a href="/getting_started/configuration">the configuration</a> to define a maximum distance.

  <PermissionBadge permission="pathfinder.command.findlocation"></PermissionBadge>
  <CmdLine>
    /findlocation
    <CmdArg :index="0" type="location"></CmdArg>
  </CmdLine>
</template>

<script setup lang="ts">
import PermissionBadge from "components/PermissionBadge.vue";
import CmdLine from "components/CmdLine.vue";
import CmdArg from "components/CmdArg.vue";
</script>
