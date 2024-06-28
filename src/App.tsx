import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from "./components/Header";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings/Settings";
import Profile from "./components/pages/Profile/Profile";
import Article from "./components/pages/Article/Article";
import {useDispatch} from "react-redux";
import {authUser, signInUser} from "./state/AppSlice";
import ArticleEditor from "./components/ArticleEditor/ArticleEditor";
import {createArticle, editArticle} from "./state/ArtileEditorSlice";
import {useAppDispatch} from "./state/storeHooks";

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(authUser())
        }
    }, [dispatch])
  return (
      <>
          <Router>
              <Header/>
              <Routes>
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/profile/:username?' element={<Profile />}></Route>
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/article/:slug?' element={<Article />} />
                  <Route path='/editor/:slug?' element={<ArticleEditor submitArticle={createArticle} />} />
                  <Route path='/editor' element={<ArticleEditor submitArticle={editArticle} />} />
              </Routes>
          </Router>
      </>


  );
}

export default App;

