import {Avatar, AvatarProps} from "./index";
import {textControl} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'entities/user/Avatar',
    component: Avatar,
    argTypes: {
        imagePath: textControl(),
        username: textControl()
    },
}

const Template = (args: AvatarProps) => ({
    props: Object.keys(args),
    components: {Avatar},
    methods: {},
    template: '<Avatar v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    imagePath: '/images/test/test.jpg',
    username: 'Vlad'
}
