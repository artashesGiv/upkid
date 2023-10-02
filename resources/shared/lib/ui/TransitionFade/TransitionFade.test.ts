import {shallowMount} from '@vue/test-utils'
import TransitionFade from './TransitionFade.vue'

describe('TransitionFade', () => {
    it('SnapshotDefault', () => {
        const wrapper = shallowMount(TransitionFade)
        expect(wrapper.html()).toMatchSnapshot()
    })
})
