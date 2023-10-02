import Banner from './Banner.vue'
import {textControl} from "../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/ui/Banner',
    component: Banner,
    argTypes: {
        title: textControl(),
        description: textControl(),
        buttonText: textControl(),
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Banner},
    methods: {},
    template: '<Banner v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    title: 'Развиваем мышление детей с помощью программирования',
    description: 'Международная онлайн-школа программирования для детей с 9 до 17 лет',
    buttonText: 'Попробовать бесплатно',
}
