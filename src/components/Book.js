import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';

import Player from './Player';

const Book = () => {
  const location = useLocation();
  const { book } = location.state;

  const [playlist, setPlaylist] = useState(book.episodes);

  return (
    <div className='book'>
      <div className='bookAndNav'>
        <Link to='/' className='goBack'>
          <i className='fa-solid fa-arrow-left'></i>
        </Link>
        <h1 className='title is-3 has-text-centered bookTitle'>{book.title}</h1>
        <span className='empty'></span>
      </div>
      <p className='icon-text subtitle authorAndDuration'>
        <span className='icon'>
          <i className='fa-solid fa-pen-nib'></i>
        </span>
        {book.author} <br />
        total 3.5 hrs with {book.episodes.length} episodes
      </p>

      <p className='subtitle releasedDate'>Released on {book.released}</p>
      <p className='description'>{book.description}</p>
      <Player book={book} playlist={playlist} />
    </div>
  );
};

export default Book;
