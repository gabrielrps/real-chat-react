export default (draft, action) => {
    switch(action.type) {
      case "login": 
        draft.loggedIn = true;
        draft.user = action.data;
        draft.from = action.data.username;
        break;
      case "logout": 
        draft.loggedIn = false;
        draft.isChatOpen = false;
        break;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        break;
      case "toggleChat":
        draft.isChatOpen = !draft.isChatOpen;
        break;  
      case "closeChat":
        draft.isChatOpen = false;
        break;  
      case "openChat":
        draft.isChatOpen = true;
        break;
      case "chatTopic":
        draft.topic = action.value;
        draft.from = action.from;
        draft.to = action.to;
        break;               
    }
};