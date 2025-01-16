import React, { useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import ChatViewSelector from "./ChatViewSelector";

const apiKey = "8ghmxrx2v98h";

const Page = () => {
  const navigate = useNavigate();
  const { userId, streamToken, getStreamToken } = useContext(UserContext);
  const [isClientReady, setIsClientReady] = useState(false);
  const client = StreamChat.getInstance(apiKey);
const userIdS=JSON.stringify(userId);
  const filters = { type: "messaging", members: { $in: [userIdS] } };

 useEffect(() => {
  async function setupClient() {
  

    try {
      const token = streamToken || (await getStreamToken(userIdS));
      await client.connectUser(
        {
          id: userIdS,
          name: `User_${userIdS}`,
        },
        token
      );
      setIsClientReady(true);
    } catch (error) {
      console.error("Error setting up chat client:", error.message || error);
     // navigate("/login");
    }
  }

  setupClient();

  return () => {
    client.disconnect();
  };
}, [userId, streamToken, getStreamToken, client, navigate]);

  if (!isClientReady) return <div>Setting up client & connection...</div>;

  return (
    <div>
      <h1>Chat Application</h1>
      <ChatViewSelector
        client={client}
        filters={filters}
        onChannelSelect={(channel) => console.log("Selected channel in parent:", channel.id)}
      />
    </div>
  );
};

export default Page;