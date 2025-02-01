import React, { createContext, useState, useMemo, useEffect } from "react";
import { decryptData } from "../../routes/encryption";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();
import { StreamChat } from "stream-chat";
import { initializePusher, subscribeToChannel, unsubscribeFromChannel } from "../utils/pusherService";
const UserContextProvider = ({ children }) => {



  const apiKey = "8ghmxrx2v98h";
  const client = StreamChat.getInstance(apiKey);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [streamToken, setStreamToken] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("currentUserId"));
  const [notifications, setNotifications] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_KEY;

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const encryptedUserData = localStorage.getItem("userData");

    if (storedToken && encryptedUserData) {
      try {
        const decryptedUserData = decryptData(encryptedUserData);

        if (userId) {

          setUserData(decryptedUserData);
          setIsLoggedIn(true);


        } else {
          console.error("User ID is missing in decrypted data.");
        }
      } catch (error) {
        console.error("Error decrypting user data:", error);
        logout();
      }
    }
  }, []);





useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
}, [notifications]); // 🔄 تشغيل عند أي تحديث لـ `notifications`


  //الاتصال في التشات ليصبح اليوزر اونلاين
  const connectToChat = async (userId, streamToken, userData) => {
    try {
      const userIdS = userId.toString(); // تحويل userId إلى سلسلة نصية

      await client.connectUser(
        {
          id: userIdS, // تأكد من تمرير userId كسلسلة
          name: `User_${userData.first_name}`, // اسم المستخدم
        },
        streamToken
      );

      console.log("User connected to Stream Chat successfully.");

      // مراقبة تغييرات Presence
      client.on('user.presence.changed', (event) => {
        console.log(
          `Presence changed for user ${event.user.id}:`,
          event.user.online ? 'Online' : 'Offline'
        );
      });

      // مراقبة حالة الاتصال
      client.on('connection.changed', (event) => {
        console.log('Connection status:', event.online ? 'Connected' : 'Disconnected');
      });

    } catch (error) {
      console.error("Error connecting user to Stream Chat:", error.message || error);
      toast.error("Failed to connect to the chat system. Please try again later.");
    }
  };


  // جلب Stream Token والاتصال بالدردشة
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const streamToken = await getStreamToken(userId.toString());
        setStreamToken(streamToken);

        // الاتصال بـ Stream Chat
        await connectToChat(userId, streamToken, userData);

        // استخدام معرف ثابت للقناة
        const channelId = `user-${userId}`;

        // التحقق مما إذا كانت القناة موجودة بالفعل
        const channels = await client.queryChannels({ id: channelId });

        let userChannel;
        if (channels.length > 0) {
          // القناة موجودة بالفعل
          userChannel = channels[0];
          console.log(`Channel ${channelId} already exists.`);
        } else {
          // إنشاء القناة إذا لم تكن موجودة
          userChannel = client.channel('messaging', channelId, {
            name: `Chat for User ${userId}`,
            members: [userId.toString()],
          });
          await userChannel.create();
          console.log(`Channel ${channelId} created.`);
        }

        // مشاهدة القناة
        await userChannel.watch({ presence: true });
        console.log(`Channel ${channelId} is being watched with presence enabled.`);
      } catch (error) {
        console.error("Error initializing chat connection:", error.message);
        toast.error("Failed to connect to the chat system. Please try again.");
      }
    };


    if (isLoggedIn && !client.user) {
      initializeChat();
    }
  }, [isLoggedIn, userId, userData, streamToken]);





  // إدارة Pusher للإشعارات
 useEffect(() => {
     
    if (!userId) {
        return;
    }

    // تهيئة Pusher مرة واحدة
    initializePusher();

    // قائمة القنوات
    const channels = [
        {
            name: `appointment.reminder.${userId}`,
            handler: (data) => {
                console.log('تم استلام إشعار تذكير من Pusher:', data);
                const newNotification = {
                    id: data.id,
                    message: data.message,
                    sender: data.sender,
                    source: 'pusher',
                    type: 'reminder',
                    read: false,
                };
                setNotifications((prev) => [...prev, newNotification]);
             },
        },
        {
            name: `appointment.rating.${userId}`,
            handler: (data) => {
                console.log('تم استلام إشعار تقييم من Pusher:', data);
                const newNotification = {
                    id: data.id,
                    message: data.message,
                    patient_id: data.patient_id,
                    doctor_name: data.doctor_name,
                    doctor_id: data.doctor_id,
                    source: 'pusher',
                    created_at: new Date().toISOString(),
                    read: false,
                    type: 'rating',
                };
                setNotifications((prev) => [...prev, newNotification]);
             },
        },
    ];

    // الاشتراك في القنوات
    channels.forEach(({ name, handler }) => {
        subscribeToChannel(name, handler);
    });

    // تنظيف الاشتراك عند إلغاء المكون
    return () => {
        channels.forEach(({ name }) => {
            unsubscribeFromChannel(name);
        });
    };
}, [isLoggedIn,userId]);




  const cleanupResources = () => {
    // فصل الاتصال بـ Stream Chat
    if (client) {
      client.disconnectUser()
        .then(() => console.log("User disconnected from Stream Chat."))
        .catch((error) => console.error("Error disconnecting from Stream Chat:", error));
    }

    // فصل الاشتراك في قنوات Pusher
    if (userId) {
      unsubscribeFromChannel(`appointment.reminder.${userId}`);
      unsubscribeFromChannel(`appointment.rating.${userId}`);
      console.log("Unsubscribed from Pusher channels.");
    }
  };




  // تسجيل الخروج وتنظيف البيانات
  const logout = () => {
    // إزالة بيانات المستخدم من localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("currentUserId"); // إزالة currentUserId من التخزين المحلي
    localStorage.removeItem("created_At");
    localStorage.removeItem("update_at");
    // إعادة تعيين الحالات
    setIsLoggedIn(false);
    setUserData(null);
    setStreamToken(null);
    setUserId(null);
    setNotifications([]);

    // تنظيف الموارد
    cleanupResources();

    // إعادة التوجيه إلى صفحة تسجيل الدخول
    window.location.href = "/login";
  };



  // جلب بيانات المستخدم عبر ID
  const getUser1 = async (id) => {
    if (!id) {
      console.error("ID is missing. Cannot fetch user data.");
      throw new Error("Missing ID");
    }

    try {
      console.log(`Fetching user data for ID: ${id}`);
      const response = await axios.get(
        `${apiUrl}/api/get-user/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "s",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        // إذا كانت المشكلة في الاستجابة (4xx أو 5xx)
        console.error(
          "Failed to fetch user data:",
          error.response.data || error.response.statusText
        );
        throw new Error(
          error.response.data?.error || "Failed to fetch user data"
        );
      } else if (error.request) {
        // إذا لم يكن هناك استجابة من الخادم
        console.error("No response from server:", error.request);
        throw new Error("No response from server");
      } else {
        // إذا كانت المشكلة أثناء إعداد الطلب
        console.error("Error setting up the request:", error.message);
        throw new Error("Error setting up the request");
      }
    }
  };



  // جلب Stream token للمستخدم
  const getStreamToken = async (userId) => {
    if (!userId) {
      console.error("userId is missing. Cannot fetch stream token.");
      throw new Error("Missing userId");
    }

    try {
      const response = await fetch(
        `${apiUrl}/api/generate-token`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "s",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({ doctor_id: userId }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch stream token:", errorText);
        throw new Error("Failed to fetch stream token");
      }

      const data = await response.json();
      console.log("Stream token fetched successfully:", data.token);
      return data.token;
    } catch (error) {
      console.error("Error fetching stream token:", error.message || error);
      throw error;
    }
  };







  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      loading,
      setLoading,
      userData,
      token,
      setUserData,
      setIsLoggedIn,
      logout,
      getUser1,
      getStreamToken,
      streamToken,
      userId,
      setUserId,
      connectToChat,
      notifications,
      setNotifications
    }),
    [isLoggedIn, userData, loading, token, streamToken, userId]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
