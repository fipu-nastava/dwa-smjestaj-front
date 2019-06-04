<template>
    <div>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading">
            <router-link class="btn btn-primary" :to="{name: 'units.form', params: {unit_id: 'new'}}">Dodaj</router-link>

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
                <tr v-for="item in units">
                    <td>
                        {{ item.name }}
                    </td>
                    <td>
                        {{ item.description }}
                    </td>
                    <td>
                        {{ item.max_persons }}
                    </td>
                    <td>
                        {{ item.created_at | datetime }}
                    </td>
                    <td>
                        {{ item.updated_at | datetime }}
                    </td>
                    <td>
                        <router-link class="btn btn-outline-primary" :to="{name: 'units.details', params: {unit_id: item.id}}">Detalji</router-link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Loading from "./Loading";

    export default {
        name: "UnitTable",
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
            }
        }
    }
</script>

<style scoped>

</style>
