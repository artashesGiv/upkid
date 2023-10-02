import Title from './Title.vue'
import {booleanControl, selectControl} from "../../../../../.storybook/libs/stories-utils";
import {IconName} from "../../../../../.storybook/libs/IconName";

export default {
    title: 'shared/lib/Title',
    component: Title,
    argTypes: {
        size: selectControl(['s', 'm', 'l']),
        tag: selectControl(['h1', 'h2', 'h3', 'h4', 'p', 'div']),
        view: selectControl(['base', 'surface']),
        highlightLeft: booleanControl(),
        highlightRight: booleanControl(),
        icon: selectControl(IconName),
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {
        Title
    },
    methods: {},
    template: '<Title v-bind="$props">Часто задаваемые вопросы</Title>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    size: 'm',
    tag: 'div',
    view: 'base',
    highlightLeft: false,
    highlightRight: false,
    icon: null,
}
