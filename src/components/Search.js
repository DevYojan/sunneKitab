import { Link } from 'react-router-dom';
import { useState } from 'react';

const Search = ({ topSearchedBooks, books }) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(topSearchedBooks);

  const handleSearch = (e) => {
    setSearch(e.target.value);

    //setting results to top Searched books if input field is empty
    if (e.target.value === '') {
      setSearchResult(topSearchedBooks);
      return;
    }

    const keyword = e.target.value.toLowerCase();
    const foundBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword)
    );
    setSearchResult(foundBooks);
  };

  return (
    <>
      {/* <i className='fa-solid fa-magnifying-glass fa-2x'></i> */}

      <div className='searchDiv'>
        <Link to='/' className='goBack'>
          <i className='fa-solid fa-arrow-left'></i>
        </Link>
        <p className='control has-icons-left'>
          <span className='icon is-small is-left'>
            <i className='fas fa-magnifying-glass'></i>
          </span>
          <input
            className='searchBox input is-rounded is-focused'
            type='text'
            placeholder='Search for book or author'
            onChange={(e) => handleSearch(e)}
            value={search}
            autoFocus
          />
        </p>
        <h4 className='title is-4'>Top Searches</h4>

        <div className='topBooks'>
          {searchResult.map((book) => (
            <Link key={book.title} to='/book' state={{ book: book }}>
              <article key={book.title} className='media'>
                <figure className='media-left'>
                  <p className='image is-64x64'>
                    <img src={book.photo} alt={book.title} />
                  </p>
                </figure>
                <div className='media-content'>
                  <div className='content'>
                    <p className='searchContent'>
                      <strong>{book.title}</strong>
                      <i className='fa-regular fa-circle-play'></i>
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
