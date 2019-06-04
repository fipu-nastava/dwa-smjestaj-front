<template>
    <div>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading">

            <div class="card-group">
                <div class="card"  v-for="item in units">
                    <img src="assets/bedroom.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.description }}</p>

                    </div>
                    <div class="card-footer">
                        <router-link class="btn btn-outline-primary" :to="{name: 'booking.book_now', params: {unit_id: item.id}}">Book now</router-link>
                    </div>
                </div>
            </div>

<!--            <table class="table table-bordered table-striped mt-4">-->
<!--                <thead>-->
<!--                <tr>-->
<!--                    <th>Jedinica</th>-->
<!--                    <th>Opis</th>-->
<!--                    <th>Broj osoba</th>-->
<!--                    <th>Datum izrade</th>-->
<!--                    <th>Zadnja izmjena</th>-->
<!--                    <th></th>-->
<!--                </tr>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                <tr v-for="item in units">-->
<!--                    <td>-->
<!--                        {{ item.name }}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {{ item.description }}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {{ item.max_persons }}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {{ item.created_at | datetime }}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        {{ item.updated_at | datetime }}-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        <router-link class="btn btn-outline-primary" :to="{name: 'units.details', params: {unit_id: item.id}}">Detalji</router-link>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--            </table>-->
        </div>
    </div>
</template>

<script>
    import Loading from "./Loading";

    export default {
        name: "BookingList",
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
