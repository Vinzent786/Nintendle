import {HashRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/App.css?v=1.0';
import Game from './Game.jsx';
import Info from './Info.jsx';
import { OptionsProvider } from '../helpers/options-context.jsx';
import { AnswerProvider } from '../helpers/answer-context.jsx';
import { GridProvider } from '../helpers/grid-context.jsx';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimerID = setTimeout(() => setLoading(false), 850);

    return () => clearTimeout(loadTimerID);
  }, []);


  return (
    <>
    {
      (loading) ?     
      <div id="loading-container">
        <p>Loading...</p>
        <div id="loading-gif"></div>
      </div>
      :
      <HashRouter>
        <OptionsProvider>
          <AnswerProvider>
            <GridProvider>
              <Routes>
                <Route path='/' element = {<Game />} />
                <Route path='/info.jsx' element = {<Info />} />
              </Routes>
            </GridProvider>
          </AnswerProvider>
        </OptionsProvider>
      </HashRouter>
    }
    </>
  );
}