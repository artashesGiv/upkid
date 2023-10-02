import {Rating, RatingProps} from "./index";
import {booleanControl, selectControl} from "../../../../../.storybook/libs/stories-utils";

export default {
  title: 'shared/lib/Rating',
  component: Rating,
  argTypes: {
      disabled: booleanControl()
  },
}

const Template = (args: RatingProps) => ({
  data:() => ({
      value: 4
  }),
  props: Object.keys(args),
  components: {Rating},
  methods: {},
  template: '<Rating v-bind="$props" v-model="value"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    disabled: false
}