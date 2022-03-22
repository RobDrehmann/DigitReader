import './App.css';
import {useState, useEffect} from 'react';
import {useCanvas} from './CanvasContext';
import { Bar } from 'react-chartjs-2';
import { ClearCanvasButton } from './ClearCanvasButton';
import * as tf from '@tensorflow/tfjs';
export function Canvas() {
  const [imgdisplay,setimgdisplay]= useState(false);
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);



const [imgURL,setimgURL]= useState('');
const [array,setArray]= useState('');

const data = {
  legend: {
    display: false,
},
  labels: ['0','1','2','3','4','5','6','7','8','9'],
  datasets: [{
    data: array,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }],
  options: {
    plugins: {
      legend: {
        display: false
      }
    }
  }
};


  const predictions = async() =>   {
    setimgdisplay(true);
    const model = await tf.loadLayersModel('/assets/model.json');
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var imgData = ctx.getImageData(0,0,c.width,c.height);
    var image1 = await document.getElementById('image1');

    setimgURL(c.toDataURL());


      // Convert the canvas pixels to
      console.log(image1);




      // Make and format the predications
      const output = model.predict(tf.cast(tf.image.resizeNearestNeighbor(tf.browser.fromPixels(c,1),[28, 28]), 'float32').expandDims(0)) ;
      setArray(Array.from(output.dataSync()));
      // Save predictions on the component


      console.log(Array.from(output.dataSync()));


  }

  return ( <>
<div className = 'Main_Canvas'>
    <canvas
      onMouseDown={startDrawing}
      id = 'canvas'
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
    <div className="Main_Canvas_btn">
    <button onClick={() => predictions() }>GUESS NUMBER</button>
    <div className="Main_Canvas_btn_clr" onClick={()=> setArray('')}>
    <ClearCanvasButton/>
    </div>
<img src = {imgURL} id={`img${imgdisplay}`} d  = 'image1' width = '28' height = '28'/>
</div>
</div>
<div className="Main_Canvas_bar">
<Bar data = {data} />
</div>
  </>

);
}
