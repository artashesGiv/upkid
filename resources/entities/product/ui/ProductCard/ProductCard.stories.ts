import ProductCard from './ProductCard.vue'
import {selectControl, textControl} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'entities/product/ProductCard',
    component: ProductCard,
    argTypes: {
        title: textControl(),
        description: textControl(),
        buttonLeftText: textControl(),
        buttonRightText: textControl(),
        years: textControl(),
        classText: textControl(),
        type: selectControl([1,2,3])
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {ProductCard},
    methods: {},
    template: '<ProductCard v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    title: 'Введение в программирование',
    description: 'Цель курса: Изучение основ программирования и развитие мышления ребёнка',
    buttonLeftText: 'Записаться',
    buttonRightText: 'Программа курса',
    years: '9-11 лет',
    classText: '2-4 класс',
    type: 1
}
