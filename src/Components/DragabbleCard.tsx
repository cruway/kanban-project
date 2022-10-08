import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";
import {useSetRecoilState} from "recoil";
import {toDoState} from "../atoms";

const Card = styled.div<{isDragging: boolean}>`
  position: relative;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${props => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${props => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  top: 8px;
  right: 8px;
`;

interface IDragabbledCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

function DragCard({toDoId, toDoText, index, boardId}: IDragabbledCardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = () => {
        setToDos((allBoards) => {
            const deleteBoards = [ ...allBoards[boardId]];
            deleteBoards.splice(index, 1);
            return {
                ...allBoards,
                [boardId]: deleteBoards
            };
        });
    };
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}>
                    <div>
                        {toDoText}
                    </div>
                    <div>
                        <DeleteBtn onClick={onClick}>
                            ❌
                        </DeleteBtn>
                    </div>
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragCard);