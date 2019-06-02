import App from "./App";
import Vue from 'vue'
import VueRouter from 'vue-router'

import PricelistTable from "./components/PricelistTable";
import PricelistForm from "./components/PricelistForm";
import UnitForm from "./components/UnitForm";
import UnitTable from "./components/UnitTable";

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

Vue.filter('date', (value) => {
    return moment(value).format("DD.MM.YYYY.");
});

const routes = [
    {path: '/units', component: UnitTable, name: 'units',},
    {path: '/units/:id', component: UnitForm, props: true, name: 'units.form',},
    {path: '/units/:unit_id/pricelist', component: PricelistTable, props: true, name: 'pricelist.table',},
    {path: '/units/:unit_id/pricelist/:id', component: PricelistForm, props: true, name: 'pricelist.form',},
];


const router = new VueRouter({
    routes
});


new Vue({
    router,
    render: h => h(App),
}).$mount('#vue');
