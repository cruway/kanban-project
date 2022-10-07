import styled from "styled-components";
import React from "react";
import {useSetRecoilState} from "recoil";
import {toDoState} from "../atoms";
import {useForm} from "react-hook-form";

const AddBoardForm = styled.form`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const AddBoardText = styled.input`
  padding: 10px 10px;
  border-radius: 5px;
  width: 350px;
`;

interface IForm {
    [addToDos: string]: string[];
}

export default function AddBoard() {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm();
    const addBoard = ({ addBoard }: IForm) => {
        setToDos((prevToDos) => {
           const copyToDos = { ...prevToDos, [`${addBoard}`]: [] };
           return {...copyToDos};
        });
        setValue("addBoard", "");
    };
    return (
        <AddBoardForm onSubmit={handleSubmit(addBoard)}>
            <AddBoardText
                {...register(`addBoard`,{required: true})}
                type={"text"}
                placeholder={"Add Board"}
            />
        </AddBoardForm>
    );
}