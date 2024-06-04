const SearchBar = ({ setSearch, search, execute }) => {
  const handleChange = e => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full my-2 flex items-center justify-start h-fit relative">
      <input
        value={search}
        className="input ml-auto mr-auto"
        type="text"
        placeholder="szukaj"
        onChange={handleChange}
        onKeyPress={execute}
      />
    </div>
  );
};

export default SearchBar;
