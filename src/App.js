import './App.css';
import {useState, useEffect} from 'react';
import {useCanvas} from './CanvasContext';
import {Canvas} from './Canvas';
import { ClearCanvasButton } from './ClearCanvasButton';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

if (!firebase.apps.length) {
   firebase.initializeApp({
     apiKey: "AIzaSyD7iUo5A2SRJBxU4bcvdRYlF94qjzoiGKk",
  authDomain: "digit-e9584.firebaseapp.com",
  projectId: "digit-e9584",
  storageBucket: "digit-e9584.appspot.com",
  messagingSenderId: "147608506510",
  appId: "1:147608506510:web:9202991080b484e196b9df",
  measurementId: "G-NSHPKN0BZP"
   });
}else {
   firebase.app(); // if already initialized, use that one
}


function App() {
  const draw = (ctx, frameCount) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
      ctx.fill()
    }

const [inputvalue,setinputvalue]= useState(1);

  return (
    <div className="App">
      <div className="App_Header">
       <h1>Digit Reader</h1>

      </div>
      <div className="App_Canvas">
      <Canvas/>

      </div>
      
      <div className="App_About">
        <div class="seperator"></div>
      
    </div>
    </div>
  );

}



export default App;
