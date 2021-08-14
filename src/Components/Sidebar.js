import './Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat'
import db from '../fbconfig';
import { useStateValue } from '../StateProvider';

function Sidebar() {

    const [room,setRoom] = useState([])
    const [{user},dispatch] = useStateValue()
    useEffect(()=>{
       const unSubscribe =  db.collection('rooms').onSnapshot(snapshot => (
            setRoom(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data(),
            })))
        ))

        return () => {
            unSubscribe()
        }
    },[])

    console.log(room)
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_header_right'>
                  <IconButton>
                    <DonutLargeIcon/>
                  </IconButton>
                  <IconButton>  
                    <ChatIcon/>
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon/>
                  </IconButton>            
                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchcontainer'>
                    <SearchIcon/>
                    <input type='text' placeholder='Search or start to chat'/>
                </div>
            </div>
            <div className='sidebar_chats'>
                <SidebarChat addNewChat/>
                {
                    room.map(data=>(
                        <SidebarChat key={data.id} id={data.id} name={data.data.name}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
