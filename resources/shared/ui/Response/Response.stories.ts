import {Response, ResponseProps} from '@/shared/ui/Response'
import {provideFunc, selectControl} from '../../../../.storybook/libs/stories-utils'

export default {
    title: 'shared/ui/Response',
    component: Response,
    argTypes: {
        view: selectControl(['surface', 'base']),
        direction: selectControl(['row', 'column'])
    },
}

const Template = (args: ResponseProps) => ({
    props: Object.keys(args),
    components: {Response},
    methods: {},
    ...provideFunc(),
    template: '<Response v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    view: 'base',
    direction: 'column'
}