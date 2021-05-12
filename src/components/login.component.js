import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);


    const validate = async () => {
        let credentials = {
            username: email,
            password: password
        }
        let url = 'http://localhost:8080/demo/validate'
        try {
            const response = await fetch(url, {
                method: 'put',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            setRedirect(true);
            //resolve();
        } catch (error) {
            console.log(error);
        }
    }

    if (redirect) {
        return <Redirect to="/welcome"/>
    }

        return (

            <div className="auth-wrapper">
                <form onSubmit>
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
            
                    <Link to="/welcome" className="btn btn-primary btn-block">Submit</Link>
                    {/* <button type="submit" className="btn btn-primary btn-block">Submit</button> */}
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        );
}
