import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios'

const UserContext = React.createContext();

export function UserProvider(){
    var id= "62943f5d0b8aac48a4a52862";
    const [user, setUser] = useState({
        id: '',
        name: '',
        email : '',
        lastName: '',
        clientType: '',
        ruc:'',
        address: '',
        status:'',
        passwordConfirm:'',
      });

    useEffect(()=>{
        async function getUser(){
            await axios.get("http://localhost:8080/client/getClient/"+id)
            .then(response=>{
                console.log('data:::::::', response.data)
                setUser(response.data.client);
            }).catch(
              error =>{
                console.log('error:::::::', error)
              }
            )
        }
        getUser();
    }, []);

    const value =useMemo(()=>{
        return({
            user
        })
    }, [user])

    return <UserContext.Provider value={value} />

} 

export function useContextUser (){
    const context = React.useContext(UserContext);
    if(!context){
        throw new Error('useContextUser debe estar dentro del proveedor')
    }
    return context;
}