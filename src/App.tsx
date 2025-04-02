import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import ChatList from './pages/ChatList/ChatList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
