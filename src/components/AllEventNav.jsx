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
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-right: 5px;
  font-size: 0.9rem;

  &:hover {
    color: #007bff;
  }
`;

const Separator = styled.span`
  margin: 0 5px;
  color: #666;
`;

export default AllEventNav;
