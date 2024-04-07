<template>
  <h1>NodeType Extension Point</h1>

  <p>The NodeType extension point allows you to register additional node types.</p>
  <p>
    By default, PathFinder comes with just one node type: Waypoints. Waypoints contain
    the attributes id, x, y, z and world. Accordingly, they are static and their position is fix.
  </p>
  <p>
    There might occur scenarios where you want your nodes to be dynamically positioned or where you want
    to reflect your plugins data (like NPCs from Citizens) as nodes. Then, you might want to implement the
    [NodeType](https://github.com/CubBossa/PathFinder/blob/main/pathfinder-api/src/main/java/de/cubbossa/pathapi/node/NodeType.java) interface.
  </p>

  <code-element>
    public interface NodeType<N extends Node> extends Keyed, Named, NodeStorageImplementation<N> {

    NodeStorageImplementation<N> getStorage();
      }
  </code-element>
</template>

<script setup lang="ts">
import CodeElement from '../../../components/CodeElement.vue';
</script>
