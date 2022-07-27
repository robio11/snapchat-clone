import React from 'react';
import { useEffect } from 'react';
import './Preview.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectCameraImage, resetCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from 'uuid';
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db } from './firebase';
import { addDoc, Timestamp, collection } from 'firebase/firestore';

function Preview() {

  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(cameraImage);

  useEffect(() => {
    if (!cameraImage) {
      navigate('/');
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate('/');
  }

  const sendPost = () => {
    const id = uuid();
    const storageRef = ref(storage, 'posts');
    const uploadTask = uploadBytesResumable(storageRef, cameraImage)

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await addDoc(collection(db, 'posts'), {
            imageUrl: downloadURL,
            username: 'Ktpa',
            read: false,
            timestamp: Timestamp.fromDate(new Date()),
          },
          );
        navigate('/chats');
          // docData();
        }
        )
      }
    )
  };

  // const docData = async(post) => await addDoc(collection(db,'posts'), {
  //   image:downloadURL,
  //   name:'Kitti',
  //   read:false,
  //   timestamp:Timestamp.fromDate(new Date()),
  // });
  // docData(post);
  // await setDoc(doc(db,'posts'),docData);

  return (
    <div className='preview'>
      <CloseIcon onClick={closePreview} className='preview_close' />
      <div className="preview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview_footer">
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className='perview_sendIcon' />
      </div>
    </div>
  )
}

export default Preview