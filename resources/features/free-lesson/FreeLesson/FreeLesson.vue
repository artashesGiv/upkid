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

    get buttonText(): StaticContent['forms']['buttons']['order'] {
        return this.$staticContent.forms.buttons.order
    }

    @Emit('isSuccess')
    isSuccessEmit() {/**/}

    loading = false

    form: Required<Omit<FormGenerate['valueModel'], 'age'>> = {
        name: '',
        phone: '',
        email: '',
    }

    async onSend() {
        this.loading = true

        try {
            const response = await api.sendOrderFreeLesson(this.form)

            if (response?.status) {
                this.isSuccessEmit()
            }
        } catch (e) {
            console.log(e)
        } finally {
            this.loading = false
        }
    }

    render(h) {
        return h(
            FormGenerate,
            {
                props: {
                    value: this.form,
                    direction: 'column',
                    loading: this.loading,
                    buttonText: this.buttonText,
                    size: 'byDevice',
                },
                on: {
                    input: value => {
                        this.form = value
                    },
                    click: this.onSend,
                },
            },
        )
    }
}
</script>
