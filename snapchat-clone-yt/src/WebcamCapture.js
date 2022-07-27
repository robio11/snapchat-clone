import React, { useCallback} from 'react'
import Webcam from 'react-webcam';
import { useRef } from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {useDispatch} from 'react-redux';
import {setCameraImage} from './features/cameraSlice';
import {useNavigate} from 'react-router-dom';
import './WebcamCapture.css';

const videoConstraints ={
    width:250,
    height: 400,
    facingMode: 'user',
}
function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const capture =  useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        // console.log((imageSrc))
        dispatch( setCameraImage(imageSrc))
        navigate('/preview')
    },[webcamRef,dispatch,navigate]);

  return (
    <div className='webcamCapture'>
        <Webcam
        audio = {false} 
        height= {videoConstraints.height}
        ref={webcamRef}
        width = {videoConstraints.width}
        screenshotFormat = 'image/jpeg'
        videoConstraints = {videoConstraints}
        />
        <RadioButtonUncheckedIcon onClick={capture}className='webcamCapture_button' fontSize='large'  />
        
        {/* <img src={image} alt="" /> */}

    </div>
  )
}

export default WebcamCapture