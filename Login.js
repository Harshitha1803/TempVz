import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${role}: ${email} | Password: ${password}`);

    console.log(role);

    // Navigate to different dashboards based on role
    if (role === "Admin") {
        navigate("/admin-dashboard");
    } else if (role === "Intern") {
        navigate("/intern-dashboard");
    } else {
        alert(role);
        alert("Invalid role");
    }
  };

  return (
    <div className="role-selection">
      <h2>{role} Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button className="back-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </form>
    </div>
  );
}

export default Login;
