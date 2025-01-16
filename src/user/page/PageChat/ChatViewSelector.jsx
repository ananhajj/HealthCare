import React, { useState } from "react";
import { Chat, Channel, ChannelHeader, ChannelList, MessageInput, MessageList, Thread, Window } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const ChatViewSelector = ({ client, filters, onChannelSelect }) => {
  const [activeChannel, setActiveChannel] = useState(null);

  const handleChannelSelect = (channel) => {
    console.log("Channel selected with ID:", channel.id);
    setActiveChannel(channel); // تعيين القناة النشطة
    if (onChannelSelect) onChannelSelect(channel); // استدعاء الدالة الخارجية إذا كانت موجودة
  };

  return (
    <div className="chat-view-selector">
      <Chat client={client}>
        <ChannelList
  filters={filters}
  sort={{ last_message_at: -1 }}
  options={{ limit: 10 }}
  onSelect={(channel) => {
    console.log("Channel selected:", channel.id);
    setActiveChannel(channel);
  }}
/>
       {activeChannel ? (
  <Channel channel={activeChannel}>
    <Window>
      <ChannelHeader />
      <MessageList />
      <MessageInput />
    </Window>
    <Thread />
  </Channel>
) : (
  <div className="flex items-center justify-center h-full">
    <p>يرجى اختيار محادثة من القائمة.</p>
  </div>
)}
      </Chat>
    </div>
  );
};

export default ChatViewSelector;