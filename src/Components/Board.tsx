import DragabbleCard from "./DragabbleCard";
import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const AddText = styled.input`
  border-radius: 5px;
  padding: 10px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

function Board() {
    return (
        <Wrapper>

        </Wrapper>
    );
}

export default Board;