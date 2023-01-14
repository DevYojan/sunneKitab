import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Link to='/'>
      <div className='heading'>
        <h1 className='title is-1 has-text-centered'>Sunne Kitab</h1>
      </div>
    </Link>
  );
};

export default Header;
