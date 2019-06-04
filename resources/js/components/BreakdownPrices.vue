<template>
    <table class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>Date from</th>
            <th>Date to</th>
            <th>Jed. cijena</th>
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
                {{ price.price }}
            </td>
            <td class="text-right">
                {{ price.total }}
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td colspan="3" class="text-right">Ukupno za rezervaciju:</td>
            <td class="text-right">
                {{ calculatedPrice.total }}
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
        }
    }
</script>