// React와 상태 관리를 위한 useState 가져오기
import React, { useState } from "react"; 
// Firebase 회원가입 함수 가져오기
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
// Firebase 초기화 정보 가져오기
import app from "./firebase"; 
// 스타일을 코드 안에서 작성하기 위해 styled-components 사용
import styled from "styled-components"; 
// 눈 아이콘을 위한 react-icons 가져오기
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

// 전체 화면 중앙 정렬을 위한 컨테이너 스타일
const Container = styled.div`
  /* 내부 요소를 플렉스박스로 배치 */
  display: flex; 
  /* 내부 요소를 위아래(column)로 배치 */
  flex-direction: column; 
  /* 내부 요소를 좌우 가운데 정렬 */
  align-items: center; 
  /* 내부 요소를 상하 가운데 정렬 */
  justify-content: center; 

  /* 화면 전체 높이를 차지 */
  height: 100vh; 
  /* 흰색 배경 */
  background-color: white; 
  
  /* 중앙 정렬 보장 (Flexbox와 함께 사용) */
  position: relative;
`;

// 제목 스타일 정의
const Header = styled.h1`
  font-size: 4rem; /* 큰 글씨 크기 */
  margin-bottom: 6rem; /* 아래쪽 여백 */

  // 색상을 왼쪽(#ff7f50, 주황)에서
  // 오른쪽(#32cd32, 연두색)으로 자연스럽게 변하게 함
  background: linear-gradient(90deg, #ff7f50, #1e90ff, #32cd32);
  // 그라데이션을 텍스트에만 적용하도록 설정
  -webkit-background-clip: text;
  // 텍스트를 투명하게 만들어 배경 그라데이션이 보이도록
  -webkit-text-fill-color: transparent;
`;

// 입력 필드 주변 여백과 배치 조정을 위한 컨테이너 스타일
const InputContainer = styled.div`
  /* 아이콘을 입력 필드 안에 배치하기 위해 사용 */
  position: relative; 
  width: 100%; /* 입력 필드의 넓이 설정 */
  max-width: 500px; /* 최대 너비를 500px로 제한 */
  margin: 20px 0; /* 위아래 여백 10px */
`;

// 입력 필드 스타일
const Input = styled.input`
  width: 500px;
  /* 좌우 및 상하 여백 */ 
  padding: 25px 20px; 

  /* 모서리를 둥글게 설정 */
  border-radius: 10px; 
  /* 테두리 색상 */
  border: 3px solid #ccc; 
  /* 글씨 크기 */
  font-size: 1.6rem; 
  /* 그림자 효과 추가 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); 
`;

// 눈 아이콘 스타일 정의
const EyeIcon = styled.div`
  /* 아이콘 위치를 입력 필드 안으로 */
  position: absolute; 
  top: 50%; /* 세로 중앙 배치 */
  right: 30px; /* 오른쪽에서 25px 떨어지게 */
  transform: translateY(-50%); /* 세로 정렬 보정 */
  font-size: 1.4rem;

  cursor: pointer; /* 클릭 가능 마우스 커서 */
  color: #888; /* 아이콘 색상 */
`;

// 버튼 스타일 정의
const Button = styled.button`
  width: 500px;
  /* 최대 너비를 500px로 제한 */
  max-width: 500px;
  padding: 24px; /* 버튼 높이 조정 */
  margin-top: 80px; /* 위쪽 여백 */

  background-color: #000; /* 버튼 배경 검정색 */
  color: white; /* 흰색 글씨 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 10px; /* 모서리를 둥글게 설정 */
  font-size: 1.5rem; /* 글씨 크기 */

  cursor: pointer; /* 클릭 가능 마우스 커서 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */

  &:hover {  
    /* 마우스 올렸을 때 회색 */ 
    background-color: #333; 

    // 호버 시 살짝 확대 효과
    transform: scale(1.05);
  }

  &:action {
    // 클릭 시 버튼이 살짝 작아지면서 눌리는 듯한 효과를 줌
    transform: scale(0.98);
  }
`;

// 에러 메시지 스타일
const Error = styled.p`
  color: red; /* 빨간색 텍스트 */
  margin-top: 10px; /* 위쪽 여백 */
  font-size: 20px;
  font-weight: bold;
`;

// 성공 메시지 스타일
const Success = styled.p`
  color: green; /* 녹색 텍스트 */
  margin-top: 10px; /* 위쪽 여백 */
  font-size: 1rem; /* 글씨 크기 */
`;

// 회원가입 컴포넌트
const SignupPage = () => {
  // 이름 입력 상태 저장
  const [name, setName] = useState(""); 
  // 이메일 입력 상태 저장
  const [email, setEmail] = useState(""); 
  // 비밀번호 입력 상태 저장
  const [password, setPassword] = useState(""); 
  // 비밀번호 재확인 상태 저장
  const [confirmPassword, setConfirmPassword] = useState(""); 
  // 첫 번째 비밀번호 보이기 상태
  const [showPassword1, setShowPassword1] = useState(false);
  // 두 번째 비밀번호 보이기 상태 
  const [showPassword2, setShowPassword2] = useState(false); 
  // 에러 메시지 상태 저장
  const [error, setError] = useState(""); 
  // 성공 여부 상태 저장
  const [success, setSuccess] = useState(false); 

  // Firebase 인증 객체 가져오기
  const auth = getAuth(app); 

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    // 이메일 형식의 정규식
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
    return re.test(email); // 이메일이 유효하면 true 반환
  };

  // 회원가입 버튼 클릭 시 처리 함수
  const handleSignup = async () => {
    // 에러 메시지와 성공 메시지를 초기화
    setError(""); // 에러 메시지 초기화
    setSuccess(false); // 성공 메시지 초기화

    if (!name.trim()) {
      setError("👤사용자 이름을 입력해주세요❗");
      return;
    }

    if (!validateEmail(email)) {
      setError("@ 이메일 형식에 맞지 않습니다..다시 입력해주세요😓");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다🧐"); 
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다😓"); 
      return;
    }

    try {
      // 이메일과 비밀번호로 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 생성된 사용자 정보 가져오기
      const user = userCredential.user;

      // 사용자 이름 설정
      await updateProfile(user, { displayName: name });

      console.log("회원가입 성공:", user);
      setSuccess(true); // 성공 상태 업데이트
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Header>
        Festiva SignUp
      </Header>

      {/* 에러 메시지 표시 */}
      {error && <Error>{error}</Error>} 
      {/* 성공 메시지 표시 */}
      {success && <Success>🎉축하합니다❗ 회원가입에 성공했습니다🎉</Success>} 

      <InputContainer>
        <Input
          type="text"
          placeholder="사용자 이름"
          value={name}
          // 이름 입력 변경 감지
          onChange={(e) => setName(e.target.value)} 
          autoFocus
        />
      </InputContainer>

      <InputContainer>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          // 이메일 입력 변경 감지
          onChange={(e) => setEmail(e.target.value)} 
        />
      </InputContainer>

      <InputContainer>
        {/* 첫 번째 비밀번호 입력 필드 */}
        <Input
          // 첫 번째 상태에 따라 비밀번호 보이기/숨기기 설정
          type={showPassword1 ? "text" : "password"} 
          placeholder="비밀번호" // 입력 필드 힌트
          value={password} // 입력 필드 상태 값
          // 입력 변경 시 상태 업데이트
          onChange={(e) => setPassword(e.target.value)} 
        />

        {/* 첫 번째 비밀번호의 눈 아이콘 */}
        <EyeIcon onClick={() => setShowPassword1((prev) => !prev)}> {/* 상태를 반전 */}
          {showPassword1 ? <FaEye /> : <FaEyeSlash />}
        </EyeIcon>
      </InputContainer>

      <InputContainer>
        {/* 두 번째 비밀번호 재확인 필드 */}
        <Input
          // 두 번째 상태에 따라 비밀번호 보이기/숨기기 설정
          type={showPassword2 ? "text" : "password"} 
          placeholder="비밀번호 재확인"
          value={confirmPassword} // 입력 필드 상태 값
          onChange={(e) => setConfirmPassword(e.target.value)} // 입력 변경 시 상태 업데이트
        />
        {/* 두 번째 비밀번호의 눈 아이콘 */}
        <EyeIcon onClick={() => setShowPassword2((prev) => !prev)}> {/* 상태를 반전 */}
          {showPassword2 ? <FaEye /> : <FaEyeSlash />}
        </EyeIcon>
      </InputContainer>

      <Button onClick={handleSignup}>
        회원가입
      </Button>
    </Container>
  );
};

export default SignupPage;
