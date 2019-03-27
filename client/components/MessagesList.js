import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchMessages} from '../store';

const mapStateToProps = (state) =>{
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchInitialMessages: () => dispatch(fetchMessages())
  }
} 

class MessagesList extends Component {

  constructor (props) {
    super(props);
    this.state = { messages: [] };
  }

  async componentDidMount () {
    console.log('in componentDidMount')
    // const response = await axios.get('/api/messages');
    // const messages = response.data;
    console.log('this.props: ', this.props)
    const messages = await this.props.fetchInitialMessages()
    // console.log("messages here: ", messages)
    // this.setState({ messages });
  }

  render () {
    console.log('render')
    
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.props.messages;

    //? 
    const filteredMessages = messages ? messages.filter(message => message.channelId === channelId) : [];

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)