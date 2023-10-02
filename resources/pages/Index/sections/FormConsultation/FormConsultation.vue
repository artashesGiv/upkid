<template lang="pug">
    section.b-form-consultation
        .__container.container
            form-consult-component
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import FormConsult from '@/widgets/ui/FormConsult/FormConsult.vue'

export type FormConsultationProps = {}

@Component({
    components: {
        'form-consult-component': FormConsult,
    },
})
export default class FormConsultation extends Vue {

}
</script>
