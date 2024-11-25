import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AllEventNav = () => {
  return (
    <NavWrapper>
      <StyledLink to="/">Home</StyledLink>
      <Separator>&gt;</Separator>
      <StyledLink to="/AllEvent">행사 일정</StyledLink>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  padding: 10px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-right: 5px;

  &:hover {
    color: #007bff;
  }
`;

const Separator = styled.span`
  margin: 0 5px;
  color: #666;
`;

export default AllEventNav;
