import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import Button from 'react-bootstrap/Button';


const api = axios.create({
    baseURL: `http://localhost:8080/demo`
  })
  

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const validate = (resolve) => {
        let credentials = {
            username: email,
            password: password
        }
        api.put("/validate", credentials).then(res => {
            setRedirect(true);
            resolve();
        }).catch(error => {
            console.log(error);
            resolve();
        })
    }

    const renderAuthButton = () => {
        if (redirect) {
        return <Link to="/welcome" width="25px" className="btn btn-primary btn-block">Submit</Link>;
        } else {
        return <><Button as="input" block type="submit" value="Submit" />{' '}</>
        }
      }

        return (

            <div className="auth-wrapper">
                <form onSubmit={new Promise((resolve) => {validate(resolve)})}>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                            type="email" 
                            className="form-control"
                             placeholder="Enter email" 
                             value={email} 
                             onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <br />

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <br />

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <br />
                    {renderAuthButton()}
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        );
}
