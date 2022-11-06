import React, { useState, useRef } from 'react';
import { IoIosExpand } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import axios from 'axios';

import Canvas from '../Canvas/Canvas';
import About from '../Modal/About';

import { 
    imageList1, imageList2, mobileImageList1, mobileImageList2, mobileImageList3, mobileImageList4, mobileImageList5, mobileImageList6, mobileImageList7
 } from '../Items/Items';

const HeroSection = () => {
    const [expand, setExpand] = useState(true);
    const [stroke, setStroke] = useState(50);
    const [show, setShow] = useState(false);
    const [strokeImage, setStrokeImage] = useState("");
    const [changeItem, setChangeItem] = useState(false);
    const [page, setPage] = useState(0);
    const [mobilePage, setMobilePage] = useState(0);

    const imageList = [imageList1, imageList2]
    const mobileImageList = [mobileImageList1, mobileImageList2, mobileImageList3, mobileImageList4, mobileImageList5, mobileImageList6, mobileImageList7]
    
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const handleClose = () => {
        setShow(false);
    }

    const nextPage = () => {
        if(window.innerWidth > 768){
            if (page === imageList.length-1) {
                return setPage(0);
            }
            return setPage(page+1)
        } else {
            if (mobilePage === mobileImageList.length-1) {
                return setMobilePage(0);
            }
            return setMobilePage(mobilePage+1)
        }
    }
    
    const previousPage = () => {
        if(window.innerWidth > 768){
            if (page === 0) {
                return setPage(imageList.length-1);
            }
            return setPage(page-1)
        } else {
            if (mobilePage === 0) {
                return setMobilePage(mobileImageList.length-1);
            }
            return setMobilePage(mobilePage-1)
        }
    }

    const handleStroke = (image) => {
        setStrokeImage(image);
        setChangeItem(true);
    }


    const clear = () => { 
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
    };

    const download = () => {
        var canvas = document.getElementById('canvas');
        var url = canvas.toDataURL("image/png"); 
        var link = document.createElement('a');
        link.download = 'paint.png';
        link.href = url;
        link.click();
    }

    const sendMail = () => {
        var canvas = document.getElementById('canvas');
        var url = canvas.toDataURL("image/jpeg"); 
        axios(`${process.env.NEXT_PUBLIC_API_URL}send-mail/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                image: url
            }
        })
    }


  return (<>
    <div className="hero-section">
        <div className="about">
            <button onClick={() => setShow(true)} type="btn" className="about-btn text-dark">About</button>
        </div>
        <Canvas 
            strokeStyle='#000'
            lineCap='round'
            lineWidth={stroke}
            image={strokeImage}
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            changeItem={changeItem}
        />
        {expand ? (
        <div className="tools-section">
            <div className="tools-btn">
                <div className="tools mb-4 py-2">
                    <FaTimes onClick={() => setExpand(false)} className="times" />
                    <h4 className="text-center">Play</h4>
                    <div className="arrows d-flex justify-content-between mx-4 mt-4 mb-3">
                        <button onClick={previousPage}>
                            <MdArrowBackIos className="arrow left-arrow text-dark" />
                        </button>
                        <button onClick={nextPage}>
                            <MdArrowForwardIos className="arrow right-arrow text-dark" />
                        </button>
                    </div>
                    <div className="mx-4">
                        <input 
                            className="form-range" 
                            type="range" 
                            name="stroke-width"
                            min="10"
                            max="280"
                            step="10"
                            value={stroke}
                            onChange={(e) => setStroke(e.target.value)}
                        />
                    </div>
                    <div className="marker mb-3">
                        <img onClick={() => handleStroke('/images/default.png')} className="d-block mx-auto" width="60px" src="/images/marker.png" alt="" />
                    </div>
                    <div className="shape-image">
                        {imageList[page].map((image, index) => (
                            <React.Fragment key={index}>
                                <img 
                                    onClick={() => 
                                        handleStroke(`/images/${image.src.split('/media/')[1].split('.')[0]}.png`)
                                    } 
                                    src={image.src} 
                                    alt="" 
                                    className={`${image.src.split('/media/')[1].split('.')[0]}`}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="shape-image mobile-shape d-none">
                        {mobileImageList[mobilePage].map((image, index) => (
                            <React.Fragment key={index}>
                                <img 
                                    onClick={() => 
                                        handleStroke(`/images/${image.src.split('/media/')[1].split('.')[0]}.png`)
                                    } 
                                    src={image.src} 
                                    alt="" 
                                    className={`${image.src.split('/media/')[1].split('.')[0]}`}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="btns">
                    <button onClick={clear} className="clear-btn mb-3 p-1 text-dark">Clear</button>
                    <button onClick={download} className="save-btn mb-3 p-1">Save</button>
                    {/* <button onClick={sendMail} className="save-btn mb-3 p-1">Send Mail</button> */}
                </div>
            </div>
        </div>
        ) : (
        <div onClick={() => setExpand(true)} className="expand d-flex align-items-center justify-content-center">
            <IoIosExpand className="expand-icon" />
        </div>
        ) }
    </div>
    <About 
        show={show}
        handleClose={handleClose}
    />
    </>)
}

export default HeroSection
