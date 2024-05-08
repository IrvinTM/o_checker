import { useState, useRef, useEffect } from "react";
import "./index.css";

const messages = []

function App() {
  const [texto, setTexto] = useState("");
  const [results, setResults] = useState("");
  const [isPending, setIsPending] = useState(false)
  const myserv = import.meta.env.VITE_API_URL
  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  

   const sentRequest = async () => {

    try {
      const message = { role: "user", content: texto }
      messages.push(message)
      setIsPending(true)
      setTexto("")
      const response = await fetch(myserv, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify({
          messages,
        })
      })
      const resp = await response.json()
      setResults(`${results} ${resp}`)
      messages.push({role: "assistant", content: resp})
      setIsPending(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900">
    <div className="content-wrapper flex flex-col break-normal bg-gray-900 rounded-lg shadow-lg sm:w-auto md:w-3/4 lg:w-1/2">
      {messages.map((message) => (
          <div key={message.content} className="border-t rounded-b-lg  text-container border-teal-900  shadow p-2 bg-gray-900 text-white">
            <div className="relative top-0 left-0 h-8 w-8">{message.role === 'user' ? (<button className="h-8 w-8"><img className="h-8 w-8" src="https://cdn3.emoji.gg/emojis/8748_gigachad.png" alt="" /></button>) : (<button><img className="h-8 w-8" src="https://cdn3.emoji.gg/emojis/5289-iqdog.png" alt="" /></button>)}</div>
            <pre className="whitespace-pre-line">{message.content}</pre>
          </div>
        ))}    
      
        <AlwaysScrollToBottom />
    </div>
    <div className="button-container sticky bottom-0 bg-gray-900 justify-end p-8 rounded-lg shadow-lg w-full sm:w-auto md:w-3/4 lg:w-1/2">
    <textarea id="prompt" className="border rounded-lg p-2 mb-2 resize-none bg-gray-900 text-white w-full" value={texto} onChange={handleChange} name="result" placeholder="Write your message..."></textarea>
      <div className="button-wrapper flex justify-end gap-2">
        {!isPending && (
          <button onClick={sentRequest} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">
            Ask GPT-4
          </button>
        )}
        {isPending && (
          <button disabled className="text-white bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">
           Processing...
          </button>
        )}
      </div>
    </div>
  </div>
  

  );
}

export default App;
