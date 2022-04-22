import React from 'react';

function Searcher({ input, setInput, placeholder }) {
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="w-full md:w-4/5 mx-auto lg:w-3/4">
      <label htmlFor="searcher">
        <input
          className="w-full p-2 border-2 rounded-md"
          type="text"
          name="searcher"
          id="searcher"
          value={input}
          onChange={handleInput}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}

export default Searcher;
