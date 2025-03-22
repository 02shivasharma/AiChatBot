import React, { useContext, useState } from 'react'
import { HiMenu } from "react-icons/hi"
import {HiPlus} from "react-icons/hi"
import {HiChatAlt} from "react-icons/hi"
import {HiQuestionMarkCircle} from "react-icons/hi"
import {AiOutlineHistory} from "react-icons/ai"
import {AiOutlineSetting} from "react-icons/ai";
import { Context } from '../../context/Context';


const Sidebar = () => {

    const {onSent, prevPrompts, setRecentPrompt, extended, setExtended} = useContext(Context);
    const loadPrompt = async (prompt)=> {
       setRecentPrompt(prompt);
       await onSent(prompt);
    }
  return (
    <aside className={`flex flex-col justify-between bg-slate-200 h-screen fixed left-0 top-0 transition-all duration-300 ${
      extended ? 'w-64' : 'w-16'
    }`}>
      <div >
       <HiMenu onClick={()=> setExtended(!extended)} className='w-6 h-6 ml-2 cursor-pointer'/>
       <div className='mt-10 flex justify-center p-2  rounded-full bg-slate-300'>
         <HiPlus className='' />{extended ?  <p className='text-sm pl-2 pb-1'>New Chat</p> : null}
       </div>
       {extended ?   <div className='mt-6'>
          <p className='text-start'>Recent</p>
          {prevPrompts.map((prompt, index)=> {
            return (
                 <div onClick={()=>loadPrompt(prompt)} key={index} className='flex items-center justify-center  p-2 rounded-md hover:bg-slate-300'>
           <HiChatAlt className='h-4 w-4' />
           <p className='p-2'> {prompt.slice(0,18)}...</p>
          </div>
            )
          })}
        
        </div> : null}
     
      </div>
      <div className='flex flex-col '>
        <div className='flex p-2 rounded-md hover:bg-slate-300'>
         <HiQuestionMarkCircle className='mr-2 mt-1'/>
         {extended ? <p className='text-start'>Help</p> : null}
        </div>
         <div className='flex p-2 rounded-md hover:bg-slate-300'>
         <AiOutlineHistory className='mr-2 mt-1 '/>
         {extended ? <p className='text-start'>Actvity</p> : null}
        </div>
         <div className='flex p-2 rounded-md hover:bg-slate-300'>
         <AiOutlineSetting className='mr-2 mt-1'/>
         {extended ? <p className='text-start'>Settings</p> : null}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar