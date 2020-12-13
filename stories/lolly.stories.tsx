import React from "react"
import Lolly, { props } from "../src/components/lolly"
import { Story, Meta } from "@storybook/react/types-6-0"

export default {
  component: Lolly,
  title: "lolly",
} as Meta

const Template: Story<props> = args => <Lolly {...args} />

export const Default = Template.bind({})

export const changeColor = Template.bind({})
changeColor.args = {
  lollyTop: "red",
  lollyMid: "green",
  lollyBot: "blue",
}
