<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator'

import FormGenerate from '@/shared/ui/FormGenerate/FormGenerate.vue'
import api from '@/shared/api'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import pxToRem from '@/shared/lib/utils/other/pxToRem'
import {StaticContent} from "@/shared/api/types";

export type FreeIntroductoryLessonOrderProps = {
    program: string
}

@Component({
    components: {
        'form-generate-component': FormGenerate,
    },
})
export default class FreeIntroductoryLessonOrder extends Vue {
    @Prop() readonly program!: FreeIntroductoryLessonOrderProps['program']

    @Inject('$device') $device!: DeviceProviderValue

    @Emit('isSuccess')
    isSuccessEmit() {/**/}

    loading = false

    form: Required<Omit<FormGenerate['valueModel'], 'age' | 'email'>> = {
        name: '',
        phone: '',
    }

    async onSend() {
        this.loading = true

        try {
            const response = await api.sendOrderFreeLesson({
                program: this.program,
                ...this.form
            })

            if (response?.status) {
                this.isSuccessEmit()
            }
        } catch (e) {
            console.log(e)
        } finally {
            this.loading = false
        }
    }

    get buttonText(): StaticContent['forms']['buttons']['order'] {
        return this.$staticContent.forms.buttons.order
    }

    render(h) {
        return h(
            FormGenerate,
            {
                props: {
                    value: this.form,
                    direction: 'column',
                    loading: this.loading,
                    view: 'secondary',
                    buttonText: this.buttonText
                },
                on: {
                    input: value => { this.form = value },
                    click: this.onSend
                }
            }
        )
    }
}
</script>

<!-- <style lang="scss" src="./FreeLessonOrder.critical.scss" /> -->
<!-- <style lang="scss" src="./FreeLessonOrder.main.scss" /> -->
