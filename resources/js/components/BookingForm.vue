<template>
    <div>
        <div v-if="success">
            <div class="alert alert-success text-center">
                <p>Rezervacija je uspješno poslana!</p>
            </div>
        </div>

        <div v-if="!success">
            <Loading v-if="loading" :loading="loading"></Loading>
            <div v-if="!loading">
                <form @submit.prevent="submit">
                    <h2>Bookiranje smještajne jedinice</h2>
                    <div class="card">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Odaberi datum</label>
                                <v-date-picker
                                        is-expanded
                                        :columns="$screens({ default: 1, lg: 4 })"
                                        is-inline :disabled-dates="blockedDaysFormVcalendar" mode='range' @input="calcualtePrice"
                                        v-model='range'></v-date-picker>

                            </div>

                            <template v-if="range">

                                <div class="form-group" v-if="calculatedPrice">
                                    <label>Cijena rezervacije</label>

                                    <BreakdownPrices :calculated-price="calculatedPrice"/>

                                </div>
                                <div class="form-group">
                                    <label>Ime i prezime</label>
                                    <input type="text" v-model="reservation.customer_name" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>E-mail adresa</label>
                                    <input type="text" v-model="reservation.customer_email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Adresa</label>
                                    <input type="text" v-model="reservation.customer_address" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Država</label>
                                    <input type="text" v-model="reservation.customer_country" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Telefon</label>
                                    <input type="text" v-model="reservation.customer_phone" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>Broj osoba</label>
                                    <select class="form-control">
                                        <option :value="index" v-for="index in unit.max_persons">{{ index }}</option>
                                    </select>
                                </div>
                            </template>
                        </div>

                        <template v-if="range">
                            <div v-if="error" class="card-footer text-danger">
                                Greška! <br/>{{ error }}
                            </div>
                            <div class="card-footer">
                                <SubmitButton :loading="submitLoading" type="submit">Spremi promjene</SubmitButton>
                            </div>
                        </template>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Loading from "./Loading";
    import SubmitButton from "./SubmitButton";
    import BreakdownPrices from "./BreakdownPrices";

    export default {
        components: {BreakdownPrices, SubmitButton, Loading},
        props: ['unit_id'],
        name: "BookingForm",
        mounted() {
            this.getBlockedDays();
            this.getData();
        },
        data() {
            return {
                loading: false,
                submitLoading: false,
                error: null,
                range: null,
                unit: {
                    photo: 'sadf.png',
                },
                reservation: {},
                blockedDaysFormVcalendar: [],
                success: false,
                calculatedPrice: null
            }
        },
        computed: {
            rangeStart() {
                return moment(this.range.start).format("YYYY-MM-DD");
            },
            rangeEnd() {
                return moment(this.range.end).format("YYYY-MM-DD");
            }
        },
        methods: {
            getData() {
                this.loading = true;
                axios.get("/unit/" + this.unit_id).then(({data}) => {
                    this.loading = false;
                    this.unit = data.data;
                });
            },
            getBlockedDays() {
                axios.get("/unit/" + this.unit_id + "/get-blocked-days?date_from=2019-01-01&date_to=2020-01-01").then(({data}) => {
                    let blockedDaysFormVcalendar = [];
                    _.forEach(data.data, (date) => {
                        blockedDaysFormVcalendar.push(new Date(moment(date, "YYYY-MM-DD")));
                    });

                    this.blockedDaysFormVcalendar = blockedDaysFormVcalendar;
                })
            },
            calcualtePrice() {
                axios.get("/unit/" + this.unit_id + "/calculate-price", {
                    params: {
                        date_from: this.rangeStart,
                        date_to: this.rangeEnd
                    }
                }).then(({data}) => {
                    this.calculatedPrice = data.data;
                })
            },
            submit() {
                this.submitLoading = true;
                this.error = null;

                this.reservation.date_from = this.rangeStart;
                this.reservation.date_to = this.rangeEnd;

                axios.post("/unit/" + this.unit_id + "/reserve", this.reservation)
                    .then((response) => {
                        this.success = true;
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
</script>

