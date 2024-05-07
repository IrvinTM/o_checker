import { useState } from "react";
import "./index.css";

function App() {
  const [texto, setTexto] = useState("");
  const [results, setResults] = useState("");
  const [isPending, setIsPending] = useState(false)
  const myserv = import.meta.env.VITE_API_URL
  const handleChange = (event) => {
    setTexto(event.target.value);
  };

   const sentRequest = async () => {
    try {
      setIsPending(true)
      const response = await fetch(myserv, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify({
          texto: texto,
        })
      })
      const resp = await response.json()
      
      setResults(resp)
      setIsPending(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
  <div className="bg-gray-900 rounded-lg shadow-lg w-full sm:w-auto md:w-3/4 lg:w-1/2">
    <textarea
      value={results}
      readOnly
      className="border-2 border-yellow-400 rounded-lg p-2 flex bg-gray-900 text-white w-full h-48 resize-none"
      name="result"
      id="result"
    ></textarea>
  </div>
  <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full sm:w-auto md:w-3/4 lg:w-1/2">
    <textarea
      className="border-2 border-yellow-400 rounded-lg p-2 mb-2 resize-none bg-gray-900 text-white w-full"
      value={texto}
      onChange={handleChange}
      name="result"
      placeholder="Write your message..."
    ></textarea>
    <div className="bg-gray-900">
      {!isPending &&<button
        onClick={sentRequest}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
      >
        Ask gpt 4
      </button>}
      {isPending &&<button
      disabled
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
      >
        Thinking...
      </button>}
    </div>
  </div>
</div>
  );
}

export default App;
