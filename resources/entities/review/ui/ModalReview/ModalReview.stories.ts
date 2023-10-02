import {ModalReview, ModalReviewProps} from "./index";

export default {
    title: 'ModalReview',
    component: ModalReview,
    argTypes: {},
}

const Template = (args: ModalReviewProps) => ({
    props: Object.keys(args),
    components: {ModalReview},
    methods: {},
    template: '<ModalReview v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
