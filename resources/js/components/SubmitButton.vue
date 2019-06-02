<template>
    <button class="btn btn-primary" :disabled="loading">
        <template v-if="loading">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Pričekajte...
        </template>
        <slot v-else></slot>
    </button>
</template>
<script>
    export default {
        name: 'SubmitButton',
        props: ['loading']
    }
</script>
