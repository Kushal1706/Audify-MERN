import { useState } from "react";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState;

    function handleLogin(){
        if(!email || !password){
            setError("Please fill in all fields");
            return;
        }
        if(!email.includes("@")){
            setError("Please enter a valid email");
            return;
        }

        setError("");
        console.log("Logging in with:", email, password);
        alert(`Welcome, ${email}!`);
    }


    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <h1 className="auth-logo">Audify</h1>
                    <p className="auth-tagline">Welcome back. Start listening</p>
                </div>

                <div className="auth-form">
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input type="email" className="input-field" placeholder="you@gmail.com"/>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" className="input-field" placeholder="••••••••" />
                    </div>

                    <button className="btn-auth">Login</button>

                    <p className="auth-switch">
                        Don't have an account?{" "}<span className="auth-link">Sign up</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;