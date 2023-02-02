import { useEffect, useReducer } from 'react';
import { useAuth } from '../providers/auth'


function reducer (state, action) {
    switch (action.type) {
    case 'DELETE':
        console.log('borrando del estado')
        return state.filter((elem)=>{
            return elem.id !== action.payload.id;
        });

    case 'UPDATE':
        return state.map((elem)=>{
            if (elem.id == action.payload.id){
                return action.payload.body;
            };
            return elem;
        });

    case 'CREATE':
        return [...state, action.payload.body];

    case 'SET':
        console.log('colando set')
        return action.payload.body;

    default:
        return state
    }
}

function useFetchItems(url) {
  const auth = useAuth()
  const [state, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    updateData();
  }, [])

  async function updateData() {
      try{
        const res = await fetch(url,
          { 
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + auth.token,}
          })
        const resp = await res.json()
        dispatch({type:'SET', payload: {body: resp}})

      }catch(error){
        console.log(error)
      }
  }

  return [state, dispatch, updateData];
}

export {useFetchItems}