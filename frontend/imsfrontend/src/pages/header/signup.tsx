import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInJvbGVfaWQiOjEsIm9yZ2FuaXphdGlvbl9pZCI6MiwibmFtZSI6IkFzbWgiLCJlbWFpbCI6Imtob0BnbWFpbC5jb20iLCJtb2JpbGUiOiI0NDU0NjMiLCJwYXNzd29yZCI6IiQyYiQxMCQuOXhLbGQ4RTkzWEpHRUhScG1oME9PYktadlFLdkhMRGdCY0I5cUlGdFAvazh1Li9kUXNkbSIsImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTI0VDEwOjIxOjQ0LjYxN1oiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOS0yNFQxMDoyMTo0NC42MTdaIiwicm9sZSI6eyJpZCI6MSwibmFtZSI6IlJldGFpbCJ9LCJvcmdhbml6YXRpb24iOnsiaWQiOjIsIm5hbWUiOiJBc2hpc20iLCJ0eXBlIjoicmV0YWlsIiwiYWRkcmVzcyI6IkJpcmF0bmFnYXIiLCJwaG9uZSI6Ijk4NjE3ODI5NTEiLCJjcmVhdGVkX2F0IjoiMjAyNC0wOS0xNFQxMjoyMzo1NS44NTVaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDktMTRUMTI6MjM6NTUuODU1WiJ9LCJpYXQiOjE3MzI2OTUwMjIsImV4cCI6MTczMzk5MTAyMn0.JnjMZz-_iCpnPElnLKnMMl1mz8HwclOFlinfZe-N2Uk";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password, "Phonenumber:",phonenumber);
    signup();
  };
  const signup = async () => {
    console.log(name,email,password,phonenumber);
    try {
      const response = await axios("http://localhost:3000/items", {
        method: "Post",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        data: JSON.stringify({
          name: name,
        email,password,phonenumber
        }),
      });
      console.log({
        response,
      });
      if (response.status === 201) {
        // const data = await response.json();
        // console.log({ data });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333", fontFamily: "Arial" }}>
          Signup
        </h2>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="phonenumber"
            placeholder="Phonenumber"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;