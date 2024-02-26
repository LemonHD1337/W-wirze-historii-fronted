const SearchBar = ({ onChange, onKeyPress }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="szukaj"
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchBar;
