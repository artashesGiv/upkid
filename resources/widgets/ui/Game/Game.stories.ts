import Game from './Game.vue'

export default {
    title: 'Game',
    component: Game,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Game},
    methods: {},
    template: '<Game v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
