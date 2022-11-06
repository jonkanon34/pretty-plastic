import { useEffect, useRef, useState } from 'react';

const Canvas = (props) => {
  const [drawing, setDrawing] = useState(false);

  const { canvasRef, ctxRef } = props;

  const startDraw = ({ nativeEvent }) => {
    if (nativeEvent.type === 'touchstart') {
      const { pageX, pageY } = nativeEvent.changedTouches[0];
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(pageX, pageY);
  
      if (props.changeItem) {
        var imageObj = new Image();
        imageObj.src = props.image;
        ctxRef.current.drawImage(
          imageObj, 
          pageX-(props.lineWidth/2), 
          pageY-(props.lineWidth/2), 
          props.lineWidth, 
          props.image==='/images/img_28.png' ? props.lineWidth*2 : props.lineWidth
        );
        ctxRef.current.stroke();
      }
      setDrawing(true);
    } else {
      const { offsetX, offsetY } = nativeEvent;
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
  
      if (props.changeItem) {
        var imageObj = new Image();
        imageObj.src = props.image;
        ctxRef.current.drawImage(
          imageObj, 
          offsetX-(props.lineWidth/2), 
          offsetY-(props.lineWidth/2), 
          props.lineWidth, 
          props.image==='/images/img_28.png' ? props.lineWidth*2 : props.lineWidth
        );
        ctxRef.current.stroke();
      }
      setDrawing(true);
    }
    
  };
  
  const stopDraw = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };
  
  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    if (nativeEvent.type === 'touchmove') {
      const { pageX, pageY } = nativeEvent.changedTouches[0];
      ctxRef.current.lineTo(pageX, pageY);
      if (props.changeItem) {
        var imageObj = new Image();
        imageObj.src = props.image;
        ctxRef.current.drawImage(
          imageObj, 
          pageX-(props.lineWidth/2), 
          pageY-(props.lineWidth/2), 
          props.lineWidth, 
          props.image==='/images/img_28.png' ? props.lineWidth*2 : props.lineWidth
        );
        ctxRef.current.stroke();    
      }
      ctxRef.current.stroke();
    } else {
      const { offsetX, offsetY } = nativeEvent;
      ctxRef.current.lineTo(offsetX, offsetY);
      if (props.changeItem) {
        var imageObj = new Image();
        imageObj.src = props.image;
        ctxRef.current.drawImage(
          imageObj, 
          offsetX-(props.lineWidth/2), 
          offsetY-(props.lineWidth/2), 
          props.lineWidth, 
          props.image==='/images/img_28.png' ? props.lineWidth*2 : props.lineWidth
        );
        ctxRef.current.stroke();    
      }
      ctxRef.current.stroke();
    }
  };


  // Import, state and ref events

useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    if (!props.changeItem) {
      ctx.lineCap = props.lineCap;
      ctx.strokeStyle = props.strokeStyle;
      ctx.lineWidth = props.lineWidth;
    } else {
      ctx.lineCap = props.lineCap;
      ctx.strokeStyle = 'transparent';
      ctx.lineWidth = props.lineWidth;
    }
    ctxRef.current = ctx;
  }, [props.changeItem]);
  
  // Drawing functionalities

  return (
    <>
      <canvas
        onMouseDown={startDraw}
        onTouchStart={startDraw}
        onMouseUp={stopDraw}
        onTouchEnd={stopDraw}
        onMouseMove={draw}
        onTouchMove={draw}
        ref={canvasRef}
        id="canvas"
      />
    </>
  );
}

export default Canvas