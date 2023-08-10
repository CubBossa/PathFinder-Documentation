<template>
  <h1>NodeGroups</h1>

  <p>
    NodeGroups are, simply put, pretty much what they claim to be. An object that groups multiple nodes.
    In terms of the PathFinder plugin, NodeGroups are the way to assign any logic to nodes.
    A group does not do anything on its own. It only consists of a NamespacedKey (see next chapter for a detailed
    explanation),
    a weight value and of course a set of nodes.
  </p>

  <h2>Properties</h2>

  <h3>The weight value</h3>
  <p>
    As already explained, groups will add logic to nodes. Since a node can have multiple groups that try
    to apply the same logic with different parameters, a group has a weight attribute to specify its priority when
    applying logic.
    <br>
    The higher the weight, the more preferred the group.
  </p>

  <h3>Modifiers</h3>
  <p>
    A group can have modifiers, which will be used to apply logic to nodes. Let me explain this with an example.
    There could be a modifier
    <CodeElement>SearchableModifier</CodeElement>
    , which allows all nodes of the group, to be searchable.
    <br>
    Of course, search terms must be applied for a node to be searchable, which makes search terms the attributes of the
    SearchableModifier.
  </p>

  <p>
    To explain this a bit further, let me demonstrate the structure of a group in text form:
  </p>

  <pre>
NodeGroup{
    key: "pathfinder:example",
    weight: 1,
    modifiers: {
        "pathfinder:searchable": SearchableModifier{
            searchterms: ["parking_lot","parking"]
        }
    }
}
  </pre>

  <h2>Namespaces and Namespaced Keys</h2>

  <p>
    NodeGroups are, like many other objects of the plugin, identified by a unique Namespaced Key. This is a format that
    minecraft
    uses in many places, like with materials:
    <CodeElement>minecraft:diamond</CodeElement>
    .
  </p>

  <p>
    NodeGroups usually have a key that starts with the namespace 'pathfinder' and finishes with a custom name, given by
    the
    creator, like
    <CodeElement>pathfinder:yard</CodeElement>
  </p>
  <p>
    To assure that addons for the pathfinder plugin don't conflict with your existing data, they have to register
    their own data with their own according namespace. So the namespace can be used to identify which addon created a
    group.
  </p>
  <p>
    So if you ever stumble across PathFinder data, that starts with a different namespace than
    <CodeElement>pathfinder:</CodeElement>
    , it most certainly
    comes from an addon for the plugin.
  </p>

  <InfoContainer type="warning">
    Choose the key of your groups carefully, it cannot be changed later on.
    <br>
    It will not be visible to players.
  </InfoContainer>

  <h2>Modifier Types</h2>

  <p>
    Keep in mind, the behaviour of a modifier is always applied to the nodes within the group that holds this modifier.
  </p>

  <h3>Findable Modifier</h3>

  <p>
    The Findable Modifier makes a group and all its content nodes findable via search terms.
    Specify a list of search terms and
    <CmdLine inline>/find</CmdLine>
    will list and interpret the search terms and
    your players can navigate to the closest node of nodes in this group
  </p>

  <p>
    When applying the modifier via command, separate each search term with a comma. Keep in mind, that spaces will be
    replaced with underscores automatically, because the
    <CmdLine inline>/find</CmdLine>
    command would otherwise get
    confused.
  </p>

  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"/>
    set search-terms
    <CmdArg :index="1" type="str" no-wrapper label="toilet,bathroom,loo"/>
  </CmdLine>

  <h3>Discoverable Modifier</h3>

  <p>
    The Discoverable Modifier makes a group discoverable, meaning that a player can walk in near distance to a node and
    a
    splash screen will tell him or her, that the according location has been discovered.
  </p>

  <q-img src="../images/discovering.png" width="70%" class="centered-img shadow-10 rounded-img q-mb-lg"/>

  <p>
    Admins can enforce or remove discoverings with
    <CmdLine inline>/pf forcefind</CmdLine>
    and
    <CmdLine inline>/pf forceforget</CmdLine>
    but otherwise, discoverings are permanent.
  </p>
  <InfoContainer type="tip">
    In your configuration file, you can enforce, that a discoverable node must be discovered first, to run /find on it.
    This behaviour will probably be a property of the Discoverable Modifier or a whole new modifier in future.
  </InfoContainer>
  <p>
    Use the following command to apply a discoverable modifier to a group. The name is in the MiniMessage format.
  </p>
  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"/>
    set discover-as
    <CmdArg :index="1" type="str" no-wrapper label="<rainbow>Rainbow Forest</rainbow>"/>
  </CmdLine>

  <h3>Find Distance Modifier</h3>

  <p>
    The Find Distance Modifier again does pretty much what the name says. It defines a distance in blocks, that a player
    must have to a node to either discover it or reach it if it is a target node of a path.
  </p>
  <p>
    Why use it?
    <br>
    You might have wide outdoor areas where you want the player to easily discover the group by using a view nodes.
    Make the find distance of these nodes high, like 30 blocks.
    <br>
    In tight corridors, you don't want to discover a location "through the wall", so you must assure that the find
    distance
    is small enough.
  </p>
  <p>Min value: 0.1</p>
  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"/>
    set find-distance
    <CmdArg :index="1" type="float" no-wrapper label="1"/>
  </CmdLine>

  <h3>Curve Length Modifier</h3>

  <p>No interest in lengthy explanations?
    <br>High value = rounder particles (e.g. 10-30)
    <br>Small value = straight particles (e.g. 0-1)
  </p>

  <p>
    The Curve Length Modifier influences the roundness of a particle path for each single node.
    <br>
    The maths behind it are quite complex but I will explain it in detail so that you don't have to guess what the
    number actually stands for.
  </p>

  <q-carousel
    v-model="slide"
    animated
    arrows
    navigation
    infinite
    padding
    class="centered-img q-mb-lg q-pa-none"
  >
    <q-carousel-slide :name="1" class="shadow-10 rounded-img">
      <q-img src="../images/bezier_01.png" class="full-height"/>
    </q-carousel-slide>
    <q-carousel-slide :name="2">
      <q-img src="../images/bezier_02.png" class="full-height"/>
    </q-carousel-slide>
    <q-carousel-slide :name="3">
      <q-img src="../images/bezier_03.png" class="full-height"/>
    </q-carousel-slide>
    <q-carousel-slide :name="4">
      <q-img src="../images/bezier_04.png" class="full-height"/>
    </q-carousel-slide>
    <q-carousel-slide :name="5">
      <q-img src="../images/bezier_05.png" class="full-height"/>
    </q-carousel-slide>
    <q-carousel-slide :name="6">
      <q-img src="../images/bezier_06.png" class="full-height"/>
    </q-carousel-slide>
    <q-carousel-slide :name="7">
      <q-img src="../images/bezier_07.png" class="full-height"/>
    </q-carousel-slide>
  </q-carousel>

  <p>
    So the number of steps is the following:
  <ol>
    <li>
      In the first stage, a vector is determined that has the exact same angle to the edges to both neighbours.
      This is done by normalizing both and adding them together.
    </li>
    <li>
      These directional vectors are being scaled by the curve length modifiers values for each node.
      This results in proper bezier tangents and one could proceed with step 4, but the path is not yet secured against
      loops from too high curve values.
    </li>
    <li>
      To prevent loops, the sum of two node's curve length is determined and compared to the distance between each other.
      If the distance is smaller, both tangents are being shortened to the according ratio.
      <br>
      If for example two neighbouring nodes have curve lengths of 3 and 7, but are only 10 blocks apart, the 3 will be shortened to
      <CodeElement>10 * 3/11</CodeElement> (the ratio), which is <CodeElement>2,73</CodeElement>. Same accounts for the 7.
    </li>
    <li>
      Now a bezier curve is being drawn between the two neighbouring nodes based on the tangents.
      Check out <a href="https://cubic-bezier.com">this page</a> if you want to get a proper feel for bezier curve behaviour.
    </li>
  </ol>
  </p>

  <p>
    Min value: 0
  </p>
  <CmdLine>
    /pf group
    <CmdArg :index="0" type="nodegroup"/>
    set curve-length
    <CmdArg :index="1" type="float" no-wrapper label="5"/>
  </CmdLine>

  <h3>Discover Progress Modifier</h3>
  <h3>Permission Modifier</h3>


</template>

<script setup lang="ts">
import InfoContainer from 'components/InfoContainer.vue';
import CodeElement from 'components/CodeElement.vue';
import CmdLine from 'components/CmdLine.vue';
import CmdArg from 'components/CmdArg.vue';
import {ref} from 'vue';

const slide = ref(1);

</script>

<style lang="sass">

.q-carousel__control
  color: var(--c-text)

.q-carousel--with-padding
  background-color: #00000000 !important

.q-carousel__navigation-icon
  font-size: 6px !important

</style>
