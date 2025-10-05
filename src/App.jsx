import React, { useEffect } from 'react'
import Routing from './Router'
import { useContext } from 'react'
import { DataContext } from './components/Dataprovider/Dataprovider'
import { auth } from './Utility/fairbase'
import { Type } from './Utility/action.type'

function App() {
  const [state, dispatch] = useContext(DataContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // user is logged out
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div>
      <Routing/>
    </div>
  )
}

export default App
