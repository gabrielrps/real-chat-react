import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';

//Meus componentes
import Chat from './components/Chat'
import Header from './components/Header';
import AppReducer from './AppReducer';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import Home from './components/Home';
import HomeGuest from './components/HomeGuest';
import FlashMessages from './components/FlashMessages';


Axios.defaults.baseURL= 'http://realchatspringboot-env-1.eba-8pqvzdhw.us-east-2.elasticbeanstalk.com';


function Main() {

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("username")),
    flashMessages: [],
    user: {
      username: localStorage.getItem("username"),
      avatar:localStorage.getItem("avatar")
    },
    isChatOpen: false,
    topic: "global",
    from: "",
    to: ""
  };
  
  const [state, dispatch] = useImmerReducer(AppReducer, initialState); 

  useEffect(() => {
    if(state.loggedIn){
      localStorage.setItem("username", state.user.username);
      localStorage.setItem("avatar", state.user.avatar);
    }else {
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>

        <FlashMessages messages={state.flashMessages} />
        
        <Header />

        {state.loggedIn ? <Home /> : <HomeGuest /> }

        {state.loggedIn && state.isChatOpen &&  (
          <Chat />
        )}

      </DispatchContext.Provider>
    </StateContext.Provider>    

  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

if (module.hot) {
  module.hot.accept()
}
