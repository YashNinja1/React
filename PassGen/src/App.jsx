import { useState, useCallback, useEffect } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed]);

  return (
    <div
      className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 
    my-8 bg-gray-800 text-orange-500"
    >
      <h1 className="text-2xl text-white font-bold mb-4 text-center">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full px-3 py-1 bg-white teaxt-gray-800"
          placeholder="Password"
          readOnly
        />
        <button
          className="bg-blue-500 text-white px-3 py-1"
          onClick={() =>
            navigator.clipboard.writeText(password).then(() => {
              setCopySuccess("Copied!");
              setTimeout(() => setCopySuccess(""), 2000);
            })
          }
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            name=""
            id=""
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
            name=""
            id=""
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={() => setCharacterAllowed(!characterAllowed)}
            name=""
            id=""
          />
          <label htmlFor="character">Characters</label>
        </div>
      </div>
      {copySuccess && (
        <span className="flex items-center justify-center text-green-400 ml-2 ">
          {copySuccess}
        </span>
      )}
    </div>
  );
}

export default App;
