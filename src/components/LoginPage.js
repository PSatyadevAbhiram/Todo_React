import React, { useState, useEffect } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState("");

  useEffect(() => {
	const identifier = setTimeout(() => {setIsFormValid(username.length > 6 && password.length > 6);}, 500);
	return () => {
		clearTimeout(identifier);
	}
  }, [username, password]);

  const usernameChangeEventHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
	setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
	props.onLogin(username, password);
  };

  return (
    <form onSubmit={submitHandler}>
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
  );
};

export default Login;
