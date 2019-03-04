<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    </v-navigation-drawer>
    <v-toolbar
      color="blue"
      dark
      app
      fixed
    >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title>KVS Manager</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container
        fluid
      >
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>

