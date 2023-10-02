import { Tabs, TabsProps } from './index'
import {selectControl} from "../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/ui/Tabs',
    component: Tabs,
    argTypes: {
        view: selectControl([
            'brand',
            'secondary-brand'
        ])
    }
}

const Template = (args: TabsProps) => ({
    props: Object.keys(args),
    data: () => ({
       value: 1
    }),
    components: {Tabs},
    methods: {},
    template: `<Tabs v-model="value" v-bind="$props" />`
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    view: 'brand',
    options: [
        {
            id: 1,
            text: 'first'
        },
        {
            id: 2,
            text: 'second'
        }
    ]
}
