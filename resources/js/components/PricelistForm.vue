<template>
    <Loading v-if="loading" :loading="loading"></Loading>
    <div v-else>
        <form @submit.prevent="submit">
            <h2>Detalji razdoblja</h2>
            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <label>Datum od</label>
                        <input type="date" v-model="pricelist.date_from" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Datum do</label>
                        <input type="date" v-model="pricelist.date_to" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Cijena</label>
                        <input type="number" v-model="pricelist.price" class="form-control">
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
        props: ['unit_id','id'],
        name: "PricelistForm",
        mounted() {
            this.getData();
        },
        data() {
            return {
                loading: false,
                submitLoading: false,
                error: null,
                pricelist: {}
            }
        },
        methods: {
            getData() {
                if (this.id === 'new') return;
                this.loading = true;
                axios.get("/unit/" + this.unit_id + "/unit-prices/" + this.id).then(({data}) => {
                    this.loading = false;
                    this.pricelist = data.data;
                });
            },
            submit() {
                //update

                this.submitLoading = true;
                this.error = null;
                if (this.id === 'new') {
                    this.pricelist.unit_id = this.unit_id;
                    axios.post("/unit/" + this.unit_id + "/unit-prices", this.pricelist)
                        .then((response) => {
                            this.$router.back();
                        })
                        .catch((error) => {
                            console.log(error);
                            this.error = error.response.data;
                        })
                        .finally(() => {
                            this.submitLoading = false;
                        })
                } else {
                    axios.put("/unit/" + this.unit_id + "/unit-prices/" + this.id, this.pricelist)
                        .then((response) => {
                            this.$router.back();
                        })
                        .catch((error) => {
                            console.log(error);
                            this.error = error.response.data;
                        })
                        .finally(() => {
                            this.submitLoading = false;
                        })
                }


            }
        }
    }
</script>

