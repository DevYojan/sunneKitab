import { Link } from 'react-router-dom';
import { useState } from 'react';

const Books = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * (Math.floor(books.length) - 0 + 1) + 0)
  );
  const [bookToShow, setBookToShow] = useState(books[currentIndex]);

  const nextBook = () => {
    //If pagination reaches last book reset pagination
    if (currentIndex + 1 > books.length - 1) {
      setBookToShow(books[0]);
      setCurrentIndex(0);
      return;
    }

    setBookToShow(books[currentIndex + 1]);
    setCurrentIndex(currentIndex + 1);
  };

  const previousBook = () => {
    if (currentIndex - 1 < 0) {
      setBookToShow(books[books.length - 1]);
      setCurrentIndex(books.length - 1);
      return;
    }

    setBookToShow(books[currentIndex - 1]);
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className='books'>
      <i className='fa-solid fa-chevron-left fa-2x pagination-icons' onClick={previousBook}></i>

      <Link to='/book' state={{ book: bookToShow }}>
        <div className='card'>
          <div className='card-image'>
            <figure className='image is-4by5'>
              <img
                src={bookToShow.photo}
                alt={bookToShow.title}
                className='bookCover'
                loading='lazy'
                key={bookToShow.title}
              />
            </figure>
          </div>
          <div className='card-content'>
            <div className='content'>
              <p className='title is-5'>{bookToShow.title}</p>
              <p className='icon-text subtitle is-6 author'>
                <span className='icon'>
                  <i className='fa-solid fa-pen-nib'></i>
                </span>
                {bookToShow.author}
              </p>
              <span className='subtitle is-6 episodes'>{bookToShow.episodes.length} episodes</span>
            </div>
          </div>
        </div>
      </Link>
      <i className='fa-solid fa-chevron-right fa-2x pagination-icons' onClick={nextBook}></i>
      {/* <div className='card'>
        <div className='card-image'>
          <figure className='image is-4by5'>
            <img src={require('../img/Pagal-Basti.jpg')} alt='Pagal Basti' />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content'>
            <p className='title is-4'>Pagalbasti</p>
            <p className='icon-text subtitle is-5'>
              <span className='icon'>
                <i className='fa-solid fa-pen-nib'></i>
              </span>
              Sarubhakta
            </p>
            <p className='subtitle is-6'>total 15hrs with 18 episodes</p>
          </div>
        </div>
      </div>

      <div className='card'>
        <div className='card-image'>
          <figure className='image is-4by5'>
            <img src={require('../img/Pagal-Basti.jpg')} alt='Pagal Basti' />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content'>
            <p className='title is-4'>Pagalbasti</p>
            <p className='icon-text subtitle is-5'>
              <span className='icon'>
                <i className='fa-solid fa-pen-nib'></i>
              </span>
              Sarubhakta
            </p>
            <p className='subtitle is-6'>total 15hrs with 18 episodes</p>
          </div>
        </div>
      </div>

      <div className='card'>
        <div className='card-image'>
          <figure className='image is-4by5'>
            <img src={require('../img/Pagal-Basti.jpg')} alt='Pagal Basti' />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content'>
            <p className='title is-4'>Pagalbasti</p>
            <p className='icon-text subtitle is-5'>
              <span className='icon'>
                <i className='fa-solid fa-pen-nib'></i>
              </span>
              Sarubhakta
            </p>
            <p className='subtitle is-6'>total 15hrs with 18 episodes</p>
          </div>
        </div>
      </div>

      <div className='card'>
        <div className='card-image'>
          <figure className='image is-4by5'>
            <img src={require('../img/Pagal-Basti.jpg')} alt='Pagal Basti' />
          </figure>
        </div>
        <div className='card-content'>
          <div className='content'>
            <p className='title is-4'>Pagalbasti</p>
            <p className='icon-text subtitle is-5'>
              <span className='icon'>
                <i className='fa-solid fa-pen-nib'></i>
              </span>
              Sarubhakta
            </p>
            <p className='subtitle is-6'>total 15hrs with 18 episodes</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Books;
