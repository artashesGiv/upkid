import {ReviewCard, ReviewCardProps} from "./index";

export default {
    title: 'entities/review/ReviewCard',
    component: ReviewCard,
    argTypes: {},
}

const Template = (args: ReviewCardProps) => ({
    props: Object.keys(args),
    components: {ReviewCard},
    methods: {},
    template: '<ReviewCard v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    user: {
        name: 'Астахов Владислав',
        role: 'Parent'
    },
    rating: 2,
    review: 'Семья Илиеш относится к UpKid с большим уважением за доброе отношение и высокий профессионализм. Благодаря умениям и любви показать детям новые знания и достижения, которые нужны им! Семья Илиеш относится к UpKid с большим уважением за доброе отношение и высокий профессионализм. Благодаря умениям и любви показать детям новые знания и достижения, которые нужны им! Семья Илиеш относится к UpKid с большим уважением за доброе отношение и высокий профессионализм. Благодаря умениям и любви показать детям новые знания и достижения, которые нужны им! Семья Илиеш относится к UpKid с большим уважением за доброе отношение и высокий профессионализм. Благодаря умениям и любви показать детям новые знания и достижения, которые нужны им!',
    social: {
        href: '#',
        icon: 'vk',
        text: 'Вконтакте'
    }
}
