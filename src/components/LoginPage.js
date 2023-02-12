import React, { useState, useEffect, useReducer } from "react";

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
  const [isLogin, setIsLogin] = useState(true);
  // const [email, setEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [username, setUsername] = useState("");
  // const [unameValid, setUnameValid] = useState();
  const [password, setPassword] = useState("");
  // const [passValid, setpassValid] = useState();
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

  const submitHandler = (event) => {
    event.preventDefault();
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
          onChange = {emailChangeHandler}
          onBlur = {validateEmailHandler}>
        </input>
        )}
        <input
          type="text"
          value={username}
          onChange={usernameChangeEventHandler}
        ></input>
        <input
          type="text"
          value={password}
          onChange={passwordChangeHandler}
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
