import '../shared/lib/utils/other/object-assign.ts'
import '../shared/lib/utils/other/object-entries.ts'
import 'es6-promise/auto'
import 'lazysizes'
import 'lazysizes/plugins/blur-up/ls.blur-up'

import { Input } from '../shared/ui/Input'
import { providers } from '../shared/lib'
import getOs from '../shared/lib/utils/other/getOs'

import Vue from 'vue'
import App from './App.vue'
import Cleave from 'vue-cleave-component'
import createRouter from './providers/router'
import createStore from './providers/store'

import lazysizes from '../shared/lib/directives/lazysizes';
import clickOutside from '../shared/lib/directives/click-outside';
import move from '../shared/lib/directives/move';

Vue.directive('lazysizes', lazysizes)
Vue.directive('click-outside' ,clickOutside)
Vue.directive('move' , move)

import { Select } from '../shared/ui/Select'
import { TransitionFade } from '../shared/lib/ui/TransitionFade'
import { ImageLazy } from '../shared/lib/ui/ImageLazy'
import { Button } from '../shared/lib/ui/Button'
import { IconBase } from '../shared/lib/ui/IconBase'
import { Spinner } from '../shared/lib/ui/Spinner'
import { Collapse } from '../shared/ui/Collapse'
import { IconImage } from '../shared/lib/ui/IconImage'
import { Tag } from '../shared/ui/Tag'
import { Title } from '../shared/lib/ui/Title'
import { TransitionExpand } from '../shared/lib/ui/TransitionExpand'
import { PictureLazy } from '../shared/lib/ui/PictureLazy'
import { Bullet } from '../shared/lib/ui/Bullet'
import { Logo } from '../shared/ui/Logo'
import { Link } from '../shared/lib/ui/Link'
import { mapGetters } from 'vuex'
import { Socials } from '../shared/ui/Socials'
import { SectionLayout } from '../pages/Index/sections'

const VueYouTube = () => import(/* webpackChunkName: "chunks/utils/vue-youtube" */ 'vue-youtube-embed/lib/vue-youtube-embed.umd')
VueYouTube().then(response => {
    Vue.use(response.default)
})

const scrollLock = () => import(/* webpackChunkName: "chunks/utils/scroll-lock" */ 'scroll-lock')

scrollLock().then(response => {
    Vue['prototype'].$scrollLock = response.default
})

import VueAwesomeSwiper from 'vue-awesome-swiper'
import {
    Swiper, Navigation, Pagination, Lazy
} from 'swiper'
import {SectionSlider} from '../pages/Index/sections/SectionSlider'
// eslint-disable-next-line import/no-extraneous-dependencies

Swiper.use([Navigation, Pagination, Lazy])
Vue.use(VueAwesomeSwiper)
Vue['prototype'].$os = getOs()

Vue.use(Cleave)
Vue.component('input-component', Input)
Vue.component('select-component', Select)
Vue.component('transition-fade-component', TransitionFade)
Vue.component('transition-expand-component', TransitionExpand)
Vue.component('image-component', ImageLazy)
Vue.component('picture-component', PictureLazy)
Vue.component('picture-component', PictureLazy)
Vue.component('title-component', Title)
Vue.component('button-component', Button)
Vue.component('bullet-component', Bullet)
Vue.component('icon-base-component', IconBase)
Vue.component('spinner-component', Spinner)
Vue.component('collapse-component', Collapse)
Vue.component('tag-component', Tag)
Vue.component('icon-image-component', IconImage)
Vue.component('title-component', Title)
Vue.component('logo-component', Logo)
Vue.component('socials-component', Socials)
Vue.component('link-component', Link)
Vue.component('section-layout-component', SectionLayout)
Vue.component('section-slider-component', SectionSlider)

Vue.component(
    'modals-component',
    () =>
        import(
                /* webpackChunkName: "chunks/modals/modals" */
                '../widgets/modals/ui/Modals/Modals.vue'
            )
)

Vue.component(
    'modal-component',
    () =>
        import(
                /* webpackChunkName: "chunks/modals/modal" */
                '../shared/lib/ui/Modal/Modal.vue'
            )
)

Vue.component(
    'modal-free-lesson-component',
    () =>
        import(
                /* webpackChunkName: "chunks/modals/modal-free-lesson" */
                '../widgets/ui/ModalFreeLesson/ModalFreeLesson.vue'
            )
)

Vue.component(
    'modal-review-component',
    () =>
        import(
                /* webpackChunkName: "chunks/modals/modal-review" */
                '../entities/review/ui/ModalReview/ModalReview.vue'
            )
)

Vue.component(
    'modal-introductory-lesson-component',
    () =>
        import(
                /* webpackChunkName: "chunks/modals/modal-introductory-lesson" */
                '../entities/product/ui/ModalIntroductoryLesson/ModalIntroductoryLesson.vue'
            )
)

Vue.component(
    'modal-success-story-component',
    () =>
        import(
            /* webpackChunkName: "chunks/modals/modal-success-story" */
            '../entities/successStory/ui/ModalSuccessStory/ModalSuccessStory.vue'
            )
)

Vue.component(
    'modal-video-review-component',
    () =>
        import(
            /* webpackChunkName: "chunks/modals/modal-video-review" */
            '../entities/review/ui/ModalVideoReview/ModalVideoReview.vue'
            )
)

// TODO: Test this realizaiton store content
Vue.mixin({
    computed: {
        ...mapGetters({
            $content: 'content/values',
            $staticContent: 'content/staticValues',
        }),
    },
})


export default function createApp() {
    const router = createRouter()
    const store = createStore()
    const app = new Vue({
        name: 'App',
        router,
        store,
        mixins: [providers.DeviceProvider],
        render: h => h(App),
    })

    return { app, router, store }
}
