import Vue from 'vue'
import VueRouter from 'vue-router'

import App from "./App";
import PricelistTable from "./components/PricelistTable";
import PricelistForm from "./components/PricelistForm";
import UnitForm from "./components/UnitForm";
import UnitTable from "./components/UnitTable";
import UnitDetails from "./components/UnitDetails";
import UnitDetailsHome from "./components/UnitDetailsHome";
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";

// window.$ = window.jQuery = require("jquery");
// import "bootstrap/dist/js/bootstrap"


// Inicijalizacija AXIOS paketa za komunikaciju sa REST servisom
window.axios = require('axios/index').create({
    baseURL: 'http://cantab.elaclo.com:5000/',
});

window._ = require('lodash');

// Date/time manupulation library
window.moment = require("moment");


// Uključivanje VueRouter u trenutnu Vuejs instancu
Vue.use(VueRouter);


import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
Vue.use(VCalendar);


//Debug mode kroz VueJS devtools chrome plugin (https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
Vue.config.productionTip = false;


// Vuejs filter direktive za uporabu u "html-u"
Vue.filter('datetime', (value) => {
    return moment(value).format("DD.MM.YYYY. HH:MM:SS");
});

Vue.filter('date', (value) => {
    return moment(value).format("DD.MM.YYYY.");
});

// Konfiguracija VUE Routera
const routes = [

    // Adminsitracijsko sučelje (sučelje za iznajmljivača)
    {
        path: '/units', component: UnitTable, name: 'units',
    },
    {
        path: '/units/:unit_id',
        component: UnitDetails,
        props: true, // Automatski mapira parametre rute u "props" vezane vuejs komponente (UnitDetails)
        children: [
            {path: '', component: UnitDetailsHome, props: true, name: 'units.details',},
            {path: 'edit', component: UnitForm, props: true, name: 'units.form',},
            {path: 'pricelist', component: PricelistTable, props: true, name: 'pricelist.table',},
            {path: 'pricelist/:pricelist_id', component: PricelistForm, props: true, name: 'pricelist.form',},
        ]
    },

    // Booking sučelje (sučelje za gosta)
    {
        path: '/', component: BookingList, name: 'booking.list',
    },
    {
        path: '/book-now/:unit_id', props:true, component: BookingForm, name: 'booking.book_now',
    }


];

// Inicijalizacija konfiguracije Vue Routera
const router = new VueRouter({
    routes
});


new Vue({
    router,
    render: h => h(App), // klasična funkcija za renderiranje vujes komponenti
}).$mount('#vue');
