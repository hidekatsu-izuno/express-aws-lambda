<template>
<div>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-textarea
    v-model="command"
    label="Command"
    box
    auto-grow
  ></v-textarea>
</v-form>
<v-layout
    justify-end
>
    <v-btn
        :disabled="!valid"
        @click="execute"
        color="primary"
    >EXECUTE</v-btn>
</v-layout>
</div>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        command: null
    }),
    methods: {
        async execute() {
            try {
                const params = JSON.parse(this.command || '{}');
                await this.$axios.$post('/api/console', params);
            } catch (err) {
                alert(err.message);
            }
        }
    }
}
</script>