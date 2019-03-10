<template>
<layout :title="'Table: ' + category">
<v-container>

<v-data-table
    :headers="headers"
    :items="items"
>
<template v-slot:items="props">
    <tr @click="openDialog('update', props.item)">
        <td>{{ props.item.key }}</td>
        <td>{{ props.item.value }}</td>
    </tr>
</template>
</v-data-table>

</v-container>

<v-btn
    fixed
    dark
    fab
    bottom
    right
    color="red"
    @click="openDialog('insert')"
>
    <v-icon>add</v-icon>
</v-btn>

<!-- dialog -->
<v-dialog
    v-model="dialog"
    width="500"
>
<v-card>
<v-card-title
    class="headline grey lighten-2"
    primary-title
>{{ mode === 'insert' ? 'Add' : 'Update' }} record</v-card-title>
<v-card-text>
<v-container>
<v-layout>
<v-flex grow>
<v-text-field
    label="Key"
    v-model="key"
    required
    :readonly="mode !== 'insert'"
/>
<v-text-field
    label="Value"
    v-model="value"
    required
/>
</v-flex>
</v-layout>
</v-container>
</v-card-text>

<v-divider />

<v-card-actions>
    <v-spacer />
    <v-btn
        flat
        color="primary"
        @click="dialog = false"
    >Cancel</v-btn>
    <v-btn
        color="primary"
        @click="updateItem"
    >OK</v-btn>
</v-card-actions>
</v-card>
</v-dialog>

</layout>
</template>

<script>
import Layout from '~/components/layout';

async function searchItems(axios, category) {
    if (!category) {
        return [];
    }

    return await axios.$get('/api/kvs', {
        params: {
            category
        }
    });
}

export default {
    components: {
        Layout
    },
    async asyncData(context) {
        const category = context.params.category;
        const items = await searchItems(context.$axios, category);

        return {
            category,
            items
        }
    },
    data: () => ({
        valid: true,
        headers: [
            { value: 'key', text: 'Key' },
            { value: 'value', text: 'Value' }
        ],
        dialog: false,
        mode: null,
        key: null,
        value: null
    }),
    methods: {
        async searchItems() {
            this.items = await searchItems(this.$axios, this.category);
        },
        openDialog(mode, item) {
            this.mode = mode;
            this.key = item ? item.key : null;
            this.value = item ? item.value : null;
            this.dialog = true;
        },
        async updateItem() {
            await this.$axios.$post('/api/kvs', {
                category: this.category,
                mode: this.mode,
                key: this.key,
                value: this.value
            });
            this.dialog = false;
            this.mode = null;
            this.key = null;
            this.value = null;
            this.searchItems();
        }
    }
};
</script>