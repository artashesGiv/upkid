import '../resources/app/styles/critical.scss'
import '../resources/app/styles/main.scss'
import '../resources/app/styles/utility/animations.scss'
import createRouter from '../resources/app/providers/router'

import Vue from 'vue'
import clickOutside from '../resources/shared/lib/directives/click-outside'
import lazysizesDirective from '../resources/shared/lib/directives/lazysizes'
import 'lazysizes'
import 'lazysizes/plugins/blur-up/ls.blur-up'
import RouterLink from './RouterLink.vue'
import {provideFunc} from './libs/stories-utils'

import {TransitionFade} from '../resources/shared/lib/ui/TransitionFade'
import {ImageLazy} from '../resources/shared/lib/ui/ImageLazy'
import {Button} from '../resources/shared/lib/ui/Button'
import {IconBase} from '../resources/shared/lib/ui/IconBase'
import {Spinner} from '../resources/shared/lib/ui/Spinner'
import {Collapse} from '../resources/shared/ui/Collapse'
import {IconImage} from '../resources/shared/lib/ui/IconImage'
import {Title} from '../resources/shared/lib/ui/Title'
import {TransitionExpand} from '../resources/shared/lib/ui/TransitionExpand'
import {Tag} from "../resources/shared/ui/Tag";
import {Bullet} from '../resources/shared/lib/ui/Bullet'
import {PictureLazy} from '../resources/shared/lib/ui/PictureLazy'
import {Input} from '../resources/shared/ui/Input'

Vue.directive('click-outside', clickOutside)
Vue.directive('lazysizes', lazysizesDirective)

import VueYouTube from 'vue-youtube-embed/lib/vue-youtube-embed.umd'
import Cleave from "vue-cleave-component";
Vue.use(VueYouTube)

Vue.use(Cleave)
Vue.component('router-link', RouterLink)
Vue.component('input-component', Input)
Vue.component('transition-fade-component', TransitionFade)
Vue.component('transition-expand-component', TransitionExpand)
Vue.component('image-component', ImageLazy)
Vue.component('picture-component', PictureLazy)
Vue.component('button-component', Button)
Vue.component('spinner-component', Spinner)
Vue.component('title-component', Title)
Vue.component('bullet-component', Bullet)
Vue.component('icon-base-component', IconBase)
Vue.component('collapse-component', Collapse)
Vue.component('icon-image-component', IconImage)
Vue.component('tag-component', Tag)

export const decorators = [
    story => ({
        components: { story },
        router: createRouter(),
        ...provideFunc(),
        template: '<story />'
    })
]

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    },
    viewport: {
        viewports: {
            mobile: {
                name: 'Mobile 320px',
                type: 'mobile',
                styles: {
                    width: '320px',
                    height: '600px'
                }
            },
            tablet: {
                name: 'Tablet 650px',
                type: 'tablet',
                styles: {
                    width: '650px',
                    height: '600px'
                }
            },
            tabletLate: {
                name: 'Tablet Late 768px',
                type: 'tablet',
                styles: {
                    width: '768px',
                    height: '600px'
                }
            },
            desktop: {
                name: 'Desktop 1200px',
                type: 'desktop',
                styles: {
                    width: '1200px',
                    height: '600px'
                }
            }
        }
    }
}
