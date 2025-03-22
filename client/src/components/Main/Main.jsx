import React, { useContext, useEffect } from 'react'
import {HiOutlineUserCircle} from "react-icons/hi"
import { LiaCompass } from 'react-icons/lia';
import { AiOutlineBulb } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { LuChevronsLeftRight } from "react-icons/lu";
import { GrGallery } from "react-icons/gr";
import { IoIosMic } from "react-icons/io";
import { IoSendSharp } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Context } from '../../context/Context';
import { RiGeminiFill } from "react-icons/ri";
import SpinnerLoader from "../Loader/Loader"
const Main = () => {
  
  const { prevPrompts,
      setPrevPrompts,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput,
      extended } = useContext(Context);

  return (
     <main className={`flex-1 transition-all duration-300 ${
      extended ? 'ml-64' : 'ml-16'
    }`}>
      <div className='flex justify-between items-center mb-6'>
        <p className='text-slate-800 font-light'>ChatBot</p>
        <HiOutlineUserCircle className='h-16 w-16 pl-5'/>
      </div>
      <div className='space-y-6'>
      {!showResult ? <>
                 <div     className='bg-white p-4 rounded-lg shadow-sm'>
          <p className='text-left pl-4'><span className=' font-mono font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-5xl'>Hello Dev</span></p>
          <p className='pt-2 text-left pl-4 text-gray-400 font-bold text-5xl font-mono'>How Can I Help You Today ?</p>
        </div>  
          <div className='bg-white p-4 rounded-lg shadow-sm grid grid-cols-4 gap-4'>
          <div className='bg-gray-50 p-4 rounded-lg relative h-32 shadow-md transition-shadow hover:bg-slate-200'>
            <p className='text-gray-700 font-medium mb-2'>Suggest beautiful places to show</p>
            <LiaCompass className='h-6 w-6 text-gray-500 absolute bottom-3 right-3' />
          </div>
          <div className='bg-gray-50 p-4 rounded-lg relative h-32 hover:bg-slate-200 shadow-md transition-shadow'>
            <p className='text-gray-700 font-medium mb-2'>Suggest beautiful places to show</p>
            <AiOutlineBulb className='h-6 w-6 text-gray-500 absolute bottom-3 right-3' />
          </div>
          <div className='bg-gray-50 p-4 rounded-lg relative h-32 hover:bg-slate-200 shadow-md transition-shadow'>
            <p className='text-gray-700 font-medium mb-2'>Suggest beautiful places to show</p>
            <FiMessageSquare className='h-6 w-6 text-gray-500 absolute bottom-3 right-3' />
          </div>
          <div className='bg-gray-50 p-4 rounded-lg relative h-32 hover:bg-slate-200 shadow-md transition-shadow'>
            <p className='text-gray-700 font-medium mb-2'>Suggest beautiful places to show</p>
            <LuChevronsLeftRight className='h-6 w-6 text-gray-500 absolute bottom-3 right-3' />
          </div>
    </div>
      </> : <div className="flex flex-col justify-center"> 
            <div>
             <HiOutlineUserCircle className="h-10 w-10"/>
             <p className='font-bold text-3xl'>{recentPrompt}</p>
            </div>
            <div className="mt-2">
             <RiGeminiFill className="h-10 w-10"/>
             {loading ? <SpinnerLoader /> : <p className='text-start' dangerouslySetInnerHTML={{__html:resultData}}></p> }
            </div>
            </div>
      }

        <div className='fixed bottom-0 left-64 right-0 p-6 bg-white border-t'>
        <div className='max-w-4xl mx-auto flex items-center gap-4'>
          <div className='flex-1 relative flex items-center'>
            <input 
              onChange={(e)=> setInput(e.target.value)}
              value={input}
              type="text" 
              placeholder="Enter a prompt here" 
              className='w-full p-4 pr-32 rounded-lg border focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
            <div className='absolute right-2 flex items-center gap-3'>
              <GrGallery className='h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700' />
              <IoIosMic className='h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700' />
              <button onClick={()=> onSent(input)} disabled={!input.trim()} className='p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors'>
                <IoSendSharp className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>
        <p className='font-medium mt-1 text-slate-800'>This can provide incorrect information so double check it once</p>
      </div>
      </div>
    </main>
  )
}

export default Main