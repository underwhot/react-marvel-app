import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, ComicsPage, SingleComicPage, Page404 } from './components/pages';
import AppHeader from './components/appHeader/AppHeader';

function App() {
  
  
  return (
    <Router>
      <div className="app">
        <AppHeader></AppHeader>
        <main>
          <Routes>
            <Route path="/" element={<MainPage></MainPage>}></Route>
            <Route path="/comics" element={<ComicsPage></ComicsPage>}></Route>
            <Route path="/comics/:comicId" element={<SingleComicPage></SingleComicPage>}></Route>
            <Route path="*" element={<Page404></Page404>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
