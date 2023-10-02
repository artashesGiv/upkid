import Spinner from "./Spinner.vue"
import {selectControl} from '../../../../../.storybook/libs/stories-utils'

export default {
    title: 'shared/lib/Spinner',
    component: Spinner,
    argTypes: {
        size: selectControl(['l','m', 's', 'xs']),
        view: selectControl(['brand' , 'secondary'])
    },
}

const Template: TemplateFn = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {Spinner},
    methods: {
    },
    template: '<Spinner v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    size: 'm',
    view: 'secondary'
}
