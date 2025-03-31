import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChatById, generateChatResponse } from '../../services/ChatService';
import Spinner from '../../components/Spinner';
import ReactMarkdown from 'react-markdown';
import SendIcon from '../../components/SendIcon';

function Chat() {
  const { id } = useParams();
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMsgLoading, setIsMsgLoading] = useState(false);
  const [message, setMessage] = useState('');
  const scrollEnd = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const getChat = async () => {
      const response = await getChatById(id);
      console.log(response.chat);
      setConversation(response.chat.conversation);
      setIsLoading(false);
    };
    getChat();
  }, []);

  const handleSendMessage = () => {
    if (message && message != '') {
      setIsMsgLoading(true);
      const sendMessage = async () => {
        const response = await generateChatResponse(id, message);
        setConversation(response.updatedChat.conversation);
        setIsMsgLoading(false);
        setMessage(null);

        setTimeout(() => {
          window.scrollTo({
            top: scrollEnd.current.offsetTop,
            left: 0,
            behavior: 'smooth',
          });
          inputRef.current?.focus();
        }, 200);
      };
      sendMessage();
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col justify-center align-middle ">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="max-w-[900px] ">
          <div className="flex  h-[10dvh] place-items-center bg-gray-800 shadow-md">
            <h1 className="text-xl w-full">Mordheim master</h1>
          </div>
          <div className="flex flex-col gap-6 h-[80dvh] overflow-y-auto p-2">
            {conversation &&
              conversation.length > 0 &&
              conversation.map((message, index) =>
                message.from == 'BOT' ? (
                  <div
                    className="flex w-full flex-row justify-start"
                    key={index}
                  >
                    <div className="justify-start bg-green-400 text-black rounded-r-md rounded-t-md p-2 w-[80%]">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full flex-row justify-end" key={index}>
                    <div className="justify-end bg-blue-400 text-black  rounded-l-md rounded-t-md p-2 w-[80%]">
                      {message.text}
                    </div>
                  </div>
                )
              )}
            <div ref={scrollEnd}></div>
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
        </div>
      )}
    </div>
  );
}

export default Chat;
