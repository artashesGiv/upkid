import { SuccessStoryCard, SuccessStoryCardProps } from './index'
import {provideFunc} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'entities/successStory/SuccessStoryCard',
    component: SuccessStoryCard,
    argTypes: {}
}

const Template = (args: SuccessStoryCardProps) => ({
    props: Object.keys(args),
    components: {SuccessStoryCard},
    methods: {},
    template: '<SuccessStoryCard v-bind="$props" />',
    ...provideFunc()
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    image: 'images/test/student.png',
    name: 'Айдар Гуралиев, студент КБГУ',
    title: 'Как поступить в лучший вуз страны',
    text: 'Наш выпускник, Иглик, сдал итоговый школьный экзамен по информатике на 138 баллов из 140! Он поступил в Казахско-Британский университет. Ученики школы Upkid изучают не только Python, но и основы технических предметов'
}

export const Long = Template.bind({})
// @ts-ignore
Default.args = {
    image: 'images/test/student.png',
    name: 'Айдар Гуралиев, студент КБГУ',
    title: 'Как поступить в лучший вуз страны',
    text: 'Наш выпускник, Иглик, сдал итоговый школьный экзамен по информатике на 138 баллов из 140! Он поступил в Казахско-Британский университет. Ученики школы Upkid изучают не только Python, но и основы технических предметов. Наш выпускник, Иглик, сдал итоговый школьный экзамен по информатике на 138 баллов из 140! Он поступил в Казахско-Британский университет. Ученики школы Upkid изучают не только Python, но и основы технических предметов'
}
