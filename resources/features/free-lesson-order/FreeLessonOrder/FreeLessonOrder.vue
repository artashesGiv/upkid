<script lang="ts">
import { Component, Emit, Inject, Prop, Vue } from 'vue-property-decorator'

import FormGenerate, { FormGenerateProps } from '@/shared/ui/FormGenerate/FormGenerate.vue'
import api from '@/shared/api'
import { DeviceProviderValue } from '@/shared/lib/providers/device'
import { StaticContent } from '@/shared/api/types'

export type FreeLessonOrderProps = {
    program?: string
}

@Component({
    components: {
        'form-generate-component': FormGenerate,
    },
})
export default class FreeLessonOrder extends Vue {
    @Prop() readonly program: FreeLessonOrderProps['program']

    @Inject('$device') $device!: DeviceProviderValue

    @Emit('isSuccess')
    isSuccessEmit() {
        /**/
    }

    loading = false

    form: Required<FormGenerate['valueModel']> = {
        name: '',
        email: '',
        phone: '',
    }

    async onSend() {
        this.loading = true

        try {
            let data
            if (this.program && this.program?.length !== 0) {
                data = {
                    program: this.program,
                    ...this.form,
                }
            } else {
                data = this.form
            }

            // console.log(data)

            const response = await api.sendOrderFreeLesson(data)

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
        return h(FormGenerate, {
            props: {
                value: this.form,
                direction: 'column',
                loading: this.loading,
                isPolicy: true,
                view: this.$device.size.maxMobile ? 'secondary' : 'base',
                buttonText: this.buttonText,
            } as FormGenerateProps,
            on: {
                input: value => {
                    this.form = value
                },
                click: this.onSend,
            },
        })
    }
}
</script>

<!-- <style lang="scss" src="./FreeLessonOrder.critical.scss" /> -->
<!-- <style lang="scss" src="./FreeLessonOrder.main.scss" /> -->
