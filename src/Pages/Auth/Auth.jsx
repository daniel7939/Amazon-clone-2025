import React,{useState,useContext} from 'react'
import styles from './Signup.module.css'
import { Link, Navigate, useNavigate,useLocation} from 'react-router-dom'
import {auth} from '../../Utility/fairbase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {DataContext} from '../../components/Dataprovider/Dataprovider'
import {ClipLoader} from 'react-spinners'

function Auth() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [signUp,setSignUp] = useState(false)
  const [{user},dispatch]= useContext(DataContext)
  const navigate = useNavigate();
  const navStateData=useLocation();
  console.log(user,navStateData);
  const authHandler = (e) => {
    e.preventDefault();
    setError("");
    if (e.target.name === "signIn") {
      setLoadingSignIn(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          setLoadingSignIn(false);
          dispatch({ type: "SET_USER", user: userinfo.user });
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          setError(err.message);
          setLoadingSignIn(false);
          
        });
    } else if (e.target.name === "SignUp") {
      setLoadingSignUp(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          setLoadingSignUp(false);
          dispatch({ type: "SET_USER", user: userinfo.user });
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          setError(err.message);
          setLoadingSignUp(false);
        });
    }
  };

  //
  return (
    
  <section className={styles.authContainer}>
{/* logo */}
<Link to={'/'}>
  <img  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="" />
</Link>
{/* form */}
<div className={styles.formContainer}>
  <h1>Sign-In</h1>
  {navStateData?.state?.msg &&
   <p className={styles.error}>
    {navStateData.state.msg}</p>}
 
  <form action="">
    <h5>Email</h5>
    <input onChange={(e) => setEmail(e.target.value)} type="text" />
    <h5>Password</h5>
    <input onChange={(e) => setPassword(e.target.value)} type="password" />
    <button 
      type="submit" 
      onClick={authHandler}
      name='signIn' 
      className={styles.signInButton}
      disabled={loadingSignIn}
    >
      {loadingSignIn ? <ClipLoader color='white' size={20}/> : 'Sign In'}
    </button>
  </form>
  <p>By signing-in you agree to Amazon's Conditions of Use & Sale. 
    Please see our Privacy Notice, our Cookies Notice and
    our Interest-Based Ads Notice.</p>
  <button 
    type="submit"
    onClick={authHandler} 
    name='SignUp' 
    className={styles.createAccountButton}
    disabled={loadingSignUp}
  >
    {loadingSignUp ? <ClipLoader color='white' size={20}/> : 'Create your Amazon Account'}
  </button>
    {
      error && <p className={styles.error}>{error}</p>
    }
</div>
  </section>
  
  )
}

export default Auth