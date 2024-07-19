import React, { useContext,useEffect,} from 'react';
import './App.css';
import Routeing from './Router';
import {Type} from "./Utility/action.type"
// import {DataProvider} from './Components/DataProvider/DataProvider';
import {auth} from "./Utility/firebase"
import { DataContext } from "./Components/DataProvider/DataProvider";


function App() {
const [{user}, dispatch]= useContext(DataContext)

  useEffect(()=> {
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        dispatch({
          type:Type.SET_USER, 
          user:authUser})
      }else{
        dispatch({
          type:Type.SET_USER, 
          user:null})
      }
    })


  },[])

  return (
    // <DataProvider> 
    <Routeing/>
    // </DataProvider>
  );
}

export default App;
