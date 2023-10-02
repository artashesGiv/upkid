import PictureLazy from './PictureLazy.vue'

export default {
    title: 'shared/lib/PictureLazy',
    component: PictureLazy,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {PictureLazy},
    methods: {},
    template: '<PictureLazy v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    path: 'images/utility/test',
    fallbackExt: 'png',
    alt: 'alt'
}
