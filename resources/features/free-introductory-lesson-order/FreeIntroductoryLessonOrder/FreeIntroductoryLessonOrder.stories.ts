import {FreeIntroductoryLessonOrder, FreeIntroductoryLessonOrderProps} from "./index";

export default {
    title: 'FreeIntroductoryLessonOrder',
    component: FreeIntroductoryLessonOrder,
    argTypes: {},
}

const Template = (args: FreeIntroductoryLessonOrderProps) => ({
    props: Object.keys(args),
    components: {FreeIntroductoryLessonOrder},
    methods: {},
    template: '<FreeIntroductoryLessonOrder v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
