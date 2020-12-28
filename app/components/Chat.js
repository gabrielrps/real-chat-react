import React, {useRef, useEffect, useContext} from 'react';
import {useImmer} from 'use-immer';
import SockJsClient from 'react-stomp';
import Button from '@material-ui/core/Button';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import Axios from 'axios';

const SOCKET_URL = 'https://real-chat-spring.herokuapp.com/ws-chat/';

function Chat() {

  
  const appDispatch = useContext(DispatchContext);
  const appContext = useContext(StateContext);
  
  const [state, setState] = useImmer({
    messages: [],
    typedMessage: "",
    fieldBlank: true
  });

  useEffect(() => {
    async function fetchData(){
      if(appContext.to == "global"){
        const response = await Axios.get("/api/getMessagesGroupGlobal");
        if(response.data){
          setState(draft => {
            draft.messages = response.data;
          });
        }
      }else {
        const response = await Axios.post("/api/getMessagesGroup", {from: appContext.from, to:appContext.to});
        if(response.data){
          setState(draft => {
            draft.messages = response.data;
          });
        }
      }


    }
    fetchData();
  },[appContext.to]);

  const chatLog = useRef(null);
  const clientRef = useRef();

  useEffect(() => {
    chatLog.current.scrollTop = chatLog.current.scrollHeight;
  },[state.messages]);
  

  function sendMessage() {
    clientRef.current.sendMessage('/app/send', JSON.stringify({
      sender: appContext.user.username,
      content: state.typedMessage,
      topic: appContext.topic
    }));  

    const response = Axios.post("/api/saveMessage", {from:localStorage.getItem("username"), to:appContext.to, content: state.typedMessage});

    setState(draft => {
      draft.typedMessage = "";
      draft.fieldBlank = true;
    });
  }

  function onMessage(msg){
    setState(draft => {
      draft.messages.push(msg);
    });
  }

  function handleFieldChange(e){
    const value = e.target.value;
    setState(draft => {
        draft.typedMessage = value;
        draft.fieldBlank = !Boolean(value);
    });
  } 

  return (
       
          <div className="chat-wrapper shadow border-top border-left border-right chat-wrapper--is-visible">
        
            <div className="chat-title-bar bg-primary">
                    Chat - {appContext.to.toUpperCase()}
                    <span onClick={() => appDispatch({type:"closeChat"})} className="chat-title-bar-close">
                    <i className="fas fa-times-circle"></i>
                    </span>
            </div>
                    
            <div id="chat" className="chat-log" ref={chatLog}>
              {state.messages.map((message, index) => {
                  if(message.sender === appContext.user.username){
                      return (
                          <div key={index} className="chat-self">
                              <div className="chat-message">
                                  <div className="chat-message-inner">{message.content}</div>
                              </div>

                              <img className="chat-avatar avatar-tiny" src={appContext.user.avatar} />
                          </div>
                      );
                  }

                  return (
                      <div className="chat-other" key={index}>
                          <a href="#">
                              <img className="avatar-tiny" src={message.avatar} />
                          </a>
                          <div className="chat-message">
                              <div className="chat-message-inner">
                                  <a href="#">
                                      <strong>{message.sender}</strong>:
                                  </a>
                                  {message.content}
                              </div>
                          </div>
                      </div>
                  );
                  })}               
              </div>


              <div>
                <input value={state.typedMessage} onChange={handleFieldChange} type="text" className="chat-field" id="chatField" placeholder="Type a message…" autoComplete="off" />
                <Button disabled={state.fieldBlank} id="buttonEntered" variant="contained" color="primary" onClick={sendMessage}>Send</Button> 
              </div>

              <SockJsClient 
                url={SOCKET_URL} 
                topics={['/topic/'+appContext.topic]}
                onMessage={(msg) => onMessage(msg)}
                ref={clientRef} 
              />

            </div>

  );  
}

export default Chat;

