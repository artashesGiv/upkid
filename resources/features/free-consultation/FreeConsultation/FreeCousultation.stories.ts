import {FreeConsultation, FreeConsultationProps} from '@/features/free-consultation/FreeConsultation'

export default {
    title: 'features/order/FreeConsultation',
    component: FreeConsultation,
    argTypes: {},
}

const Template = (args: FreeConsultationProps) => ({
    props: Object.keys(args),
    components: {FreeConsultation},
    methods: {},
    template: '<FreeConsultation v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
