import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../fbconfig';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase'

function Chat() {

    const [input,setInput] = useState('')
    const [name,setname] = useState('')
    const [messages,setMessages] = useState([])
    const [{user},dispatch] = useStateValue()
    const {id} = useParams()
    console.log(id)
    const sendMessages = (e) =>{
        e.preventDefault()
        console.log(input)
        db.collection('rooms').doc(id).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    console.log(messages)
    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).onSnapshot(snapshot=>(
                setname(snapshot.data().name)
            ));

            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot)=>(
                setMessages(snapshot.docs.map(doc=>(
                    doc.data()
                )))
            ));
        }
    },[id])
    console.log(messages)

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar/>
                <div className='chat_header_info'>
                    <h3>{name}</h3>
                    <p>Last Seen at{" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>

                <div className='chat_header_right'>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {messages.map((data)=>(
                    <p className={`chat_message ${data.name === user.displayName && "chat_receiver"}`}>
                        <span className="chat_name">{data.name}</span>
                        {data.message}
                        <span className="chat_time">{new Date(data.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}

            </div>

            <div className='chat_footer'>
                <IconButton>
                <InsertEmoticonIcon/>
                </IconButton>
                <form>
                <input type='text' 
                 placeholder='Type a message' 
                 onChange={e => setInput(e.target.value)}/>
                <IconButton onClick={sendMessages} type='submit'>
                    <SendIcon/>
                </IconButton>
                </form>
                <IconButton>
                <MicIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
