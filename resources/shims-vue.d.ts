import Vue from 'vue'
import { Route } from 'vue-router'
import {LanguageContent, StaticContent} from '@/shared/api/types'
import {DeviceProviderValue} from "@/shared/lib/providers/device";
import {Dictionary, RouteMeta, RouteRecord} from "vue-router/types/router";

declare module '*.vue' {
    // @ts-ignore

    export default Vue
}

declare module 'vue/types/vue' {
    interface Vue {
        $content: LanguageContent
        $staticContent: StaticContent
        $device: DeviceProviderValue
        $scrollLock: {
            disablePageScroll: () => void
            enablePageScroll: () => void
            addFillGapTarget: (element: HTMLElement) => void
            setFillGapMethod: (method: 'margin' | 'padding') => void
        }
    }
}
