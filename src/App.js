import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import logo from './logo.svg';
import Home from './components/Home';
import Book from './components/Book';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';

import BooksJSON from './books.json';

function App() {
  const books = BooksJSON.books;

  return (
    <div className='container'>
      <Router>
        <Header books={books} />
        <Routes>
          <Route path='/book' element={<Book />} />
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
