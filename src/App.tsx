import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import NotFound from './pages/NotFound/NotFound';
import Chat from './pages/Chat/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
