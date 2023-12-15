import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-tailwind/react";
import { toast } from 'react-hot-toast';
import api from '../../api/axiosConfig';
// import avatar from '../../Images/avatar.png';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const Chat = () => {
    const { profileId } = useParams();
    const id = parseInt(profileId, 10);
  const [recipient, setRecipient] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();
  const userData = useSelector((state) => state.user);
  console.log({profileId })

  const socketRef = useRef(null);

  const senderId = userData.user_id;
  const recipientId = recipient ? recipient.id : '';

  useEffect(() => {
    if (roomId) {
      // Establish a WebSocket connection
      socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${senderId}/${recipientId}/`);

      // Handle incoming WebSocket messages
      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      // Fetch existing messages for the chat
      api
        .get(`chat/api/rooms/${senderId}/${recipientId}/messages/list/`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId, senderId, recipientId]);

  const sendMessage = () => {
    if (!recipient) {
      toast.error('Please select a recipient to chat with.', { duration: 5000 });
      return;
    }

    const message = {
      content: newMessage,
      sender: senderId,
      recipient: recipientId,
    };

    api
      .post(`chat/api/rooms/${senderId}/${recipientId}/messages/send/`, message)
      .then((response) => {
        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }

    setNewMessage('');
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch user data for the sidebar (you can replace this with your own implementation)
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // Fetch user data
    api
      .get('chat/api/accounts-list/')
      .then((response) => {
        setRecipients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="flex h-screen rounded-md bg-gray-200">
   
      <div className="flex flex-col bg-gray-200 h-screen w-1/4 border-r-2 border-gray-300">
        <h2 className="text-xl font-bold p-4 bg-gray-700 text-white">Chat</h2>
        <ul className="flex-grow overflow-y-auto">
  {Array.isArray(recipients) && recipients.length > 0 ? (
    recipients
      .filter((user) => user.id === id  ) // Filter recipients based on userId
      .map((user) => (
        <li
          key={user.id}
          className={`flex items-center py-3 px-4 cursor-pointer ${
            recipient && recipient.id === user.id ? 'bg-gray-300' : 'hover:bg-gray-100'
          }`}
          onClick={() => {
            setRecipient(user);
            const roomId = `${senderId}${user.id}`;
            setRoomId(roomId);
          }}
        >
          <div className="flex-shrink-0 mr-3 mt-1">
            <Avatar
              // src={}
              alt="User Avatar"
              size="md"
              className="rounded-full w-12 h-12 object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-start ms-3 text-lg font-semibold">
              {user.first_name}-{user.id}
            </h3>
          </div>
        </li>
      ))
  ) : (
    <p>No recipients found.</p>
  )}
</ul>

      </div>

      
      <div className="flex-grow">
        <div className="flex flex-col h-screen">
          
          <div className="py-4 px-6 bg-gray-700 text-white">
            <h2 className="text-xl font-bold">
              {recipient ? `Chat with ${recipient.first_name}` : 'Select a recipient'}
            </h2>
          </div>
          
          <div className="flex-grow p-6 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex justify-${message.sender === senderId ? 'end' : 'start'} mb-4`}
                >
                  <div
                    className={`${
                      message.sender === senderId
                        ? 'bg-green-500 text-white self-end'
                        : 'bg-blue-500 text-white self-start'
                    } py-2 px-4 rounded-lg max-w-md`}
                  >
                    <div className="flex items-center">
                      {message.sender !== senderId ? (
                        <Avatar
                        //   src={avatar}
                          alt="avatar"
                          size="xs"
                          className="mr-3 rounded-full h-6 w-6"
                        />
                      ) : null}
                      <div className="mr-3">{message.content}</div>
                      {message.sender === senderId ? (
                        <Avatar
                        //   src={avatar}
                          alt="avatar"
                          size="xs"
                          className="ml-3 rounded-full h-6 w-6"
                        />
                      ) : null}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No messages yet</div>
            )}
            <div ref={scroll} />
          </div>
          {/* Chat input */}
          <div className="py-4 px-6 bg-gray-300">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border border-gray-400 rounded-lg px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;