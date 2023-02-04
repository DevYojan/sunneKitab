import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { books } = location.state;
  const { topSearchedBooks } = location.state;

  const [search, setSearch] = useState('');
  const [searchMessage, setSearchMessage] = useState(1);
  const [searchResult, setSearchResult] = useState(topSearchedBooks);

  const handleSearch = (e) => {
    setSearch(e.target.value);

    //setting results to top Searched books if input field is empty
    if (e.target.value === '') {
      setSearchResult(topSearchedBooks);
      setSearchMessage(1);
      return;
    }

    const keyword = e.target.value.toLowerCase();
    const foundBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword)
    );

    if (foundBooks.length === 0) {
      setSearchMessage(
        `Meri Ammai Ni. We don't have '${e.target.value}'. Try searching some other books or authors.`
      );

      setSearchResult(topSearchedBooks);
      return;
    }

    setSearchResult(foundBooks.slice(0, 4));
    setSearchMessage('');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='searchDiv'>
        <i className='fa-solid fa-arrow-left goBack' onClick={goBack}></i>
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
        <span className='searchMessage'>{searchMessage !== 1 ? searchMessage : ''}</span>
        <h4 className='title is-4'>
          {searchMessage === '' && searchMessage !== 1 ? 'Search Result' : 'Top Searched Books'}
        </h4>

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
