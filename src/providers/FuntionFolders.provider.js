import React, { useContext } from "react"
import {useAuth} from '../app/auth'
import { DatesContext } from "../app/datesContext"

const FunctionFoldersContext = React.createContext()

function FunctionFoldersProvider({children}){
    const auth = useAuth()
    const {values, setValues} = useContext(DatesContext)
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token,
    }

const deleteFolder = async (id, callback) => {
				const res = await fetch('http://localhost:3000/api/v1/folders/'+id,{
								method: 'DELETE',
								headers: headers,
				})
                if(res){
                    console.log(res)
                    callback()
                }
				
                
}

const updateFolder = async (folderId, body, callback) => {
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

const createFolder = async (body, callback) => {
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

const moveToFolder = async (folderId, callback) => {
                const res = await fetch('http://localhost:3000/api/v1/folders/'+folderId,{
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({todoId: values.id,}),
                })
                if(res){
                    console.log('se movio el item')
                    console.log(res)
                    setValues(
                        {
                          id: null,
                          content: '',
                          details: '',
                          event: '',
                          notifications: [],
                        })
                        callback()
                }
}


return <FunctionFoldersContext.Provider
value={{deleteFolder, updateFolder, createFolder, moveToFolder}}>
				{children}
</FunctionFoldersContext.Provider>
}
				
export {FunctionFoldersContext, FunctionFoldersProvider}