import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [isLogin, setLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  function validate() {
    if (!email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (!isLogin && name.trim() < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    setError("");
    if (!validate()) return;

    setLoading(true);
    try{
      const data = isLogin
        ? await loginUser({ email, password })
        : await registerUser({ name, email, password });

      saveAuth(data.user, data.token);
      navigate("/");
    }catch(err){
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }finally{
      setLoading(false);
    }
  }

  function switchMode() {
    setLogin(!isLogin);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-logo">Audify</h1>
          <p className="auth-tagline">
            {isLogin
              ? "Welcome back. Start listening."
              : "Join Audify today. It's free."}
          </p>
        </div>

        <div className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="input-hint">
            {password.length > 0 && password.length < 8
              ? `${8 - password.length}more characters needed`
              : ""}
          </p>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn-auth" onClick={handleSubmit}>
            {isLogin ? "Log In" : "Create Account"}
          </button>

          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span className="auth-link" onClick={switchMode}>
                {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
