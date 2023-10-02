import {MutationTree} from "vuex";
import {modals, StateModals} from "@/widgets/modals/model/module/state";

export enum mutationsType {
    SET_ACTIVE = 'SET_ACTIVE',
    REMOVE_ACTIVE = 'REMOVE_ACTIVE',
    SET_IS_ACTIVE_TELETYPE = 'SET_IS_ACTIVE_TELETYPE',
}

const mutations: MutationTree<StateModals> = {
    [mutationsType.SET_ACTIVE](
        state: StateModals,
        data: {
            name: modals
            payload?: StateModals['payload'][modals]
            callbackOnClose?: StateModals['callbackOnClose'][modals]
        }
    ) {
        if (state.active !== data.name) {
            state.active = data.name
            if (data.payload) {
                state.payload[data.name] = data.payload
            }

            if (data.callbackOnClose) {
                state.callbackOnClose[data.name] = data.callbackOnClose
            }
        }
    },

    [mutationsType.REMOVE_ACTIVE](
        state: StateModals,
    ) {
        state.active = null
    },
}

export default mutations