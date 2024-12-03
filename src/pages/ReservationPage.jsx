import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Nav from "../components/Nav";
import { useState } from "react";

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const onSubmit = (data) => {
    const rsvData = {
      ...data,
      date: selectedDate.toLocaleDateString(),
    };
    console.log("Form Data:", rsvData);
  };

  return (
    <>
      <Nav />
      <RsvContainer>
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
            <Select {...register("cnt", { required: true })}>
              <option value="">인원 수 선택</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}명
                </option>
              ))}
            </Select>
            {errors.cnt && <ErrorText>인원 수를 선택해주세요.</ErrorText>}
          </FormContainer>
          <Btn type="submit">예약하기</Btn>
        </Form>
        <CalendarWrapper>
          <Calendar date={selectedDate} onChange={handleDateChange} />
          <Label>예약 날짜</Label>
          <SelectDate>{selectedDate.toLocaleDateString()}</SelectDate>
        </CalendarWrapper>
      </RsvContainer>
    </>
  );
}

const RsvContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12%;
  margin-right: 4%;
`;

const Form = styled.form`
  margin-left: 4%;
  width: 60%;
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

const Select = styled.select`
  height: 52px;
  width: 80%;
  margin-left: 40px;
  margin-top: 8px;
  margin-bottom: 40px;
  padding-left: 8px;
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid lightgray;
  outline: none;
  background-color: #ffffff;
  appearance: none;
  &:focus {
    border: 1px solid #141415;
    box-shadow: 0px 0px 2px #141415;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 40px;
  margin-top: -30px;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectDate = styled.div`
  margin-top: 12px;
  margin-left: 32px;
  padding-left: 8px;
  width: 80%;
  height: 52px;
  border-radius: 15px;
  border: 1px solid lightgray;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  margin-top: 28px;
  margin-left: 40px;
  width: 80%;
  height: 52px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  background-color: #000000;
  cursor: pointer;
`;
