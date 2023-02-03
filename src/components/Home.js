import Books from './Books';
import Search from './Search';

import BooksJSON from '../books.json';

const Home = () => {
  const books = BooksJSON.books;
  return (
    <div className='body'>
      <Books books={books} />
    </div>
  );
};

export default Home;
