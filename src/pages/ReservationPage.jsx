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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>예약자 성명을 입력해주세요.</label>
          <input {...register("name")} />
        </div>
        <div>
          <label>전화번호를 입력해주세요.</label>
          <input {...register("phone")} />
        </div>

        <div>
          <label>이메일을 입력해주세요.</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label>인원 수를 입력해주세요.</label>
          <input {...register("email")} />
        </div>
        <button>submit</button>
      </form>
    </>
  );
}
