import React from 'react'
import EngagementMessagesOverTime from './EngagementMessagesOverTime'
import { messageCountList } from './MessageCountList'
import { channels } from './ChannelCountList'
const App = () => {
  return (
    <EngagementMessagesOverTime messageCountList={messageCountList} channels={channels}/>
  )
}

export default App
