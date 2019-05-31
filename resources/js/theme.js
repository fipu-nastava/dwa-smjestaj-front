import App from "./App";
import Vue from 'vue'
import VueRouter from 'vue-router'

import Units from "./components/Units";
import UnitsForm from "./components/UnitsForm";

// window.$ = window.jQuery = require("jquery");
// import "bootstrap/dist/js/bootstrap"


window.axios = require('axios/index').create({
    baseURL: 'http://cantab.elaclo.com:5000/',
});

window.moment = require("moment");

Vue.use(VueRouter);

Vue.config.productionTip = false;


Vue.filter('datetime', (value) => {
    return moment(value).format("DD.MM.YYYY. HH:MM:SS");
});

const routes = [
    {path: '/units', component: Units, name: 'units',},
    {path: '/units/:id', component: UnitsForm, props: true, name: 'units.form',},
];


const router = new VueRouter({
    routes
});


new Vue({
    router,
    render: h => h(App),
}).$mount('#vue');
