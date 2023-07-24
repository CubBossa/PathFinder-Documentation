<template>
  <h1>Node Group Command</h1>

  <h2>Info</h2>
  <PermissionBadge :permission="perms.cmd_ng_info"></PermissionBadge>
  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    info
  </CmdLine>

  <p>Shows compact information to this specific NodeGroup.</p>

  <h2>List</h2>
  <PermissionBadge :permission="perms.cmd_ng_list"></PermissionBadge>
  <CmdLine>
    /pf listgroups
    <CmdArg :index="0" type="page" optional></CmdArg>
  </CmdLine>

  Lists all existing NodeGroups.

  <h2>Create</h2>
  <PermissionBadge :permission="perms.cmd_ng_create"></PermissionBadge>
  <CmdLine>
    /pf creategroup
    <CmdArg :index="0" type="string" label="name"></CmdArg>
  </CmdLine>

  Creates a new NodeGroup. Use a simple text as name and not a full NamespacedKey
  (`example`, not `pathfinder:example`). The namespace will be inserted automatically.
  Command always address the default namespace `pathfinder:`

  <h2>Delete</h2>
  <PermissionBadge :permission="perms.cmd_ng_delete"></PermissionBadge>
  <CmdLine>
    /pf deletegroup
    <CmdArg :index="0" type="nodegroup"></CmdArg>
  </CmdLine>

  Delete a NodeGroup.

  <h2>Set Modifier</h2>
  <PermissionBadge permission="todo.todo.todo"></PermissionBadge>
  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    set
    <CmdArg :index="1" type="mod"></CmdArg>
    <CmdArg :index="2" type="string" label="args" optional></CmdArg>
  </CmdLine>

  Sets a modifier for a certain group. Every modifier does have its own
  list of arguments that define the behaviour. To change these modifier
  attributes, simply use the command again with different values.

  <h3>Permission</h3>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    set permission
    <CmdArg :index="1" type="perm"></CmdArg>
  </CmdLine>

  <h3>Searchable</h3>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    set searchable
    <CmdArg :index="1" type="string" label="searchterms"></CmdArg>
  </CmdLine>

  <h3>Discoverable</h3>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    set discoverable
    <CmdArg :index="1" type="mm" label="displayname"></CmdArg>
  </CmdLine>

  <h3>Curve Length</h3>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    set curve-length
    <CmdArg :index="1" type="float"></CmdArg>
  </CmdLine>

  <h3>Find Distance</h3>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    set find-distance
    <CmdArg :index="1" type="float"></CmdArg>
  </CmdLine>

  <h3>Visualizer</h3>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    set visualizer
    <CmdArg :index="1" type="vis"></CmdArg>
  </CmdLine>


  <h2>Unset Modifier</h2>
  <PermissionBadge permission="todo.todo.todo"></PermissionBadge>
  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"></CmdArg>
    unset
    <CmdArg :index="1" type="mod"></CmdArg>
  </CmdLine>

  Remove a NodeGroup modifier.
</template>

<script setup lang="ts">
import CmdLine from "components/CmdLine.vue";
import PermissionBadge from "components/PermissionBadge.vue";
import CmdArg from "components/CmdArg.vue";
import perms from '../permission.json';

</script>
