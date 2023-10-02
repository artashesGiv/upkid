import {CardTeacher, CardTeacherProps} from "./index";
import {numberControl, textControl} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/cards/CardTeacher',
    component: CardTeacher,
    argTypes: {
        id: numberControl(),
        imagePath: textControl(),
        name: textControl(),
        description: textControl(),
        experience: numberControl()
    },
}

const Template = (args: CardTeacherProps) => ({
    props: Object.keys(args),
    components: {CardTeacher},
    methods: {},
    template: '<CardTeacher v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    id: 1,
    imagePath: '/images/test/teach1.png',
    name: 'Test Test',
    description: 'Я рад делиться своими знаниями и помогать другим добиваться успеха в IT',
    experience: 5
}
