<template>
<div>
<b-navbar toggleable="lg" type="dark" variant="primary">
  <b-container fluid>
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand href="#" class="mx-auto">KVM Manager</b-navbar-brand>
  </b-container>
</b-navbar>
<b-container>
  <div class="row">
    <div class="col-12">
      <b-form>
        <b-form-group label="Key">
          <b-form-input />
        </b-form-group>
        <b-form-group>
          <b-button type="submit" variant="primary" class="float-right">Search</b-button>
        </b-form-group>
      </b-form>
      <b-table striped :items="items" />
    </div>
  </div>
</b-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { key: 'sample', value: 'Sample' }
      ]
    }
  }
}
</script>

<style>
</style>
