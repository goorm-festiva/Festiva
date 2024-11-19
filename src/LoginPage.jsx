import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase"; // Firebase 초기화 파일 import
import analytics from "./firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Firebase 인증 객체 가져오기
  const auth = getAuth(analytics); // Firebase 초기화 후 인증 객체 가져오기

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in user:", userCredential.user);
      setSuccess(true);
      setError("");
    } catch (err) {
      console.error(err.message);
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>로그인 성공!</p>}
    </div>
  );
};

export default LoginPage;
