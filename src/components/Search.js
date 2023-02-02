const Search = () => {
  return (
    <>
      <i className='fa-solid fa-magnifying-glass fa-2x'></i>
      <input
        className='searchBox input is-rounded'
        type='text'
        placeholder='Search for book or author'
        hidden
      />
    </>
  );
};

export default Search;
