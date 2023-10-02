<template lang="pug">
.b-card-teacher(
    :class="classes"
)
    .__photo
        picture-component.__image(
            :src="`/images/teachers/${id}`"
            :alt="name"
            fallbackExt="png"
        )
    .__information
        tag-component.__tag(
            icon="book-open"
        ) {{ experience }}
        h4.__name {{name}}
        p.__description {{description}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export type CardTeacherProps = {
    id: number
    name: string
    description: string
    experience: string
}

@Component
export default class CardTeacher extends Vue {
    @Prop() readonly id!: CardTeacherProps['id']
    @Prop() readonly name!: CardTeacherProps['name']
    @Prop() readonly description!: CardTeacherProps['description']
    @Prop() readonly experience!: CardTeacherProps['experience']

    get classes(): string[] {
        return [`card-teacher--pattern-${this.id % 2 === 0 ? 2 : 1}`]
    }
}
</script>
