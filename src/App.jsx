import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [value , setValue] = useState(8);
  const [isNum, changeIsNum]= useState(false);
  const [isSPC, changeIsSPC] = useState(false);
  const [pass , changePass]= useState('')
  
  const PasswordGenerator =useCallback(()=>{
      
    let password = "";
    let str= "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    if(isSPC) str+="!@#$%^&*()_+-=~`|{}[]/?>.<,";
    if(isNum) str+= "1234567890";
   
    for(let i=0; i<value; i++){
      let index = Math.floor(Math.random()*str.length);
      // console.log(index,str[index]);
      password += str[index];
    }

  changePass(password);
  setValue(password.length);

  // console.log(value,pass,password,isNum,isSPC);
  },[isNum,isSPC,changePass,value,setValue])

  const PassRef = useRef(null)
 const CopyPaste=  useCallback(()=>{
  PassRef.current?.select()
        window.navigator.clipboard.writeText(pass);
  },[pass])
  useEffect(()=>{
    PasswordGenerator();
  },[value,isNum,isSPC,PasswordGenerator])
  // console.log(value,isNum,isSPC);
  return (
    <>
    <div className='input' >
      <input type="text" value={pass} ref={PassRef} readOnly/>
      <button onClick={CopyPaste} className='btn'>Copy</button>
    </div>
    <div className='opr'>
        <div>
          <input type="range" name="lenght" min={1} max={30}  id="len" value= {value} onChange={(e)=>setValue(e.target.value)} />
          <label htmlFor="len">Lenght ({value})</label>
        </div>
        <div>
          <input type="checkbox" name="isNum" id="num" value={isNum} defaultChecked={isNum} onChange={(e)=>{changeIsNum((prev)=>!prev)}}/>
          <label htmlFor="num"> Number</label>
        </div>
        <div>
          <input type="checkbox" name="isSPC" id="spc" value={isSPC} defaultChecked={isSPC} onChange={(e)=>{changeIsSPC((prev)=>!prev)}}/>
          <label htmlFor="spc">Special Char</label> 
        </div>  
    </div>
    </>
  )
}

export default App
