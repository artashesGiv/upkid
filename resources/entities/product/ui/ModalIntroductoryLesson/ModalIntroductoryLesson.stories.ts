import {
    ModalIntroductoryLesson,
    ModalIntroductoryLessonProps
} from "./index";

export default {
    title: 'ModalIntroductoryLesson',
    component: ModalIntroductoryLesson,
    argTypes: {},
}

const Template = (args: ModalIntroductoryLessonProps) => ({
    props: Object.keys(args),
    components: {ModalIntroductoryLesson},
    methods: {},
    template: '<ModalIntroductoryLesson v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
