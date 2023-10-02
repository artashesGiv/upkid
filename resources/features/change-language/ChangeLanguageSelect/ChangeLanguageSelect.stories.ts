import ChangeLanguageSelect from './ChangeLanguageSelect.vue'

export default {
    title: 'ChangeLanguageSelect',
    component: ChangeLanguageSelect,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {ChangeLanguageSelect},
    methods: {},
    template: '<ChangeLanguageSelect v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
