import VideoReview from './VideoReview.vue'

export default {
    title: 'VideoReview',
    component: VideoReview,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {VideoReview},
    methods: {},
    template: '<VideoReview v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
