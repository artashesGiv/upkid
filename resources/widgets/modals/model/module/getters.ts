import {GetterTree} from "vuex";
import {modals, StateModals} from "@/widgets/modals/model/module/state";
import {StateRoot} from "@/app/providers/store";

const active = (state: StateModals) => state.active
export type ModalsActiveGetter = ReturnType<typeof active>

const payload =
    (state: StateModals) =>
    <T = unknown>(modalName: modals): T =>
        // @ts-ignore
        state.payload[modalName]
export type ModalsPayloadGetter = ReturnType<typeof payload>

const getters: GetterTree<StateModals, StateRoot> = {
    active,
    payload,
}

export default getters
