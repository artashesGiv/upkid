import {FormLesson, FormLessonProps} from '@/widgets/ui/FormLesson/index'

export default {
    title: 'entities/order/FormLesson',
    component: FormLesson,
    argTypes: {},
}

const Template = (args: FormLessonProps) => ({
    props: Object.keys(args),
    components: {FormLesson},
    methods: {},
    provide: {
        $device: {
            size: {
                maxMobile: false,
                maxMobileLate: false,
                maxTablet: false,
                tablet: false,
                tabletLate: true,
                desktop: false,
            },
        },
    },
    template: '<FormLesson v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
