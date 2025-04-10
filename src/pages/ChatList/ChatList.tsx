import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  generateChatResponse,
  getChatById,
  getChatsByUserId,
  createNewChat,
} from '../../services/ChatService';
import Spinner from '../../components/Spinner';
import { EnumFromMessage } from '../../utils/generalTypes';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import SendIcon from '../../components/SendIcon';

function ChatList() {
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMsgLoading, setIsMsgLoading] = useState(false);
  const [message, setMessage] = useState('');
  const scrollEnd = useRef(null);
  const messageContainer = useRef(null);
  const inputRef = useRef(null);
  const [conversation, setConversation] = useState([]);
  const [isChatListVisible, setIsChatListVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      navigate('/');
    } else {
      const getChats = async () => {
        const data = await getChatsByUserId(token);
        if (data.status === 401) {
          localStorage.clear();
          navigate('/');
        }
        setChats(data.chats);
        setIsLoading(false);
      };
      getChats();
    }
  }, []);

  const handleSendMessage = () => {
    if (chatId && message.trim() !== '') {
      const token = localStorage.getItem('tkn');
      if (!token) {
        navigate('/');
      } else {
        setIsMsgLoading(true);
        setConversation([
          ...conversation,
          { from: EnumFromMessage.USER, text: message },
        ]);
        setMessage('');

        const sendMessage = async () => {
          const response = await generateChatResponse(chatId, message, token);
          setConversation(response.updatedChat.conversation);
          setIsMsgLoading(false);

          setTimeout(() => {
            messageContainer.current.scrollTo({
              top: scrollEnd.current.offsetTop,
              left: 0,
              behavior: 'smooth',
            });
            inputRef.current?.focus();
          }, 400);
        };
        sendMessage();
      }
    }
  };

  const getChat = async (id, token) => {
    const response = await getChatById(id, token);
    setChatId(id);
    setConversation(response.chat.conversation);
    setIsLoading(false);
    setIsChatListVisible(false);
    setTimeout(() => {
      console.log('go to down...');
      if (scrollEnd && scrollEnd.current) {
        console.log(`scrollEnd exists...: ${scrollEnd.current.offsetTop}`);
        messageContainer.current.scrollTo({
          top: scrollEnd.current.offsetTop,
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 400);
  };

  const handleSelectChat = (id) => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      navigate('/');
    } else {
      setIsLoading(true);
      getChat(id, token);
    }
  };

  const handleCreateNewChat = () => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      navigate('/');
    } else {
      setIsLoading(true);
      const createChat = async () => {
        const data = await createNewChat(token);
        getChat(data.chat._id, token);
      };
      createChat();
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-[100vw] bg-[#2b2b2b]">
      <div className="w-full flex justify-center md:justify-start p-4  relative h-[10dvh]">
        <span className="text-3xl md:pl-24">Mordhio</span>
        <button
          className="absolute top-4 right-4 bg-blue-400 text-white p-3 rounded-full shadow-lg md:hidden"
          onClick={() => setIsChatListVisible(!isChatListVisible)}
        >
          {isChatListVisible ? '✖' : '☰'}
        </button>
      </div>

      {!isLoading ? (
        <div className="flex flex-row min-h-[90dvh]">
          <div
            className={`md:flex md:flex-col md:gap-2 h-[90dvh] bg-[#2b2b2b] transition-transform duration-300 ease-in-out 
            ${
              isChatListVisible
                ? 'flex flex-col gap-4 translate-x-0'
                : 'w-[0vw] invisible -translate-x-full'
            } md:visible md:translate-x-0 md:w-[20%] z-50 md:z-auto p-4 h-[90dvh]`}
          >
            <h1 className="p-2 text-white text-2xl text-center">Tus chats</h1>
            <span
              className="p-2 bg-slate-200 rounded-sm text-black cursor-pointer hover:bg-slate-100 text-xl"
              onClick={handleCreateNewChat}
            >
              +
            </span>
            {chats.map((chat) => (
              <span
                key={chat._id}
                className={`p-2 rounded-sm cursor-pointer text-sm text-left ${
                  chatId === chat._id ? 'bg-[#3f3f3f] ' : 'text-white'
                }`}
                onClick={() => handleSelectChat(chat._id)}
              >
                {chat.title}
              </span>
            ))}
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              isChatListVisible ? 'hidden' : 'w-full'
            } md:w-[9/10] ml-[-2em] md:ml-0 flex flex-col justify-center items-center`}
          >
            {chatId ? (
              <>
                <div
                  ref={messageContainer}
                  className="flex flex-col gap-6 h-[80vh] overflow-y-auto p-4 w-[100%] md:max-w-[900px] "
                >
                  {conversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.from === 'BOT' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`p-2 max-w-[90%] rounded-md text-md md:text-sm ${
                          msg.from === 'BOT'
                            ? ' text-white'
                            : 'bg-blue-400 text-black'
                        }`}
                      >
                        <MarkdownRenderer content={msg.text} />
                      </div>
                    </div>
                  ))}
                  <div ref={scrollEnd} className="h-2"></div>
                </div>
                <div className="flex flex-row gap-2 h-[10vh] bg-[#353535] w-[100%] md:max-w-[900px] md:rounded-xl">
                  {!isMsgLoading ? (
                    <>
                      <textarea
                        ref={inputRef}
                        className="resize-none w-full h-full p-4 text-sm md:rounded-l-xl"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && handleSendMessage()
                        }
                      />
                      <div
                        className="p-4 cursor-pointer flex place-items-center w-20"
                        onClick={handleSendMessage}
                      >
                        <SendIcon />
                      </div>
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </>
            ) : (
              <div className="h-[90vh] flex items-center justify-center">
                <span>No chat selected</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default ChatList;
