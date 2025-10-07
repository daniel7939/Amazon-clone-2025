import React, { useEffect, useContext } from 'react'
import { DataContext } from '../../components/Dataprovider/Dataprovider';
import { useNavigate } from 'react-router-dom';
const ProtectRoute = ({children,msg,redirect}) => {
    const navigate=useNavigate();
    const [{user},dispatch]=React.useContext(DataContext);
    useEffect(()=>{
    if(!user){
navigate("/auth",{state:{msg,redirect}})    }
},[user])
  
  return children;
}

export default ProtectRoute