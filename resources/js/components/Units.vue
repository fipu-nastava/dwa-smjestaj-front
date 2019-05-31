<template>
    <Loading v-if="loading" :loading="loading"></Loading>
    <div v-else>
        <router-link class="btn btn-primary" :to="{name: 'units.form', params: {id: 'new'}}">Dodaj</router-link>

        <table class="table table-bordered table-striped mt-4">
            <thead>
            <tr>
                <th>Jedinica</th>
                <th>Opis</th>
                <th>Broj osoba</th>
                <th>Datum izrade</th>
                <th>Zadnja izmjena</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="unit in units">
                <td>
                    {{ unit.name }}
                </td>
                <td>
                    {{ unit.description }}
                </td>
                <td>
                    {{ unit.max_persons }}
                </td>
                <td>
                    {{ unit.created_at | datetime }}
                </td>
                <td>
                    {{ unit.updated_at | datetime }}
                </td>
                <td>
                    <router-link class="btn btn-outline-primary" :to="{name: 'units.form', params: {id: unit.id}}">Uredi</router-link>
                    <button @click.prevent="deleteItem(unit.id)" class="btn btn-outline-danger">Obriši</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Loading from "./Loading";

    export default {
        name: "Units",
        components: {Loading},
        mounted() {
            this.getData();
        },
        data() {
            return {
                units: [],
                loading: false
            }
        },
        methods: {
            getData() {
                this.loading = true;
                axios.get("/unit").then(({data}) => {
                    this.units = data.data;
                    this.loading = false;
                });
            },
            deleteItem(id) {
                if (confirm("Jeste li sigurni da želite obrisati stavku?")) {
                    axios.delete("/unit/" + id).then((response) => {
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
