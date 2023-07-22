# Configuration

## Language

### Client Language

```yml
language:
  client-language: false
```

If this setting is set to true, a players preferred language will be his or her client language.
The language must exist in the `/lang/` directory by the according country code (en_US, de_DE, ...).
Otherwise, the fallback language will be used.

### Fallback Language

```yml
language:
  fallback-language: 'en_US'
```

The fallback language serves as default language for all users. If the client language setting
is enabled but no file for a client language is present the fallback language will be used instead.

The input value is a string that refers to the name of the language file in the `/pathfinder/lang/` directory.


## Data Storage

### Type

```yml
database:
  type: SQLITE
```

Describes the way data is supposed to be stored by the plugin.
The following values are possible:
- `IN_MEMORY` - No data will be stored persistently. As soon as the server stops or reloads, all data is gone and cannot be restored. This might be preferred for minigames.
- `YAML` - A flatfile based yaml database. Each roadmap/visualizer/playerdata will be stored as single .yml file.
- `SQLITE` - An embedded SQLite .db file. Data is stored in a file but accessible via SQL.
- `REMOTE_SQL` - A remote SQL database system like MySQL or MariaDB.

For further configuration for each type check out the subsections below.

### Embedded SQL Systems

```yml
database:
  embedded-sql:
    file: 'plugins\PathFinder\data\database.db'
```

Specify the file and directory for your embedded database file. You can use a shared file for multiple
servers and plugin instances, but keep in mind that the plugin currently only works with cached data.
Creating an object on one server will create a record in the database, but not on another server as long
as the other server hasn't been restarted.

### Remote SQL Systems

```yml
database:
  remote-sql:
    dialect: MYSQL
    jdbc-url: "jdbc:mysql://localhost/"
    username: root
    password: KeepItSecretKeepItSafe
```

#### Dialect
Specify a SQL dialect that fits your database. You may want this to match the SQL implementation
of your jdbc url.
Examples: `MYSQL`, `H2`, `POSTGRES`, `MARIADB`

#### JDBC-URL
Specify URL with configuration for your database.

#### Username & Password
Credentials. Specify these even if they're included in jdbc-url already.

## Navigation

### Require Discovery

```yml
navigation:
  require-discovery: false
```

Set this to true if the discovery of a group is mandatory for all nodes in this group to pass by in
path navigation. Meaning, if a path crosses a node of a group that has not been discovered and the
setting requires groups to be discovered first, no path will be available to the player.

### Find Location

```yml
navigation:
  find-location:
    max-distance: 20.0
```

Set the maximum distance to any near node when connecting the target location of `/findlocation <location>` to the graph.
Insert a negative value to disable any distance limitation.

### Nearest Location Solving

#### Algorithm

```yml
navigation:
  nearest-location-solver:
    algorithm: RAYCAST
```

Define an algorithm to find the nearest node to a certain location.
- **SIMPLE**: Finds the nearest node.
- **RAYCAST**: Sends multiple raycasts to find the nearest node that is not obstructed by walls.

#### Configuration for Simple Solver

```yml
navigation:
  nearest-location-solver:
    simple-config:
      connection-count: 1
```

The simple solver generates a node and connects it to a certain count of close nodes. Specify the amount of
connections with the `connection-count` property.
The simple solver can create impassible connections due to its simple approach. If you require an
algorithm that tries to avoid obstructed connections, check out ``RAYCAST``.

#### Configuration for Raycast Solver

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

### Require Group Permissions

```yml
navigation:
  require-all-group-permissions: true
```
This setting decides whether a player has to have all permissions of all groups of a node
or just one matching permission. True means all, so the permission query is linked by AND
operator. False means OR, so the player has to match only one permission node.

### Require Group Navigability

```yml
navigation:
  require-all-groups-navigable: true
```

This setting decides whether all groups of a node have to be navigable to make it navigable
or just one. True means that all groups have to be navigable.

### Require Group Discoverability

```yml
navigation:
  require-all-groups-discoverable: true
```

This setting decides whether all groups of a node have to be discoverable to make it discoverable
or just one. True means that all groups have to be discoverable.

### Distance Policy

```yml
navigation:
  distance-policy: LARGEST
```

These settings decide, which node group find distance applies to the node.
- **LARGEST**: the group with the largest find distance applies 
- **SMALLEST**: the group with the smallest find distance applies
- **NATURAL**: the first group applies. (later groups might be sortable with weights)

## Modules

```yml
module-config:
  discovery-module: true
  navigation-module: true
```

Activates the according module and all included commands, listeners and logic.
If a module is not required at all you may want to turn it off to improve performance.
For example, the discovery module has to check every little player movement and if the player moved
into reach of a discoverable group. By disabling the module, this extra step (which is called
hundreds of times a second) will be skipped.

## Version String

```yml
version: "3.0.0"
```

The version string specifies if the config file is up-to-date. Leave it as is so that the
plugin can recognize outdated configs and generate updated versions.
