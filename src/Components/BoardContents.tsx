import Board from "./Board";
import React, {memo} from "react";
import { IToDoState } from "../atoms";
import styled from "styled-components";
import {Droppable} from "react-beautiful-dnd";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

interface IBoardContentsProps {
    toDos: IToDoState;
}

function BoardContents({toDos}: IBoardContentsProps) {
    return (
        <Wrapper>
            <Droppable type={"board"} droppableId={"boards"} direction={"horizontal"}>
                {(magic) =>
                    <Boards
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {Object.keys(toDos).map((toDo, boardId) => (
                            <Board boardId={toDo} key={toDo} toDos={toDos[toDo]} index={boardId} />
                        ))}
                        {magic.placeholder}
                    </Boards>
                }
            </Droppable>
        </Wrapper>
    );
}

export default memo(BoardContents);