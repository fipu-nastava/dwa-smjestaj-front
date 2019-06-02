<template>
    <Loading v-if="loading" :loading="loading"></Loading>
    <div v-else>
        <router-link class="btn btn-primary" :to="{name: 'pricelist.form', params: {unit_id, id: 'new'}}">Dodaj</router-link>

        <table class="table table-bordered table-striped mt-4">
            <thead>
            <tr>
                <th>Datum od</th>
                <th>Datum do</th>
                <th>Cijena</th>
                <th>Datum izrade</th>
                <th>Zadnja izmjena</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pricelists">
                <td>
                    {{ item.date_from | date }}
                </td>
                <td>
                    {{ item.date_to | date }}
                </td>
                <td>
                    {{ item.price }}
                </td>
                <td>
                    {{ item.created_at | datetime }}
                </td>
                <td>
                    {{ item.updated_at | datetime }}
                </td>
                <td>
                    <router-link class="btn btn-outline-primary" :to="{name: 'pricelist.form', params: {unit_id, id: item.id}}">Uredi</router-link>
                    <button @click.prevent="deleteItem(item.id)" class="btn btn-outline-danger">Obriši</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Loading from "./Loading";

    export default {
        name: "PricelistTable",
        components: {Loading},
        props: ['unit_id'],
        mounted() {
            this.getData();
        },
        data() {
            return {
                pricelists: [],
                loading: false
            }
        },
        methods: {
            getData() {
                this.loading = true;
                axios.get("/unit/" + this.unit_id + "/unit-prices").then(({data}) => {
                    this.pricelists = data.data;
                    this.loading = false;
                });
            },
            deleteItem(id) {
                if (confirm("Jeste li sigurni da želite obrisati stavku?")) {
                    axios.delete("/unit/" + this.unit_id + "/unit-prices/" + id).then((response) => {
                        alert("Stavka je uspješno obrisana");
                        this.getData();
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
