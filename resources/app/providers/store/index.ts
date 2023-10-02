import Vue from 'vue'
import Vuex, { Store, StoreOptions } from 'vuex'
import { contentModel, ContentState } from '@/entities/content'
import {modalsModel} from "@/widgets/modals";

Vue.use(Vuex)

export type StateRoot = {
    content: ContentState
}

const store: StoreOptions<StateRoot> = {
    modules: {
        content: contentModel.contentModule,
        modals: modalsModel.modalsModule
    },
}

const createStore = (): Store<StateRoot> => new Vuex.Store<StateRoot>(store)

export default createStore
