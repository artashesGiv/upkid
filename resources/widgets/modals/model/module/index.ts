import { Module } from 'vuex'
import state, { StateModals } from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import {StateRoot} from "@/app/providers/store";

const modalsModule: Module<StateModals, StateRoot> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

export default modalsModule
