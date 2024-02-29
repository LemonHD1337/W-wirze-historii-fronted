const SearchBar = ({ onChange, onKeyPress, value }) => {
  return (
    <div className="w-full my-2 flex justify-center">
      <div>
        <input
          value={value}
          className="input"
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
