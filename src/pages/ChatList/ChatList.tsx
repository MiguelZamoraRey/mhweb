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
  const [isNavigatorDisplayed, setIsNavigatorDisplayed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      navigate('/');
    } else {
      const getChats = async () => {
        const data = await getChatsByUserId(token);
        if (data.status == 401) {
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
    if (chatId && message && message != '') {
      const token = localStorage.getItem('tkn');
      if (!token) {
        navigate('/');
      } else {
        setIsMsgLoading(true);
        const tmpMessages = [...conversation];
        tmpMessages.push({
          from: EnumFromMessage.USER,
          text: message,
        });
        setConversation(tmpMessages);
        messageContainer.current.scrollTo({
          top: scrollEnd.current.offsetTop,
          left: 0,
          behavior: 'smooth',
        });

        const sendMessage = async () => {
          const response = await generateChatResponse(chatId, message, token);
          setConversation(response.updatedChat.conversation);
          setMessage(null);
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
    setIsNavigatorDisplayed(false);
  };

  const handleSelectChat = (id) => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      navigate('/');
    } else {
      getChat(id, token);
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
    }
  };

  const handleCreateNewChat = () => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      navigate('/');
    } else {
      const createChat = async () => {
        const data = await createNewChat(token);
        getChat(data.chat._id, token);
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
      setIsLoading(true);
      createChat();
    }
  };

  return (
    <div className="min-h-[100vh] min-w-[100vw] flex flex-col">
      <div className="w-full flex flex-row justify-center align-middle min-h-[10dvh] p-4 border-b-2 border-slate-200">
        <span className="text-3xl">Mordhio</span>
      </div>
      {!isLoading && chats ? (
        <div className="flex flex-row min-h-[90vh]">
          <div
            className={`flex flex-col gap-3 text-white p-4 border-r-2 border-slate-200  ${
              isNavigatorDisplayed ? 'w-[9/10]' : 'w-[1/10]'
            } md:min-w-fit h-[90vh]`}
          >
            <h1 className="p-2 text-center w-full text-2xl">Tus chats</h1>
            <span
              key={0}
              className="p-2 bg-slate-200 rounded-sm text-black cursor-pointer hover:bg-slate-100"
              onClick={() => {
                handleCreateNewChat();
              }}
            >
              +
            </span>
            {chats.map((chat) => {
              return (
                <span
                  key={chat._id}
                  className={`p-2  rounded-sm text-black cursor-pointer  ${
                    chatId == chat._id
                      ? 'bg-slate-200 rounded-lg'
                      : 'text-white'
                  }`}
                  onClick={() => {
                    handleSelectChat(chat._id);
                  }}
                >
                  {chat.title}
                </span>
              );
            })}
          </div>
          <div
            className={` ${
              isNavigatorDisplayed ? 'w-[1/10]' : 'w-full'
            } md:visible`}
          >
            {chatId ? (
              <>
                <div
                  ref={messageContainer}
                  className="flex flex-col gap-6 h-[80dvh] overflow-y-auto p-4"
                >
                  {conversation &&
                    conversation.length > 0 &&
                    conversation.map((message, index) =>
                      message.from == 'BOT' ? (
                        <div
                          className="flex w-full flex-row justify-start"
                          key={index}
                        >
                          <div className="justify-start text-left bg-slate-200 text-black rounded-r-md rounded-t-md p-2 max-w-[90%]">
                            <MarkdownRenderer content={message.text} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex w-full flex-row justify-end"
                          key={index}
                        >
                          <div className="justify-end bg-blue-400 text-black  rounded-l-md rounded-t-md p-2 max-w-[90%] text-left ">
                            {message.text}
                          </div>
                        </div>
                      )
                    )}
                  <div ref={scrollEnd} className="h-2"></div>
                </div>
                <div className="flex flex-row gap-2 h-[10dvh] bg-gray-800 ">
                  {!isMsgLoading ? (
                    <>
                      <div className="w-[90%] md:w-[95%] p-2 bg-gray-800 place-items-center">
                        <textarea
                          ref={inputRef}
                          className="resize-none w-full h-full p-2 text-sm"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                      </div>

                      <div
                        className="w-[10%] md:w-[5%] p-2 cursor-pointer flex place-items-center"
                        onClick={() => handleSendMessage()}
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
              <div className="h-[90vh] w-full p-4 flex place-items-center">
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
