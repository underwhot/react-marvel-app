import { useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(9, offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove('_active'));
    itemRefs.current[id].classList.add('_active');
    itemRefs.current[id].focus();
  };

  const renderItems = (arr) => {
    const items = arr.map((item, i) => {
      let style = { objectFit: 'cover' };

      if (item.thumbnail.includes('image_not_available')) {
        style = { objectFit: 'fill' };
      }

      return (
        <li
          onClick={() => {
            onCharSelected(item.id);
            focusOnItem(i);
          }}
          key={item.id}
          tabIndex={0}
          ref={(el) => (itemRefs.current[i] = el)}
          className={item.active ? 'char__item _active' : 'char__item'}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img style={style} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const items = renderItems(charList);
  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading && !newItemLoading ? <Spinner></Spinner> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => {
          onRequest(offset);
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
