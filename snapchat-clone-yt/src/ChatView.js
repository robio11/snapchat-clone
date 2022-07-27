import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectSelectedImage } from './features/counter/appSlice'

function ChatView() {

    const selectedImage = useSelector(selectSelectedImage);
    const navigate = useNavigate();

    useEffect (() => {
      if(!selectedImage){
        exit();
      }
      // console.log(exit());
    },[selectedImage]);
    console.log(selectedImage);

    const exit = ()  => {
        navigate('/chats');
    }

  return (
    <div className='chatview' >
        <img src={selectedImage} onClick={exit} alt="" />
    </div>
  )
}

export default ChatView