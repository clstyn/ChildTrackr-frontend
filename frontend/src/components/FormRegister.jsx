import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import linkNgrok from '../utils/env';

const FormRegister = ({ roleTitle, urlRole, urlRoleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(linkNgrok + urlRole, {
        username,
        password
      });
      navigate(urlRoleLogin);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        alert('Akun dengan username tersebut telah terdaftar');
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={saveUser} className="box">
                {/* <p className="has-text-centered">{msg}</p> */}
                <h1 className="title is-2 has-text-centered">{roleTitle} Register</h1>
                <div className="field">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      id="username"
                      className="input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="control">
                    <input
                      type="password"
                      id="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      required
                    />
                  </div>
                </div>
                <div className="field has-text-centered">
                  <label className="label">
                    <span className="small">
                      Already signed in? <Link to="/">Login</Link>
                    </span>
                  </label>
                </div>
                <div className="field mt-5">
                  <div className="control">
                    <button type="submit" className="button is-success is-fullwidth">
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormRegister;
