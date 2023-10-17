import { useEffect, useRef, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import abyss from '../../resources/img/abyss.jpg';

const CharList = ({ onCharSelected }) => {
  const [res, setRes] = useState({
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  });
  const marvelService = new MarvelService();

  const onCharsLoaded = (newChars) => {
    let ended = false;

    if (newChars < 9) {
      ended = true;
    }

    setRes(({ chars, offset }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      error: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  const onError = () => {
    setRes({ loading: false, error: true });
  };

  // const updateChars = () => {
  //   marvelService.getAllCharacters(9).then(onCharsLoaded).catch(onError);
  // };

  const onRequest = (offset) => {
    onCharListLoading();

    marvelService
      .getAllCharacters(9, offset)
      .then(onCharsLoaded)
      .catch(onError);
  };

  const onCharListLoading = () => {
    setRes({
      ...res,
      newItemLoading: true,
    });
  };

  useEffect(() => {
    onRequest();
  }, []);

  // console.log(res);

  const activeItemRef = useRef(null);

  const addActiveClass = (item) => {
    if (activeItemRef.current) {
      activeItemRef.current.active = false;
    }
    item.active = true;
    activeItemRef.current = item;
  };

  const renderItems = (arr) => {
    const items = arr.map((item) => {
      let style = { objectFit: 'cover' };

      if (item.thumbnail.includes('image_not_available')) {
        style = { objectFit: 'fill' };
      }

      return (
        <li
          onClick={() => {
            onCharSelected(item.id);
            addActiveClass(item);
          }}
          key={item.id}
          className={item.active ? 'char__item _active' : 'char__item'}
        >
          <img style={style} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  };

  const { chars, loading, error, newItemLoading, offset, charEnded } = res;
  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error) ? renderItems(chars) : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
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

// import { useEffect, useRef, useState } from 'react';
// import MarvelService from '../../services/MarvelService';
// import './charList.scss';
// import Spinner from '../spinner/Spinner';
// import ErrorMessage from '../errorMessage/ErrorMessage';
// // import abyss from '../../resources/img/abyss.jpg';

// const CharList = ({ onCharSelected }) => {
//   const [res, setRes] = useState({
//     chars: [],
//     loading: true,
//     error: false,
//     newItemLoading: false,
//     offset: 210,
//     charEnded: false,
//   });
//   const marvelService = new MarvelService();

//   const ref = useRef(res);
//   console.log(ref);

//   const onCharsLoaded = (newChars) => {
//     let ended = false;

//     if (newChars < 9) {
//       ended = true;
//     }

//     setRes(({ chars, offset }) => ({
//       chars: [...chars, ...newChars],
//       loading: false,
//       error: false,
//       newItemLoading: false,
//       offset: offset + 9,
//       charEnded: ended,
//     }));
//   };

//   const onError = () => {
//     setRes({ loading: false, error: true });
//   };

//   // const updateChars = () => {
//   //   marvelService.getAllCharacters(9).then(onCharsLoaded).catch(onError);
//   // };

//   const onRequest = (offset) => {
//     onCharListLoading();

//     marvelService
//       .getAllCharacters(9, offset)
//       .then(onCharsLoaded)
//       .catch(onError);
//   };

//   const onCharListLoading = () => {
//     setRes({
//       ...res,
//       newItemLoading: true,
//     });
//   };

//   useEffect(() => {
//     onRequest();
//   }, []);

//   // console.log(res);

//   const renderItems = (arr) => {
//     const items = arr.map((item) => {
//       let style = { objectFit: 'cover' };

//       if (item.thumbnail.includes('image_not_available')) {
//         style = { objectFit: 'fill' };
//       }

//       return (
//         <li
//           onClick={() => onCharSelected(item.id)}
//           key={item.id}
//           className="char__item"
//         >
//           <img style={style} src={item.thumbnail} alt={item.name} />
//           <div className="char__name">{item.name}</div>
//         </li>
//       );
//     });

//     return <ul className="char__grid">{items}</ul>;
//   };

//   const { chars, loading, error, newItemLoading, offset, charEnded } = res;
//   const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
//   const spinner = loading ? <Spinner></Spinner> : null;
//   const content = !(loading || error) ? renderItems(chars) : null;

//   return (
//     <div className="char__list">
//       {errorMessage}
//       {spinner}
//       {content}
//       <button
//         className="button button__main button__long"
//         disabled={newItemLoading}
//         style={{ display: charEnded ? 'none' : 'block' }}
//         onClick={() => {
//           onRequest(offset);
//         }}
//       >
//         <div className="inner">load more</div>
//       </button>
//     </div>
//   );
// };

// export default CharList;
