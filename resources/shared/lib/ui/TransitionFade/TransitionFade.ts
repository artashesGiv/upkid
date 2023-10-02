import {Functional} from "@/shared/lib/utils/other/functional-component";

export default Functional<{ list: unknown[] }>((h, {children}) =>
    h('transition', {
        props: {
            name: 'fade',
            mode: 'out-in',
        }
    }, children))
