import { useState } from 'react';
import AppHeader from './components/appHeader/AppHeader';
import RandomChar from './components/randomChar/RandomChar';
import CharList from './components/charList/CharList';
import CharInfo from './components/charInfo/CharInfo';
import ComicsList from './components/comicsList/ComicsList';
import AppBanner from './components/appBanner/AppBanner';
import decoration from './resources/img/vision.png';

function App() {
  const [selectedChar, setSelectedChar] = useState({ selectedChar: null });

  const onCharSelected = (id) => {
    setSelectedChar({
      selectedChar: id,
    });
  };

  return (
    <div className="app">
      <AppHeader></AppHeader>
      <main>
        {/* <RandomChar></RandomChar>
        <div className="char__content">
          <CharList onCharSelected={onCharSelected}></CharList>
          <CharInfo charId={selectedChar.selectedChar}></CharInfo>
        </div>
        <img src={decoration} alt="vision" className="bg-decoration" /> */}
        <AppBanner></AppBanner>
        <ComicsList></ComicsList>
      </main>
    </div>
  );
}

export default App;
