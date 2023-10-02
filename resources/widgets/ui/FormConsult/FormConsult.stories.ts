import {FormConsult, FormConsultProps} from '@/widgets/ui/FormConsult/index'

export default {
    title: 'entities/order/FormConsult',
    component: FormConsult,
    argTypes: {},
}

const Template = (args: FormConsultProps) => ({
    props: Object.keys(args),
    components: {FormConsult},
    methods: {},
    provide: {
        $device: {
            size: {
                maxMobile: false,
                maxMobileLate: true,
                maxTablet: false,
                tablet: false,
                tabletLate: false,
                desktop: false,
            },
        },
    },
    template: '<FormConsult v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
