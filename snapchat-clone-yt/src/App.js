import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WebcamCapture/>}/>
          <Route path='/preview' element={<Preview/>} />
          <Route path='/chats' element={<Chats/>} />
          <Route path='/view' element={<ChatView/>} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
