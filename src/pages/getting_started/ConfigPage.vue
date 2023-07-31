<template>
  <h1>Configuration</h1>

  <h2>Language</h2>

  <h3>Client Language</h3>

  <prism language="java">
    language:
      client-language: false
  </prism>

    <p>
      If client language is set to true plugin messages will appear in the according client
      language. You need to add according language files if you want to use this feature.
    </p>

    <h3>Fallback Language</h3>

    ```yml
    language:
    fallback-language: 'en_US'
    ```

    The fallback language serves as default language for all users. If the client language setting
    is enabled but no file for a client language is present the fallback language will be used instead.

    The input value is a string that refers to the name of the language file in the<CodeElement>/pathfinder/lang/</CodeElement> directory.


    <h2>Data Storage</h2>

    <h3>Type</h3>

    ```yml
    database:
    type: SQLITE
    ```

    Describes the way data is supposed to be stored by the plugin.
    The following values are possible:
    -<CodeElement>IN_MEMORY</CodeElement> - No data will be stored persistently. As soon as the server stops or reloads, all data is gone and cannot be restored. This might be preferred for minigames.
    -<CodeElement>YAML</CodeElement> - A flatfile based yaml database. Each roadmap/visualizer/playerdata will be stored as single .yml file.
    -<CodeElement>SQLITE</CodeElement> - An embedded SQLite .db file. Data is stored in a file but accessible via SQL.
    -<CodeElement>REMOTE_SQL</CodeElement> - A remote SQL database system like MySQL or MariaDB.

    For further configuration for each type check out the subsections below.

    <h3>Embedded SQL Systems</h3>

    ```yml
    database:
    embedded-sql:
    file: 'plugins\PathFinder\data\database.db'
    ```

    Specify the file and directory for your embedded database file. You can use a shared file for multiple
    servers and plugin instances, but keep in mind that the plugin currently only works with cached data.
    Creating an object on one server will create a record in the database, but not on another server as long
    as the other server hasn't been restarted.

    <h3>Remote SQL Systems</h3>

    ```yml
    database:
    remote-sql:
    dialect: MYSQL
    jdbc-url: "jdbc:mysql://localhost/"
    username: root
    password: KeepItSecretKeepItSafe
    ```

    #<h3>Dialect</h3>
    Specify a SQL dialect that fits your database. You may want this to match the SQL implementation
    of your jdbc url.
    Examples:<CodeElement>MYSQL</CodeElement>,<CodeElement>H2</CodeElement>,<CodeElement>POSTGRES</CodeElement>,<CodeElement>MARIADB</CodeElement>

    #<h3>JDBC-URL</h3>
    Specify URL with configuration for your database.

    #<h3>Username & Password</h3>
    Credentials. Specify these even if they're included in jdbc-url already.

    <h2>Navigation</h2>

    <h3>Require Discovery</h3>

    ```yml
    navigation:
    require-discovery: false
    ```

    Set this to true if the discovery of a group is mandatory for all nodes in this group to pass by in
    path navigation. Meaning, if a path crosses a node of a group that has not been discovered and the
    setting requires groups to be discovered first, no path will be available to the player.

    <h3>Find Location</h3>

    ```yml
    navigation:
    find-location:
    max-distance: 20.0
    ```

    Set the maximum distance to any near node when connecting the target location of<CodeElement>/findlocation <location/></CodeElement> to the graph.
      Insert a negative value to disable any distance limitation.

      <h3>Nearest Location Solving</h3>

      <h4>Algorithm</h4>

  <code class="language-yaml">
    navigation:
      nearest-location-solver:
        algorithm: RAYCAST
  </code>

      Define an algorithm to find the nearest node to a certain location.
      - **SIMPLE**: Finds the nearest node.
      - **RAYCAST**: Sends multiple raycasts to find the nearest node that is not obstructed by walls.

      <h4>Configuration for Simple Solver</h4>

      ```yml
      navigation:
      nearest-location-solver:
      simple-config:
      connection-count: 1
      ```

      The simple solver generates a node and connects it to a certain count of close nodes. Specify the amount of
      connections with the<CodeElement>connection-count</CodeElement> property.
      The simple solver can create impassible connections due to its simple approach. If you require an
      algorithm that tries to avoid obstructed connections, check out ``RAYCAST``.

      #<h3>Configuration for Raycast Solver</h3>

      ```yml
      navigation:
      nearest-location-solver:
      raycast-config:
      raycast-count: 10
      start-location-direction-weight: 1.0
      scope-location-direction-weight: 0.0
      block-collision-weight: 10000.0
      ```

      Specify properties for the raycast solver.

      | <div style="width: 200px">Property</div> | Description
      |------------------------------------------| ------
      | raycast-count                            |  The algorithm finds the n nearest nodes and sends a raycast to each. Set the amount of nodes.
      | start-location-direction-weight          | If nodes in the players view direction should be preferred. A value of "1" means that a node counts as 1 block closer to the player if it is in its view direction.
      | scope-location-direction-weight          | If the node location direction should have an effect on its closeness to the player. Similar to start-direction-weight but for nodes instead of player.
      | block-collision-weight                   | Each block between the player/a node and another node will count as the given amount of distance in blocks. Default of 10.000 means that two blocks between a player and a node will count as a distance of 20.000 blocks. While another node that is further away from the player but not obstructed will have 0 extra weight and will therefore be prioritized.

      <h3>Require Group Permissions</h3>

      ```yml
      navigation:
      require-all-group-permissions: true
      ```
      This setting decides whether a player has to have all permissions of all groups of a node
      or just one matching permission. True means all, so the permission query is linked by AND
      operator. False means OR, so the player has to match only one permission node.

      <h3>Require Group Navigability</h3>

      ```yml
      navigation:
      require-all-groups-navigable: true
      ```

      This setting decides whether all groups of a node have to be navigable to make it navigable
      or just one. True means that all groups have to be navigable.

      <h3>Require Group Discoverability</h3>

      ```yml
      navigation:
      require-all-groups-discoverable: true
      ```

      This setting decides whether all groups of a node have to be discoverable to make it discoverable
      or just one. True means that all groups have to be discoverable.

      <h3>Distance Policy</h3>

      ```yml
      navigation:
      distance-policy: LARGEST
      ```

      These settings decide, which node group find distance applies to the node.
      - **LARGEST**: the group with the largest find distance applies
      - **SMALLEST**: the group with the smallest find distance applies
      - **NATURAL**: the first group applies. (later groups might be sortable with weights)

      <h2>Modules</h2>

      ```yml
      module-config:
      discovery-module: true
      navigation-module: true
      ```

      Activates the according module and all included commands, listeners and logic.
      If a module is not required at all you may want to turn it off to improve performance.
      For example, the discovery module has to check every little player movement and if the player moved
      into reach of a discoverable group. By disabling the module, this extra step (which is called
      hundreds of times a second) will be skipped.11

      <h2>Version String</h2>

      ```yml
      version: "3.0.0"
      ```

      The version string specifies if the config file is up-to-date. Leave it as is so that the
      plugin can recognize outdated configs and generate updated versions.

</template>

<script setup lang="ts">
import 'prismjs/themes/prism.css'
import PrismJs from 'components/PrismJS.vue';
</script>
