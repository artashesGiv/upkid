import {VideoReviewCard, VideoReviewCardProps} from "./index";
import {textControl} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'entities/review/VideoReviewCard',
    component: VideoReviewCard,
    argTypes: {
        name: textControl(),
        description: textControl()
    },
}

const Template = (args: VideoReviewCardProps) => ({
    props: Object.keys(args),
    components: {VideoReviewCard},
    methods: {},
    template: '<VideoReviewCard v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    time: '0:32',
    imagePath: '/images/test/test.jpg',
    name: 'Николай Иванов',
    description: 'Ученик 9-го класса. Выпускник школы Upkid'
}