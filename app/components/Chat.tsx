import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    //api: "/api/openai",
    keepLastMessageOnError: true,
  });

  const chatContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    if (chatContainer.current) {
      const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current;
      if (scrollHeight >= scrollTop + offsetHeight) {
        chatContainer.current.scrollTo(0, scrollHeight + 200);
      }
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div ref={chatContainer} className="response space-y-4">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`chat-line ${
              m.role === "user" ? "user-chat justify-end" : "ai-chat justify-start"
            } flex items-start space-x-3`}
          >
            <Image
              className="avatar"
              alt="avatar"
              width={32}
              height={32}
              src={m.role === "user" ? "/user-avatar.jpg" : "/ai-avatar.png"}
            />
            <div
              className={`message p-3 rounded-lg max-w-xs ${
                m.role === "user" ? "bg-[#6580B8] text-white" : "bg-gray-300 text-black"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <div  className="chat">
      {renderResponse()}
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          name="input-field"
          type="text"
          placeholder="Start with 'hi'"
          onChange={handleInputChange}
          value={input}
        />
        <button type="submit" className="send-button" />
      </form>
    </div>
  );
};

export default Chat;
