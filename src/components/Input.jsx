import React from 'react';

function Searcher({
  input, setInput, placeholder, name = 'searcher', text, type = 'text', inlineBlock = false,
}) {
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className={`w-full md:w-4/5 mx-auto lg:w-3/4 ${inlineBlock ? 'inline-block' : 'block'} `}>
      <label htmlFor={name}>
        <p className="uppercase text-gray-400 font-bold text-center my-2">{text}</p>
        <input
          className="w-full p-2 border-2 rounded-md"
          type={type}
          name={name}
          id={name}
          value={input}
          onChange={handleInput}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}

export default Searcher;
