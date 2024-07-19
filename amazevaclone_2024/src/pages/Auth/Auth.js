import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './SignUp.module.css';
// import { auth } from '../../Utility/firebase';
import { auth, db } from '../../Utility/firebase';
import { ClipLoader } from "react-spinners";
import { useState, useContext } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/action.type';
function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // {lodding}
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });

   const [{ user }, dispatch] = useContext(DataContext)
   const navigate = useNavigate()

  const authHandler = (e) => {
    e.preventDefault()
    console.log(e.target.name)
    if (e.target.name === 'signin') {
      // firebase auth
      setLoading({ ...loading, signIn: true }) 
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        console.log(userInfo)
        dispatch({ type:Type.SET_USER, user: userInfo.user 
        })
        setLoading({...loading, signIn:false})
        navigate("/")
      }).catch((error) => {         
        setError(error.message)
        setLoading({...loading, signIn:false})
      });
    } else {
      // firebase auth
      setLoading({...loading, signUp:true})
      createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {       
        dispatch({ 
          type: Type.SET_USER, 
          user: userInfo.user })
          setLoading({...loading,signUp:false})
          navigate("/")
      })
          .catch((error) => {
        setError(error.message)
        setLoading({...loading,signUp:false})
      });
    }
  }

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG7.png" alt="Amazon Logo" />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign in</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="Email" />
          </div>
          <div>
            <label htmlFor="Password">Password </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>
                    <button
            type='submit'
            onClick={authHandler}
            name='signin'
            className={classes.login__signInButton}>
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>By signing-in you agree to the AMAZON FAKE CLONE conditions of use and sale. Please see our Privacy Notice, our Cookies Notice and our Interst -Based Ads Notice.</p>

        <button
  type='submit'
  onClick={authHandler}
  name='signup'
  className={classes.login__registerButton}>
  {loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create Your Amazon Account"}
</button>

        {error && <small style={{paddingTop: "5px", color: "red"}}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;