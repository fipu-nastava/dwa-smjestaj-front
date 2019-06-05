<template>
    <table class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>Date from</th>
            <th>Date to</th>
            <th>Jed. cijena</th>
            <th>Br. noćenja</th>
            <th>Ukupno</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="price in calculatedPrice.breakdown">
            <td>
                {{ price.date_from | date }}
            </td>
            <td>
                {{ price.date_to | date }}
            </td>
            <td class="text-right">
                {{ price.price | currency }}
            </td>
            <td class="text-right">
                {{ price.days }}
            </td>
            <td class="text-right">
                {{ price.total | currency }}
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="4" class="text-right">Ukupno za rezervaciju:</td>
            <td class="text-right">
                {{ calculatedPrice.total | currency }}
            </td>
        </tr>
        <tr>
            <td colspan="4" class="text-right">
                Cijena u
                <select v-model="selectedCurrency" v-if="rates">
                    <option :value="rate" v-for="(rate, valuta) in rates">{{ valuta }}</option>
                </select>

            </td>
            <td class="text-right">
                {{ priceInCurrency | currency }}
            </td>
        </tr>
        </tfoot>

    </table>
</template>
<script>
    export default {
        name: 'BreakdownPrices',
        props: {
            calculatedPrice: {}
        },
        mounted() {
            this.getEurPrice();
        },
        data() {
            return {
                rates: null,
                selectedCurrency: null
            }
        },
        computed: {
            priceInCurrency() {
                return this.selectedCurrency * this.calculatedPrice.total;
            }
        },
        methods: {
            getEurPrice() {
                axios.get('https://api.exchangeratesapi.io/latest?base=HRK').then(({data}) => {
                    this.rates = data.rates;
                    this.selectedCurrency = this.rates['EUR'];
                });
            }
        }
    }
</script>
