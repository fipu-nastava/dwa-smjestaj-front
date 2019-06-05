<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div class="container">
                <router-link class="navbar-brand" :to="{name: 'booking.list'}">FipuBNB</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'units'}">Uredi smještaj</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        <div class="container">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    export default {
        name: "App",
        components: {}
    }
</script>

<style scoped>

</style>
