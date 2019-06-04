<template>
    <Loading v-if="loading" :loading="loading"></Loading>
    <div v-else>
        <h1>
            <router-link class="" :to="{name: 'units.details', params: {unit_id}}">{{ unit.name }}</router-link>
        </h1>
        <p>{{ unit.description }}</p>
        <hr/>

        <!-- Za children rute -->
        <router-view></router-view>
    </div>
</template>

<script>
    import Loading from "./Loading";
    import SubmitButton from "./SubmitButton";

    export default {
        components: {SubmitButton, Loading},
        props: ['unit_id'],
        name: "UnitDetails",
        beforeRouteUpdate (to, from, next) {
            this.getData();
            next(); // obavezno moramo zvati next funkciju ako želimo da se promjena rute izvrši do kraja
        },
        mounted() {
            this.getData();
        },
        data() {
            return {
                loading: false,
                submitLoading: false,
                error: null,
                unit: {
                    photo: 'sadf.png',
                }
            }
        },
        methods: {
            getData() {
                if (this.unit_id === 'new') return;
                this.loading = true;
                axios.get("/unit/" + this.unit_id).then(({data}) => {
                    this.loading = false;
                    this.unit = data.data;
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

