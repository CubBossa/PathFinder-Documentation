<template>
  <h1>Extension Points</h1>

  <p>
    Extension points offer the possibility to inject code into PathFinder from your plugin.
    Extension points work via Java Service API, meaning that PathFinder offers some interfaces to be implemented.
    You can implement these and register them in your META-INF within the build process. PathFinder finds all implementations
    in the current context and uses them as explained in the individual extension point.
  </p>
  <p>
    The advantage of this system is, that you can easily avoid to run into class loading issues.
    If you were working on a Quest plugin, implement according extension points and leave these classes
    untouched within your actual plugin. Only if PathFinder is installed, running and is about to execute
    code related to an extension point, it will load your plugins extension classes.
  </p>

  <h2>Google AutoService</h2>
  <p>
    Google provides a very useful API to annotate classes as Service.
  </p>
  https://github.com/google/auto/blob/main/service/README.md
  <p>
    Simply annotate your implementations of extension points with "@AutoService(__ExtensionPoint__.class)"
  </p>
</template>
