<script lang="ts">
import {Component, Emit, Inject, Vue} from 'vue-property-decorator'

import FormGenerate from '@/shared/ui/FormGenerate/FormGenerate.vue'
import api from '@/shared/api'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import pxToRem from '@/shared/lib/utils/other/pxToRem'
import {StaticContent} from "@/shared/api/types";

@Component({
    components: {
        'form-generate-component': FormGenerate,
    },
})
export default class FreeLessonOrder extends Vue {
    @Inject('$device') $device!: DeviceProviderValue

    @Emit('isSuccess')
    isSuccessEmit() {/**/}

    form: Required<Omit<FormGenerate['valueModel'], 'age' | 'email'>> = {
        name: '',
        phone: '',
    }

    loading = false

    async onSend() {
        this.loading = true

        try {
            const response = await api.sendOrderConsult(this.form)

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
                    direction: 'byDevice',
                    loading: this.loading,
                    view: 'secondary',
                    size: 'byDevice',
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
