<template>
    <div>
        <router-link class="btn btn-outline-primary" :to="{name: 'pricelist.table', params: {unit_id}}">Uredi cjenik</router-link>
        <router-link class="btn btn-outline-primary" :to="{name: 'units.form', params: {unit_id}}">Uredi jedinicu</router-link>
        <button @click.prevent="deleteItem(unit_id)" class="btn btn-outline-danger">Obriši</button>
        <hr/>
    </div>
</template>

<script>
    import Loading from "./Loading";
    import SubmitButton from "./SubmitButton";

    export default {
        components: {SubmitButton, Loading},
        props: ['unit_id'],
        name: "UnitDetails",
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
                if (this.id === 'new') return;
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
                        this.$router.push({ name: 'units' })
                    })
                }
            }
        }
    }
</script>

