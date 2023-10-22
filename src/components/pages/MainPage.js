import { useState } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState({ selectedChar: null });

  const onCharSelected = (id) => {
    setSelectedChar({
      selectedChar: id,
    });
  };

  return (
    <>
      <RandomChar></RandomChar>
      <div className="char__content">
        <CharList onCharSelected={onCharSelected}></CharList>
        <CharInfo charId={selectedChar.selectedChar}></CharInfo>
      </div>
      <img src={decoration} alt="vision" className="bg-decoration" />
    </>
  );
};

export default MainPage;
