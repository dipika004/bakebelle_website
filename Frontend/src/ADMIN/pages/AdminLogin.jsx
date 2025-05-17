import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = credentials;

    if (username === "admin" && password === "123") {
      const now = new Date().getTime();
const expiry = now + 30 * 60 * 1000; // 30 minutes
sessionStorage.setItem("isAdmin", JSON.stringify({ value: true, expiry }));
      alert("Login successful");
      navigate("/dipika-2004");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
    <h3>hi dipika</h3>
    </>
  );
};

export default AdminLogin;
