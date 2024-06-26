import React from 'react'
import { TabPane, Tab } from 'semantic-ui-react'

const panes = [
  {
    menuItem: 'Tab 1',
    render: () => <TabPane attached={false}>Tab 1 Content</TabPane>,
  },
  {
    menuItem: 'Tab 2',
    render: () => <TabPane attached={false}>Tab 2 Content</TabPane>,
  },
  {
    menuItem: 'Tab 3',
    render: () => <TabPane attached={false}>Tab 3 Content</TabPane>,
  },
]

const Tab = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

export default Tab