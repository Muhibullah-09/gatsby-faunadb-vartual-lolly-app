import React from "react"
import Header, { props } from "../src/components/header"
import { Story, Meta } from "@storybook/react/types-6-0"

export default {
  component: Header,
  title: "Header",
} as Meta

const Template: Story<props> = args => <Header {...args} />

export const changeHeadings = Template.bind({})
changeHeadings.args = {
  mainHeadingText: "This is the main title",
  secondaryHeadingText: "This is the secondary heading...",
}
