import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/library.api';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.signup({username, email, password});
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className="SignupPage">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={handleUsername} />
        
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={handlePassword} />

        <button type="submit">Signup!</button>
      </form>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>
      <Link to='/login'>Login</Link>
    </div>
  )
}

export default SignupPage;