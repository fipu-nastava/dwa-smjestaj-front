<template>
    <Loading v-if="loading" :loading="loading"></Loading>
    <div v-else>
        <form @submit.prevent="submit">
            <h2>Detalji smještajne jedinice</h2>
            <div class="card">
                <div class="card-body">
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
                </div>
                <div v-if="error" class="card-footer text-danger">
                    Greška! <br/>{{ error }}
                </div>
                <div class="card-footer">
                    <SubmitButton :loading="submitLoading" type="submit">Spremi promjene</SubmitButton>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import Loading from "./Loading";
    import SubmitButton from "./SubmitButton";

    export default {
        components: {SubmitButton, Loading},
        props: ['unit_id'],
        name: "UnitForm",
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
            submit() {
                //update

                this.submitLoading = true;
                this.error = null;
                if (this.unit_id === 'new') {
                    axios.post("/unit", this.unit)
                        .then((response) => {
                            this.$router.back(); //vraćanje na ekran s popisom svih unesenih smještajnih jedinica
                        })
                        .catch((error) => {
                            console.log(error);
                            this.error = error.response.data;
                        })
                        .finally(() => {
                            this.submitLoading = false;
                        })
                } else {
                    axios.put("/unit/" + this.unit_id, this.unit)
                        .then((response) => {
                            this.$router.back(); //vraćanje na ekran s popisom svih unesenih smještajnih jedinica
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error && error.response) {
                                this.error = error.response.data;
                            }
                        })
                        .finally(() => {
                            this.submitLoading = false;
                        })
                }


            }
        }
    }
</script>

