import React from 'react';

function Searcher({
  input, setInput, placeholder, name = 'searcher', text,
}) {
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="w-full md:w-4/5 mx-auto lg:w-3/4">
      <label htmlFor={name}>
        <p className="uppercase text-gray-400 font-bold text-center my-2">{text}</p>
        <input
          className="w-full p-2 border-2 rounded-md"
          type="text"
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
