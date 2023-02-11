import { Link } from 'react-router-dom';

const Header = ({ books }) => {
  return (
    <div className='header'>
      <Link to='/' className='logoTitle'>
        <div className='logo'></div>
        <h3 className='title'>Sunne Kitab</h3>
      </Link>
      <Link to='/search' state={{ topSearchedBooks: books.slice(0, 4), books: books }}>
        <i className='fa-solid fa-magnifying-glass fa-2x'></i>
      </Link>
    </div>
  );
};

export default Header;
