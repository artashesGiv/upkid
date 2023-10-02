import {YoutubeLazy, YoutubeLazyProps} from '@/shared/ui/YoutubeLazy'
import {textControl} from '../../../../.storybook/libs/stories-utils'

export default {
    title: 'YoutubeLazy',
    component: YoutubeLazy,
    argTypes: {
        src: textControl()
    },
}

const Template = (args: YoutubeLazyProps) => ({
    props: Object.keys(args),
    components: {YoutubeLazy},
    methods: {},
    template: '<YoutubeLazy v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}
