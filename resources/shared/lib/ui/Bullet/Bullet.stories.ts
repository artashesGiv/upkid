import {Bullet, BulletProps} from '@/shared/lib/ui/Bullet'
import {provideFunc, selectControl} from '../../../../../.storybook/libs/stories-utils'
import {IconName} from '../../../../../.storybook/libs/IconName'

export default {
    title: 'shared/lib/Bullet',
    component: Bullet,
    argTypes: {
        icon: selectControl(IconName)
    },
}

const Template = (args: BulletProps) => ({
    props: Object.keys(args),
    components: {Bullet},
    methods: {},
    provide: {
        $device: {
            size: {
                maxMobile: true,
                maxMobileLate: false,
                maxTablet: false,
                tablet: false,
                tabletLate: false,
                desktop: false
            },
        }
    },
    template: '<Bullet v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    icon: 'placeholder'
}