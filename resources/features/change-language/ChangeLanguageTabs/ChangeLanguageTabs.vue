<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Tabs, TabsProps} from "@/shared/ui/Tabs";
import {Languages} from "@/entities/content";
// it's js file
// @ts-ignore
import { cookieParser } from '@/utils/cookieParser'

@Component({
    components: {
        'tabs-component': Tabs
    }
})
export default class ChangeLanguageTabs extends Vue {
    active = this.$store.getters['content/active']

    get value() {
        return this.active
    }
    set value(lang: Languages) {
        this.active = lang

        this.$store.dispatch('content/changeActive', lang)

        const { obj, getCookieString } = cookieParser(document.cookie)

        document.cookie = getCookieString({...obj, lang,})

        const { name, params, query } = this.$route

        this.$router.replace({
            name: name ?? 'not-found',
            query,
            params: {...params, lang}
        })
    }

    get options(): TabsProps['options'] {
        return [
            {
                id: Languages.ENGLISH,
                text: "EN"
            },
            {
                id: Languages.ROMANIAN,
                text: "RO"
            }
        ]
    }

    get view() {
        return this.$route.name !== 'not-found' ? 'brand' : 'secondary-brand'
    }

    render(h) {
        return h(
            Tabs,
            {
                props: {
                    value: this.value,
                    options: this.options,
                    view: this.view
                },
                on: {
                    change: (value: Languages) => { this.value = value }
                }
            }
        )
    }
}
</script>
