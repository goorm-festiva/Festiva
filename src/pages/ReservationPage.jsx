import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Nav from "../components/Nav";

export default function ReservationPage() {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Nav />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Label>예약자 성명을 입력해주세요.</Label>
          <Input placeholder="festiva@email.com" {...register("name")} />
        </FormContainer>
        <FormContainer>
          <Label>전화번호를 입력해주세요.</Label>
          <Input placeholder="010-0000-0000" {...register("phone")} />
        </FormContainer>
        <FormContainer>
          <Label>이메일을 입력해주세요.</Label>
          <Input
            type="email"
            placeholder="festiva@email.com"
            {...register("email")}
          />
        </FormContainer>
        <FormContainer>
          <Label>인원 수를 입력해주세요.</Label>
          <Input {...register("cnt")} />
        </FormContainer>
        <Btn>예약하기</Btn>
      </Form>
    </>
  );
}

const Form = styled.div`
  margin-left: 4%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  margin-left: 32px;
`;

const Input = styled.input`
  height: 52px;
  width: 40%;
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
  }
`;

const Btn = styled.button`
  margin-top: 28px;
  margin-left: 40px;
  width: 40%;
  height: 52px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  background-color: #000000;
`;
