import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  height: 52px;
  width: 80%;
  margin-left: 40px;
  margin-top: 8px;
  margin-bottom: 40px;
  padding-left: 8px;
  font-size: 14px;
  outline: none;
  border-radius: 12px;
  border: 1px solid lightgray;
  &:focus {
    border: 1px solid #141415;
    box-shadow: 0px 0px 2px #141415;
  }
`;

export default function Input({ register, name, type = "text", placeholder }) {
  return (
    <StyledInput {...register(name)} type={type} placeholder={placeholder} />
  );
}
