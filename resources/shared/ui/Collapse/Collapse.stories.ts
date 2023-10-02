import {Collapse, CollapseProps} from '@/shared/ui/Collapse'
import {textControl} from '../../../../.storybook/libs/stories-utils'

export default {
    title: 'shared/ui/Collapse',
    component: Collapse,
    argTypes: {
        title: textControl()
    },
}

const Template = (args: CollapseProps) => ({
    props: Object.keys(args),
    components: {Collapse},
    methods: {},
    template: '<Collapse v-bind="$props">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consequatur cum eligendi harum magni, quisquam sint! Cum placeat quos repellendus temporibus voluptatum! Nemo porro possimus quo reprehenderit tempora. Alias cumque deleniti illo incidunt labore magni nobis quae reprehenderit ut voluptates. Amet consequuntur ducimus eveniet laudantium numquam odio praesentium rem repudiandae?</Collapse>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    title: 'Title'
}