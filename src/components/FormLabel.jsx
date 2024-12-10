import React from "react";
import styled from "styled-components";

const FormLabel = styled.label`
  font-size: 16px;
  font-weight: 400;
  margin-left: 32px;
`;

export default function Label({ text }) {
  return <FormLabel>{text}</FormLabel>;
}
