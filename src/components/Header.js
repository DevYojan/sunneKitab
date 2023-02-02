import { Link } from 'react-router-dom';
import Search from './Search';

const Header = () => {
  return (
    <div className='header'>
      <Link to='/' className='logoTitle'>
        <div className='logo'></div>
        <h3 className='title'>Sunne Kitaab</h3>
      </Link>
      <Search />
    </div>
  );
};

export default Header;
