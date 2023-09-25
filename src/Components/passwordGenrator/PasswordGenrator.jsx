import { useState, useCallback, useEffect, useRef } from "react";
function PasswordGenrator() {
  // define Character Type
  const [length, setLength] = useState(8);
  const [noAllowed, setNoAllowed] = useState(false);
  const [noChar, setNoChar] = useState(false);
  const [password, setPassword] = useState("");
  // Use Ref Using
  const refPassword = useRef();
  // Copy Genrated Password
  const copyTopassword = useCallback(() => {
    refPassword.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (noAllowed) str += "0123456789";
    if (noChar) str += "!@#$%^&*()*+,-./:;<=>?@[](){}>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, noAllowed, noChar, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, noAllowed, noChar, passwordGenerator]);

  return (
    <>
      <h2 className="text-3xl text-center text-white mt-8">
        Password Genrator
      </h2>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 text-orange-500 bg-gray-800 p-5">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={refPassword}
          />
          <button
            className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
            onClick={copyTopassword}
          >
            Copy Password
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              id="range"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="range">Length {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={noAllowed}
              id="numberInput"
              onChange={() => {
                console.log(noAllowed);
                setNoAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={noChar}
              id="characterInput"
              onChange={() => {
                setNoChar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordGenrator;
