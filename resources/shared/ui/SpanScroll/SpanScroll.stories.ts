import {Swiper, SwiperProps} from "@/shared/ui/SpanScroll";

export default {
    title: 'Swiper',
    component: Swiper,
    argTypes: {},
}

const Template = (args: SwiperProps) => ({
    props: Object.keys(args),
    components: {Swiper},
    methods: {},
    template: '<SpanScroll v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
