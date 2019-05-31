<template>
    <Loading v-if="loading" :loading="loading"></Loading>
    <div v-else>
        <form @submit.prevent="submit">
            <div class="form-group">
                <label>Naziv</label>
                <input type="text" v-model="unit.name" class="form-control">
            </div>
            <div class="form-group">
                <label>Opis</label>
                <input type="text" v-model="unit.description" class="form-control">
            </div>
            <div class="form-group">
                <label>Broj osoba</label>
                <input type="number" v-model="unit.max_persons" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import Loading from "./Loading";

    export default {
        components: {Loading},
        props: ['id'],
        name: "UnitsForm",
        mounted() {
            this.getData();
        },
        data() {
            return {
                loading: false,
                unit: {
                    photo: 'sadf.png',
                }
            }
        },
        methods: {
            getData() {
                if (this.id === 'new') return;
                this.loading = true;
                axios.get("/unit/" + this.id).then(({data}) => {
                    this.loading = false;
                    this.unit = data.data;
                });
            },
            submit() {
                //update

                if (this.id === 'new') {
                    axios.post("/unit", this.unit)
                        .then((response) => {
                            this.$router.back();
                        })
                        .catch((error) => {
                            alert("Greška");
                            console.log(error);
                        })
                } else {
                    axios.put("/unit/" + this.id, this.unit)
                        .then((response) => {
                            this.$router.back();
                        })
                        .catch((error) => {
                            alert("Greška");
                            console.log(error);
                        })
                }


            }
        }
    }
</script>

<style scoped>

</style>
