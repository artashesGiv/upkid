import {CardInfo, CardInfoProps} from '@/shared/ui/cards/CardInfo'
import {selectControl, textControl} from '../../../../../.storybook/libs/stories-utils'
import {IconName} from '../../../../../.storybook/libs/IconName'

export default {
    title: 'shared/cards/CardInfo',
    component: CardInfo,
    argTypes: {
        title: textControl(),
        icon: selectControl(IconName),
        image: selectControl(['', 'images/test/test.jpg']),
        direction: selectControl(['row', 'column'])
    },
}

const Template = (args: CardInfoProps) => ({
    props: Object.keys(args),
    components: {CardInfo},
    methods: {},
    template: '<CardInfo v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    icon: 'placeholder',
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur dolor dolore et labore non nulla repudiandae. Blanditiis commodi consequuntur dolorum excepturi exercitationem fugiat ipsam, laboriosam, maxime officia optio placeat praesentium quia quo quod veniam? Adipisci aliquid animi, est et, hic id illum, placeat porro quibusdam quo similique unde vitae?',
    image: '',
    direction: 'column'
}