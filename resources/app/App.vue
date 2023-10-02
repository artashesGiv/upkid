<template lang="pug">

.b-app#app
    transition(
        name="fade-page"
        mode="out-in"
    )
        header-component(
            v-if="isInit"
            :view="headerView"
            :key="$route.params.lang"
        )
    transition(
        name="fade-page"
        :mode="routerViewTransitionMode"
    )
        router-view(
            :key="$route.params.lang"
        )
    transition(
        name="fade-page"
        mode="out-in"
    )
        footer-component.__footer(
            v-if="isInit"
            :key="$route.params.lang"
        )
    modals-component

</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import MetaTitle from '@/shared/lib/mixins/utility/title'
import { Header } from '@/widgets/ui/Header'
import { Footer } from '@/widgets/ui/Footer'
import { HeaderProps } from '@/widgets/ui/Header/Header.vue'

@Component({
    components: {
        'header-component': Header,
        'footer-component': Footer,
    },
})
export default class Root extends Mixins(MetaTitle) {
    isInit = false
    isRedirect = false

    get headerView(): HeaderProps['view'] {
        return this.$route.name === 'not-found' ? 'dark' : 'base'
    }

    get routerViewTransitionMode(): string {
        return this.isRedirect ? 'in-out' : 'out-in'
    }

    @Watch('$route', { immediate: true })
    onChangePage(newValue: Route, oldValue: Route) {
        this.isInit = newValue.name !== 'redirect'
        if (oldValue) {
            this.isRedirect = oldValue.name === 'redirect'
        } else {
            this.isRedirect = false
        }
    }
}
</script>

<!-- <style lang="scss"> -->
<!-- @import './styles/critical'; -->
<!-- @import './styles/main'; -->
<!-- </style> -->
