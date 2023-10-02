import {ActionContext, ActionTree} from "vuex";
import {ActionType} from "@/app/providers/store/types";
import {modals, StateModals} from "@/widgets/modals/model/module/state";
import {StateRoot} from "@/app/providers/store";
import {mutationsType} from "@/widgets/modals/model/module/mutations";

const setActive = async (
    { commit, dispatch }: ActionContext<StateModals, StateRoot>,
    data: {
        name: modals
        payload?: StateModals['payload'][modals]
        callbackOnClose?: StateModals['callbackOnClose'][modals]

    }
) => {
    commit(mutationsType.SET_ACTIVE, data)
}

export type ModalsSetActiveAction = ActionType<typeof setActive>

const removeActive = async (
    { commit }: ActionContext<StateModals, StateRoot>
) => {
    commit(mutationsType.REMOVE_ACTIVE)
}

export type ModalsRemoveActiveAction = ActionType<typeof removeActive>

const actions: ActionTree<StateModals, StateRoot> = {
    setActive,
    removeActive,
}

export default actions