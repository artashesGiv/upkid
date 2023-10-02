import { ModalDesktopContent, ModalDesktopContentProps } from './index'

export default {
    title: 'shared/ui/modals/ModalDesktopContent',
    component: ModalDesktopContent,
    argTypes: {},
}

const Template = (args: ModalDesktopContentProps) => ({
    props: Object.keys(args),
    components: { ModalDesktopContent },
    methods: {},
    template: '<ModalDesktopContent v-bind="$props">123123</ModalDesktopContent>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
