import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Book from './components/Book';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';

function App() {
  return (
    <div className='container'>
      <Router>
        <Header />
        <Routes>
          <Route path='/book' element={<Book />} />
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
