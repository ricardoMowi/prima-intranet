import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaClipboardList,
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const id = "62943f5d0b8aac48a4a52862";
    const [user, setUser] = useState({
        id: '',
        name: '',
        email : '',
        lastName: '',
        clientType: '',
        ruc:'',
        address: '',
        status:'',
      });
      
    const menuItem=[
        {
            path:"/profile",
            name:"Nombre de usuario",
            icon:<FaUserAlt/>
        },
        {
            path:"/",
            name:"Inicio",
            icon:<FaTh/>
        },
        {
            path:"/blog",
            name:"Nueva solicitud de trámite",
            icon:<FaClipboardList/>
        },


    ]

    const peticionGet = async ()=>{
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

    useEffect(()=>{
        peticionGet();
    }, [])    


    return (


        <div className="container" style={{ margin: '0px', padding: '0px'}} >
           <div style={{width: isOpen ? "350px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">PRIMA  </h1>
                   <div style={{marginLeft: isOpen ? "150px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>

               {
                   menuItem.map((item, index)=>(
                    
                       <NavLink to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text"> {item.path == '/profile' ? user.name + ' ' + user.lastName : item.name }</div>
                       </NavLink>
                   ))
               }
           </div>
           <main className="main">          
                <div className="container-fluid" >
                    <div className="ui-view">
                    <div>
                        <div className="animated fadeIn">
                        {children}
                        </div>
                    </div>
                    </div>
                </div>
           </main>

          
        </div>
    );
};

export default Sidebar;