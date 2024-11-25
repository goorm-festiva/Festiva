// React와 상태 관리 도구 useState import
import React, { useState } from "react";
// Firebase 인증 함수 import
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase"; // Firebase 초기화 파일 import
// Styled-Components import , 설치 : npm install styled-components
import styled from "styled-components";
// import analytics from "./firebase";

// Styled-Components로 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
  font-size: 4rem;
  color: #333;
  margin-bottom: 2em;
`;

const Input = styled.input`
  width: 500px;
  padding: 25px;
  margin: 15px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1.5rem;
`;

const Button = styled.button`
  width: 550px;
  padding: 20px;
  margin-top: 50px;
  background-color: #0071ce;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Success = styled.p`
  color: green;
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
`;

// 로그인 페이지 컴포넌트
const LoginPage = () => {
  // 이메일 입력값을 저장할 상태
  const [email, setEmail] = useState("");
  // 비밀번호 입력값을 저장할 상태
  const [password, setPassword] = useState("");
  // 에러 메시지를 저장할 상태
  const [error, setError] = useState("");
  // 로그인 성공 여부를 저장할 상태
  const [success, setSuccess] = useState(false);

  // Firebase 인증 객체 생성
  const auth = getAuth(app);

  // 이메일 형식 검증 함수
  const validateEmail = (email) => {
    // 정규식 표현 이메일 주소의 형식을 검증하기 위한 패턴
    // 이메일의 사용자 이름, @, 도메인 이름, 점(.), 도메인 확장자를 정확히 검사
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("@ 이메일 형식에 맞지 않습니다..다시 입력해주세요😓");
      setSuccess(false);
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다🧐");
      setSuccess(false);
      return;
    }

    try {
      // Firebase를 통해 이메일과 비밀번호로 로그인 요청
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 성공적으로 로그인된 사용자 출력
      console.log("Logged in user:", userCredential.user);
      // 로그인 성공 상태로 업데이트
      setSuccess(true);
      // 에러 메시지 초기화
      setError("");
    } catch (err) {
      // 에러 메시지 콘솔에 출력
      console.error(err.message);
      // 사용자에게 에러 메시지 표시
      setError("이메일 또는 비밀번호가 올바르지 않습니다💥");
      // 로그인 성공 상태 초기화
      setSuccess(false);
    }
  };

  // // 로그인 버튼 클릭 시 실행되는 함수
  // const handleLogin = async () => {
  //   try {
  //     // Firebase를 통해 이메일과 비밀번호로 로그인 요청
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     // 성공적으로 로그인된 사용자 출력
  //     console.log("Logged in user:", userCredential.user);
  //     // 로그인 성공 상태로 업데이트
  //     setSuccess(true);
  //     // 에러 메시지 초기화
  //     setError("");
  //   } catch (err) {
  //     // 에러 메시지 콘솔에 출력
  //     console.error(err.message);
  //     // 사용자에게 에러 메시지 표시
  //     setError("이메일 또는 비밀번호가 올바르지 않습니다..😥");
  //     // 로그인 성공 상태 초기화
  //     setSuccess(false);
  //   }
  // };

  return (
    <Container>
      <Header>COEX LOGIN</Header>

      {error && <Error>{error}</Error>}
      {success && <Success>로그인 성공🥳</Success>}

      <Input
        type="email"
        placeholder="이메일을 입력하세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      <Input
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin}>로그인</Button>
    </Container>
    // <div>
    //   <h1 style={StyleSheet.container}>Login</h1>

    //   <input
    //     type="email"
    //     placeholder="이메일 입력"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="비밀번호 입력"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={handleLogin}>로그인</button>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   {success && <p style={{ color: "green" }}>로그인 성공!</p>}
    // </div>
  );
};

export default LoginPage;
