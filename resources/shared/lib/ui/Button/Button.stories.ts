import Button from "./Button.vue";
import {booleanControl, selectControl, textControl} from '../../../../../.storybook/libs/stories-utils'
import {IconName} from '../../../../../.storybook/libs/IconName'

export default {
    title: 'shared/lib/Button',
    component: Button,
    argTypes: {
        tag: selectControl(['a', 'button' , 'router-link']),
        size: selectControl(['l','m','s']),
        loading: booleanControl(),
        disabled: booleanControl(),
        view: selectControl(['brand', 'secondary-brand', 'secondary-outline', 'outline', 'flat']),
        icon: selectControl(IconName),
        iconLeft: booleanControl(),
        ariaLabel: textControl(),
    },
}

const Template: TemplateFn = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        Button
    },
    methods: {
    },
    template: '<Button v-bind="$props">Button</Button>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    tag: 'button',
    size: 'm',
    loading: false,
    disabled: false,
    view: 'brand',
    icon: 'arrow-down',
    iconLeft: false,
    ariaLabel: 'Кнопка',
}

const TemplateEmpty: TemplateFn = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        Button
    },
    methods: {
    },
    template: '<Button v-bind="$props"/>',
})

export const Empty = TemplateEmpty.bind({})
// @ts-ignore
Default.args = {
    tag: 'button',
    size: 'm',
    loading: false,
    disabled: false,
    view: 'brand',
    icon: 'arrow-down',
    iconLeft: false,
    ariaLabel: 'Кнопка',
}
