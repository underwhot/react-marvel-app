import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
// import thor from '../../resources/img/thor.jpeg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
  const [res, setRes] = useState({ char: {}, loading: true, error: false });
  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setRes({ char, loading: false });
  };

  const onError = () => {
    setRes({ loading: false, error: true });
  };

  const onCharLoading = () => {
    setRes({ loading: true });
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    onCharLoading();
    marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
  };

  useEffect(() => {
    updateChar();
  }, []);

  const randomCharHandler = (e) => {
    e.preventDefault();
    updateChar();
  };

  const { char, loading, error } = res;
  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error) ? <View char={char}></View> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={randomCharHandler} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const style =
    thumbnail && thumbnail.includes('image_not_available')
      ? { objectFit: 'fill' }
      : null;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={style}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
