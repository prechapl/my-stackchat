import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import axios from 'axios'
import NewMessageEntry from "./components/NewMessageEntry";
// import react from 'react'

const initialState = {
  messages: [],
  newMessageEntry: '',
};

const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const ADD_MESSAGES = "ADD_MESSAGES";

//payload action
export const gotMessagesFromServer = arr => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages: arr
});

export const addMessages = str => ({
  type: ADD_MESSAGES,
  newMessageEntry: str
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case ADD_MESSAGES:
      return { ...state, newMessageEntry: action.newMessageEntry };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export const fetchMessages = () =>{
  return async (dispatch)=>{
    const response = await axios.get('/api/messages');
    const messages = response.data;
    const action = gotMessagesFromServer(messages)
    dispatch(action);
  }
}

export default store;
