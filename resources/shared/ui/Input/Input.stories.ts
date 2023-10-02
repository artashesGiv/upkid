import Input from './Input.vue'
import {
    booleanControl,
    provideFunc,
    selectControl,
    textControl
} from "../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/ui/Input',
    component: Input,
    argTypes: {
        view: selectControl(['base', 'secondary']),
        size: selectControl(['m', 'l']),
        value: textControl(),
        placeholder: textControl(),
        isDisabled: booleanControl(),
        isError: booleanControl(),
        mask: selectControl([
            'phone',
            'none'
        ])
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    data: () => ({
        valueModel: '',
    }),
    components: {
        Input
    },
    methods: {},
    template: '<Input v-bind="$props" v-model="valueModel"/>',
    ...provideFunc()
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    view: 'base',
    size: 'l',
    value: '',
    placeholder: 'placeholder',
    isDisabled: false,
    isError: false,
    errorText: 'Поле должно быть корректно заполнено'
}
