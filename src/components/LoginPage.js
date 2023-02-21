import React, { useState, useEffect, useReducer, useRef } from "react";

const emailReducer = (state, action) => {
  if(action.type === "TOGGLE_FORM"){
    return {value: '', isValid: null}
  }
  if(action.type === "USER_INPUT"){
    return {value: action.val, isValid:action.val.includes('@')}
  }
  if(action.type === "INPUT_BLUR"){
    return {value: state.value, isValid:state.value.includes('@')}
  }
  return {value : '', isValid : false}
}

const Login = (props) => {
  let userObject = {};
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
 
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState("");


  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});
  const {isValid : emailIsValid} = emailState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setIsFormValid( isLogin 
        ? username.length > 6
        : emailIsValid && username.length > 6 && password.length > 6);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [isLogin, emailIsValid ,username, password]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  }

  const usernameChangeEventHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  async function addUserToFirebase(userObject){
    try{
      const response = await fetch('https://todo-app-74b83-default-rtdb.firebaseio.com/users.json', {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers:{
          'Content-type' : 'application/json'
        }
      });
      const data = await response.json;
      console.log(data);
    }
    catch (err){
      console.log(err);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let enteredUsername, enteredPassword, enteredEmail
    enteredUsername = usernameInputRef.current.value;
    enteredPassword = passwordInputRef.current.value;
    if(!isLogin){enteredEmail = emailInputRef.current.value};
    userObject = {
      uname: enteredUsername,
      pass: enteredPassword,
      email: enteredEmail
    }
    if(!isLogin){addUserToFirebase(userObject);}
    //props.onSignUp(emailState.value, username, password) When backend is incorporated
    props.onLogin(username, password);
  };

  const toggleForm = () => {
    console.log("Toggling")
    setIsLogin(!isLogin)
    dispatchEmail({type:"TOGGLE_FORM"})
    setPassword("")
    setUsername("")
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <input
          type="email"
          placeholder="Email"
          value={emailState.value}
          ref={emailInputRef}
          onChange = {emailChangeHandler}
          onBlur = {validateEmailHandler}>
        </input>
        )}
        <input
          type="text"
          value={username}
          onChange={usernameChangeEventHandler}
          ref={usernameInputRef}
        ></input>
        <input
          type="text"
          value={password}
          onChange={passwordChangeHandler}
          ref={passwordInputRef}
        ></input>
        <button type="submit" disabled={!isFormValid}>
          Login
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account"}
        <button onClick={toggleForm}>
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default Login;
