import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  // 로그인하지 않았으면 LoginPage로 리디렉션
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 로그인했으면 자식 컴포넌트를 렌더링
  return children;
};

export default ProtectedRoute;
