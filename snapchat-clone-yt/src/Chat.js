import React from 'react'
import './Chat.css';
import {Avatar} from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import { useDispatch } from 'react-redux';
import {selectImage} from './features/counter/appSlice';
import {db} from './firebase';
import { addDoc ,collection} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
// import TimeAgo from "react-time-ago";
// import ReactTimeAgo from "javascript-time-ago";
// import en from 'javascript-time-ago/locale/en' ;

function Chat({id,username,timestamp,read,imageUrl,profilePic}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = async() => {
    if(!read){
      dispatch(selectImage(imageUrl));
      const ref = await addDoc(collection( db,'posts',id),
      {
        read:true,
      },
        {
          merge:true,
        },
      )
      console.log(ref);
    };
    navigate('/view');
  };
  console.log(selectImage(imageUrl));

  return (
    <div onClick={open} className='chat'>
        <Avatar src={profilePic} />
        <div className="chat_info">
            <h4>{username}</h4>
            <p>Tap to view -{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
        {!read && <StopIcon className='chat_readIcon' />}
    </div>
  )
}

export default Chat