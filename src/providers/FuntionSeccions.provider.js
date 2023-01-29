import React, { useContext } from "react"
import {useAuth} from './auth'
import { DatesContext } from "../app/datesContext"
import {SocketContext} from '../providers/socketContext'
import { DataContext } from "./DataContext"

const FunctionSectionsContext = React.createContext()

function FunctionSectionsProvider({children}){
    const {socket} = useContext(SocketContext)
    const auth = useAuth()
    const {taskValue, setTaskValue, setDefault} = useContext(DataContext)
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

const moveToSection = async (sectionId, callback) => {
    const res = await fetch('http://localhost:3000/api/v1/sections/' + sectionId,{
                    method: 'POST',
                    headers: headers,
                    body:JSON.stringify({
                        todoId: taskValue.id
                      }),
    })
    if(res){
        socket.emit('moveToSection',{origen: taskValue.section, destino: sectionId, user: socket.id,})
        console.log(`se movio ${taskValue.id} a ${sectionId}`,res)
        console.log(`origen: ${taskValue.section} destino:  ${sectionId}`,res)
        setTaskValue(
            {
              id: null,
              content: '',
              details: '',
              event: '',
              notifications: [],
            })
        setTimeout(()=>callback(), 1000)
        
    }
}

const deleteSection = async (id, callback) => {
				const res = await fetch('/api/v1/inbox/your-todos/'+ id, {
                    method: 'DELETE',
                    headers: headers,})
                if(res){
                    console.log(res)
                    callback()
                }
				
                
}

const updateSection = async (folderId, body, callback) => {
				const res = await fetch('#' + folderId,{
								method: 'PUT',
								headers: headers,
								body: body,
				})
				if(res){
                    console.log(res)
                    callback()
                }
}

const createSection = async (body, callback) => {
				const res = await fetch('http://localhost:3000/api/v1/folders',{
								method: 'POST',
								headers: headers,
								body:  JSON.stringify(body),
				})
				if(res){
                    console.log(res)
                    callback()
                }
}




const move = async(sectionId, callback)=>{
    socket.emit('refrescar', {origen: taskValue.section, destino: sectionId, todo: taskValue.id, exclude: socket.id})
    setTimeout(()=>callback(), 1000)
    setDefault()
}

return <FunctionSectionsContext.Provider
value={{createSection, updateSection, deleteSection, moveToSection, move}}>
				{children}
</FunctionSectionsContext.Provider>
}
				
export {FunctionSectionsContext, FunctionSectionsProvider}