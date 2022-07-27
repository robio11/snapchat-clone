import React from 'react'
import { useEffect,useState } from 'react';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import './Chats.css';
import {db} from './firebase';
import { collection,orderBy,onSnapshot,query} from 'firebase/firestore';
import Chat from './Chat';
// import { async } from '@firebase/util';

function Chats() {
    const [posts,setPosts] = useState([]);

    useEffect( () => {
       const q = query (collection(db,'posts'),orderBy('timestamp','desc'));
      onSnapshot (q,(snapshot) => setPosts(snapshot.docs.map(doc => ({
         id:doc.id,
         data:doc.data(),
       }))))
     }, [])
    
  return (
    <div className='chats'>
        <div className="chats_header">
            <Avatar className='chats_avatar' />
            <div className="chats_search">
                <SearchIcon/>
                <input placeholder='Friends' type="text" />
            </div>
            <ChatBubbleIcon className='chars_chatIcon' />
        </div>
        <div className="chats_posts">
          {/* <Chat/> */}
          {posts.map(({id,data:{profilePic,username,timestamp,imageUrl,read}}) =>(
            <Chat 
            key={id}
            id={id}
            username={username}
            timestamp={timestamp}
            imageUrl={imageUrl}
            read={read}
            profilePic={profilePic}
            />
          ))}
        </div>
    </div>
  )
}

export default Chats