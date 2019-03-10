<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list subheader>
        <template v-for="item in $store.state.menus">
          <template v-if="item.type === 'section'">
            <v-subheader
              :key="item.id"
            >{{ item.text }}</v-subheader>
            <v-list-tile v-for="item2 in item.children"
              :key="item2.id"
              :inactive="item2.id === $store.state.menuId"
              @click="menuClicked(item2)"
            >
              <v-list-tile-content>{{item2.text}}</v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile v-else
            :key="item.id"
            :inactive="item.id === $store.state.menuId"
            @click="menuClicked(item)"
          >
            <v-list-tile-content>{{item.text}}</v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
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
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <slot />
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: ['title'],
  data: () => ({
    drawer: null
  }),
  created() {
    this.$store.dispatch('loadMenus');
  },
  methods: {
    menuClicked(menu) {
      this.$store.dispatch('showPage', menu);
    }
  }
}
</script>

