import DragabbleCard from "./DragabbleCard";
import {Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {ITodo, toDoState} from "../atoms";
import {useSetRecoilState} from "recoil";
import {FormEvent} from "react";

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
  position: relative;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const AddText = styled.input`
  border: none;
  border-radius: 5px;
  padding: 10px;
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  right: 8px;
  top: -1px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis:boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
    index: number;
}

interface IForm {
    toDo: string;
}

function Board({toDos, boardId, index}:IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onClick = (event: FormEvent<HTMLButtonElement>) => {
        setToDos((prevToDos) => {
           const copyToDos = { ...prevToDos };
           delete copyToDos[event.currentTarget.value];
           return { ...copyToDos };
        });
    };
    const onValid = ({ toDo }:IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [
                    newToDo,
                    ...allBoards[boardId],
                ]
            }
        });
        setValue("toDo", "");
    }
    return (
        <Draggable key={boardId} draggableId={boardId} index={index}>
            {(magic) =>
                <Wrapper
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    <Title>
                        <span>{boardId}</span>
                        <DeleteBtn value={boardId} onClick={onClick}>
                            ❌
                        </DeleteBtn>
                    </Title>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <AddText
                            {...register("toDo", { required: true })}
                            type={"text"}
                            placeholder={`Add task on ${boardId}`}
                        />
                    </Form>
                    <Droppable droppableId={boardId}>
                        {(magic, snapshot) => (
                            <Area
                                isDraggingOver={snapshot.isDraggingOver}
                                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {toDos.map((toDo, index) => (
                                    <DragabbleCard
                                        key={toDo.id}
                                        index={index}
                                        toDoId={toDo.id}
                                        toDoText={toDo.text}
                                        boardId={boardId}
                                    />
                                ))}
                                {magic.placeholder}
                            </Area>
                        )}
                    </Droppable>
                </Wrapper>
            }
        </Draggable>
    );
}

export default Board;