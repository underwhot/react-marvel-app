import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const sceleton = char || loading || error ? null : <Skeleton></Skeleton>;
  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error || !char) ? (
    <View char={char}></View>
  ) : null;

  return (
    <div className="char__info">
      {sceleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  const style = thumbnail.includes('image_not_available')
    ? { objectFit: 'fill' }
    : null;
  const limit = 5;

  return (
    <>
      <div className="char__basics">
        <img style={style} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? (
          <li className="char__comics-item">
            There is no any comics for this character
          </li>
        ) : (
          comics.slice(0, limit).map((item, i) => {
            return (
              <li key={i} className="char__comics-item">
                {item.name}
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};

export default CharInfo;
