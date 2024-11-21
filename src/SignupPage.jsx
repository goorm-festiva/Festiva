import React, { useState } from "react"; // React와 상태 관리를 위한 useState 훅을 가져옵니다.
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Firebase 인증 관련 함수 가져오기.
import app from "./firebase"; // Firebase 초기화 파일 import.
import styled from "styled-components"; // CSS-in-JS 라이브러리 Styled-Components를 사용.
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 눈 모양 아이콘을 위한 라이브러리 react-icons 사용.

// 페이지 전체를 감싸는 컨테이너 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

// 제목(헤더) 스타일 정의
const Header = styled.h1`
  font-size: 4rem;
  color: #0071ce;
  margin-bottom: 2rem;
`;

// 입력 필드와 아이콘을 감싸는 컨테이너 스타일 정의
const InputContainer = styled.div`
  position: relative; /* 내부 아이콘 위치 조정용 */
  width: 400px;
  margin: 10px 0;
`;

// 일반 입력 필드 스타일 정의
const Input = styled.input`
  width: 100%;
  padding: 15px;
  padding-right: 40px; /* 아이콘 자리 확보 */
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
`;

// 눈 아이콘 스타일 정의
const EyeIcon = styled.div`
  position: absolute; /* 입력 필드 내부 끝에 위치시키기 위해 */
  top: 50%; /* 세로 가운데 정렬 */
  right: 10px; /* 오른쪽 여백 */
  transform: translateY(-50%); /* 세로 가운데 위치 조정 */
  cursor: pointer; /* 클릭 가능하게 설정 */
  color: #888;
`;

// 버튼 스타일 정의
const Button = styled.button`
  width: 420px;
  padding: 15px;
  margin-top: 20px;
  background-color: #0071ce; /* 파란색 */
  color: white; /* 흰색 글씨 */
  border: none;
  border-radius: 5px; /* 둥근 모서리 */
  font-size: 1.2rem;
  cursor: pointer; /* 클릭 가능 마우스 커서 */
  &:hover {
    background-color: #005bb5; /* 호버 시 더 짙은 파란색 */
  }
`;

// 에러 메시지 스타일 정의
const Error = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 1rem;
`;

// 성공 메시지 스타일 정의
const Success = styled.p`
  color: green;
  margin-top: 10px;
  font-size: 1rem;
`;

// 회원가입 페이지 컴포넌트 정의
const SignupPage = () => {
  const [name, setName] = useState(""); // 사용자 이름 상태
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 재확인 상태
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기/숨기기 상태
  const [error, setError] = useState(""); // 에러 메시지 상태
  const [success, setSuccess] = useState(false); // 성공 여부 상태

  const auth = getAuth(app); // Firebase 인증 객체를 생성.

  // 이메일 형식 검증 함수
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 이메일 패턴 정규식
    return re.test(email); // 이메일이 정규식에 맞으면 true, 아니면 false 반환
  };

  // 회원가입 처리 함수
  const handleSignup = async () => {
    if (!name.trim()) {
      // 이름이 비어 있으면 에러 메시지 표시
      setError("사용자 이름을 입력해주세요.");
      setSuccess(false); // 성공 상태 초기화
      return; // 함수 종료
    }

    if (!validateEmail(email)) {
      // 이메일 형식이 잘못되면 에러 메시지 표시
      setError("올바른 이메일 형식이 아닙니다.");
      setSuccess(false); // 성공 상태 초기화
      return; // 함수 종료
    }

    if (password.length < 8) {
      // 비밀번호가 8자 미만이면 에러 메시지 표시
      setError("비밀번호는 8자 이상이어야 합니다.");
      setSuccess(false); // 성공 상태 초기화
      return; // 함수 종료
    }

    if (password !== confirmPassword) {
      // 비밀번호와 재확인이 다르면 에러 메시지 표시
      setError("비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
      setSuccess(false); // 성공 상태 초기화
      return; // 함수 종료
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password); // Firebase로 회원가입 요청
      setSuccess(true); // 성공 상태 업데이트
      setError(""); // 에러 메시지 초기화
    } catch (err) {
      console.error(err.message); // 에러 로그 출력
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요."); // 에러 메시지 표시
      setSuccess(false); // 성공 상태 초기화
    }
  };

  return (
    <Container>
      <Header>회원가입</Header>
      {error && <Error>{error}</Error>} {/* 에러 메시지 표시 */}
      {success && <Success>회원가입에 성공했습니다!</Success>} {/* 성공 메시지 표시 */}

      <Input
        type="text" // 사용자 이름 입력 필드
        placeholder="사용자 이름"
        value={name} // 상태 값 연결
        onChange={(e) => setName(e.target.value)} // 입력 값 업데이트
      />

      <Input
        type="email" // 이메일 입력 필드
        placeholder="이메일"
        value={email} // 상태 값 연결
        onChange={(e) => setEmail(e.target.value)} // 입력 값 업데이트
      />

      <InputContainer>
        <Input
          type={showPassword ? "text" : "password"} // 비밀번호 입력 필드 (보이기/숨기기)
          placeholder="비밀번호"
          value={password} // 상태 값 연결
          onChange={(e) => setPassword(e.target.value)} // 입력 값 업데이트
        />
        <EyeIcon onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEye /> : <FaEyeSlash />} {/* 눈 아이콘 */}
        </EyeIcon>
      </InputContainer>

      <InputContainer>
        <Input
          type={showPassword ? "text" : "password"} // 비밀번호 재확인 입력 필드
          placeholder="비밀번호 재확인"
          value={confirmPassword} // 상태 값 연결
          onChange={(e) => setConfirmPassword(e.target.value)} // 입력 값 업데이트
        />
        <EyeIcon onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEye /> : <FaEyeSlash />} {/* 눈 아이콘 */}
        </EyeIcon>
      </InputContainer>

      <Button onClick={handleSignup}>회원가입</Button> {/* 회원가입 버튼 */}
    </Container>
  );
};

export default SignupPage;
