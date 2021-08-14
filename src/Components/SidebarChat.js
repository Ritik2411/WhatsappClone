import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import db from '../fbconfig'
import './SidebarChat.css'

function SidebarChat({addNewChat,id,name}) {
    const [seed,setseed] = useState("")
    const [message,setMessage] = useState('')
    useEffect(()=>{
       db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(
           snapshot => {
            setMessage(snapshot.docs.map(data=>(
                data.data()
            )))
           }
       ) 
    },[])    
    useEffect(()=>{
        setseed(Math.floor(Math.random() * 5000))
    },[])

    const createChat = () =>{
        const roomCreate = prompt('Please enter name for chat')
        if(roomCreate){
            db.collection('rooms').add({
                name:roomCreate
            })            
        }
    }

    return !addNewChat?(
        <Link to={`/${id}`}>
        <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='sidebarchat_info'>
                <h3>{name}</h3>
                <p>{message[0]?.message}</p>
            </div>
        </div>
        </Link>

    ):(
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat
