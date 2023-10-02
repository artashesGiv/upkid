import {Modal, ModalProps} from "./index";

export default {
    title: 'shared/lib/Modal',
    component: Modal,
    argTypes: {},
}

const Template = (args: ModalProps) => ({
    props: Object.keys(args),
    components: {Modal},
    methods: {},
    template: '<Modal v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}