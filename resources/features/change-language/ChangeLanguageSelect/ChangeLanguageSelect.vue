<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Select} from '@/shared/ui/Select'
import {Languages} from '@/entities/content'
// it's js file
// @ts-ignore
import { cookieParser } from '@/utils/cookieParser'

@Component
export default class ChangeLanguageSelect extends Vue {
    get value() {
        return this.$store.getters['content/active']
    }
    set value(lang: Languages) {
        this.$store.dispatch('content/changeActive', lang)

        const { obj, getCookieString } = cookieParser(document.cookie)

        document.cookie = getCookieString({...obj, lang})

        const { name, params, query } = this.$route

        this.$router.replace({
            name: name ?? 'not-found',
            query,
            params: {...params, lang}
        })
    }

    render(h) {
        return h(
            Select,
            {
                props: {
                    value: this.value,
                    size: 's'
                },
                on: {
                    input: (value: Languages) => { this.value = value }
                }
            }
        )
    }
}
</script>

<!-- <style lang="scss" src="./ChangeLanguageSelect.critical.scss" /> -->
<!-- <style lang="scss" src="./ChangeLanguageSelect.main.scss" /> -->
