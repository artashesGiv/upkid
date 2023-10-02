import { ModalMobileContent, ModalMobileContentProps } from './index'

export default {
    title: 'shared/ui/modals/ModalMobileContent',
    component: ModalMobileContent,
    argTypes: {},
}

const Template = (args: ModalMobileContentProps) => ({
    props: Object.keys(args),
    components: { ModalMobileContent },
    methods: {},
    template: '<ModalMobileContent v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
