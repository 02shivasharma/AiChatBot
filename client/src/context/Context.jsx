import { createContext, useState } from "react";
import run from "../config/gemini";


export const Context = createContext();

const ContextProvider = (props)=> {

    const [extended, setExtended] = useState(false);
 const [input, setInput] = useState("");
 const [recentPrompt, setRecentPrompt] = useState("");
 const [prevPrompts, setPrevPrompts] = useState([]);
 const [showResult, setShowResult] = useState(false);
 const [loading, setLoading] = useState(false);
 const [resultData, setResultData] = useState("");

 const delayPara  = (index, nextWord) =>{
            
            setTimeout(function(){
                setResultData(prev => prev + nextWord );
            }, 75*index);
 }

  const staticPrompt = `You are an intelligent solar energy assistant. Your goal is to provide accurate and helpful information about:
- Solar panel technology
- Installation processes
- Maintenance requirements
- Cost & ROI analysis
- Industry regulations
- Market trends
Respond in a clear and concise manner, tailored to the user's level of expertise. 

User Query: `;

  const onSent = async(prompt) => {
    
    setResultData("")
    setLoading(true)
    setShowResult(true);
    let response;
    if(prompt !== undefined){
        setRecentPrompt(prompt);
        setPrevPrompts(prev => [...prev, prompt]);
        response = await run(staticPrompt + prompt);
        
    }else{
        setPrevPrompts(prev => [...prev, input]);
        setRecentPrompt(input);
        response = await run(staticPrompt + input);
    }
    let responseArray = response.split("**")
    let newResponse = "";

    for(let i = 0; i < responseArray.length; i++){
        if( i === 0 || i %2 !== 1){
            newResponse += responseArray[i];
        }
        else{
            newResponse += "<b>"+responseArray[i]+"</b>";
        }
    }    
    let newResponse2 = newResponse.split("*").join("<br /><br />")
    let newResponseArray = newResponse2.split(" ");
    for(let i = 0; i < newResponseArray.length; i++){
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord+" ");
    }
    setLoading(false)
    setInput("")
  }
  
  const contextValue = {
      prevPrompts,
      setPrevPrompts,
      onSent,
      setRecentPrompt,
      recentPrompt,
      showResult,
      loading,
      resultData,
      input,
      setInput,
      extended, 
      setExtended
    
  }


    return <Context.Provider value={contextValue}>
    {props.children}
    </Context.Provider>
}

export default ContextProvider;