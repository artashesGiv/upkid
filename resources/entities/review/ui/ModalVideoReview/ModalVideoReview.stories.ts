import {ModalVideoReview, ModalVideoReviewProps} from '@/entities/review/ui/ModalVideoReview'

export default {
    title: 'ModalVideoReview',
    component: ModalVideoReview,
    argTypes: {},
}

const Template = (args: ModalVideoReviewProps) => ({
    props: Object.keys(args),
    components: {ModalVideoReview},
    methods: {},
    template: '<ModalVideoReview v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
