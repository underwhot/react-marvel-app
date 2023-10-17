import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './App';

// import MarvelService from './services/MarvelService';

// const marvelService = new MarvelService();

// marvelService.getAllCharacters().then((res) => console.log(res));
// marvelService.getCharacter(1011052).then((res) => console.log(res));

// marvelService.getAllCharacters().then((res) =>
//   res.data.results.forEach((elem) => {
//     console.log(elem.name);
//   })
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
