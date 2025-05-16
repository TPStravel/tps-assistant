import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Results from './Results';

function App() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </>
  );
}


export default App;
