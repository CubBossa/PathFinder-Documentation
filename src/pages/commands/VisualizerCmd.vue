<template>
  <h1>Path Visualizer Command</h1>

  <h2>Info</h2>
  <PermissionBadge permission="todo.todo.todo"></PermissionBadge>
  <CmdLine>
    /pf visualizer
    <CmdArg :index="0" type="vis"></CmdArg>
    info
  </CmdLine>

  <h2>List</h2>
  <PermissionBadge permission="todo.todo.todo"></PermissionBadge>
  <CmdLine>
    /pf listvisualizers
    <CmdArg :index="0" type="page" optional></CmdArg>
  </CmdLine>

  <h2>Create</h2>
  <PermissionBadge permission="todo.todo.todo"></PermissionBadge>
  <CmdLine>
    /pf createvisualizer
    <CmdArg :index="0" type="string" label="name"></CmdArg>
  </CmdLine>

  <h2>Delete</h2>
  <PermissionBadge permission="todo.todo.todo"></PermissionBadge>
  <CmdLine>
    /pf deletevisualizer
    <CmdArg :index="0" type="vis"></CmdArg>
  </CmdLine>

  <h2>Set Attribute</h2>
  <PermissionBadge permission="todo.todo.todo"></PermissionBadge>
  <CmdLine>
    /pf visualizer
    <CmdArg :index="0" type="vis"></CmdArg>
    set
    <CmdArg :index="1" type="string" label="attribute"></CmdArg>
    <CmdArg :index="2" type="string" label="values"></CmdArg>
  </CmdLine>
</template>
<script setup lang="ts">
import PermissionBadge from "components/PermissionBadge.vue";
import CmdLine from "components/CmdLine.vue";
import CmdArg from "components/CmdArg.vue";
</script>
