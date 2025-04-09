import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { useState } from 'react';

function App() {
  const [savedCandidates, setSavedCandidates] = useState([]);
  return (
    <>
      <Nav />
      <main>
        <Outlet context={[savedCandidates, setSavedCandidates]} />
      </main>
    </>
  );
}

export default App;
