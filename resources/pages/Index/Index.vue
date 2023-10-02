<template lang="pug">

main.app__main
    main-section
    benefits-section
    success-story-section
    programs-section
    advantages-section
    form-consultation-section
    //video-review-section
    review-students-section
    review-parents-section
    teachers-section
    questions-section
    form-section

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import {
    Main,
    Benefits,
    Programs,
    Advantages,
    ReviewStudents,
    ReviewParents,
    Teachers,
    Questions,
    Form,
    FormConsultation,
    SuccessStory,
} from './sections'

@Component({
    components: {
        'main-section': Main,
        'benefits-section': Benefits,
        'success-story-section': SuccessStory,
        'programs-section': Programs,
        'advantages-section': Advantages,
        'form-consultation-section': FormConsultation,
        'review-students-section': ReviewStudents,
        'review-parents-section': ReviewParents,
        'teachers-section': Teachers,
        'questions-section': Questions,
        'form-section': Form,
    },
})
export default class IndexPage extends Vue {
    get content() {
        return this.$store.getters['content/values']
    }
}
</script>
