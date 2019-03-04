<template>
<div>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-text-field
      v-model="key"
      label="Key"
      required
  />
  <v-layout
    justify-end
  >
    <v-btn
      :disabled="!valid"
      color="primary"
    >Search</v-btn>
  </v-layout>
</v-form>
<v-list
  two-line
>
  <template v-for="(item) in items">
    <v-list-tile
      :key="item.key"
    >
      <v-list-tile-content>
        <v-list-tile-title>{{item.key}}</v-list-tile-title>
        <v-list-tile-sub-title>{{ item.value }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </template>
</v-list>
</div>
</template>

<script>
export default {
  data: () => ({
      valid: true,
      key: null,
      items: [
        { key: 'key', value: 'value' }
      ]
  })
}
</script>
