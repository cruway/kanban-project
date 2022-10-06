import {DragDropContext, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {toDoState} from "./atoms";
import {useRecoilState} from "recoil";
import Board from "./Components/Board";
import React from "react";
import AddBoard from "./Components/AddBoard";

const Title = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
       const {destination, source} = info;
       if(!destination) return;
       if(destination?.droppableId === source.droppableId) {
           // same board movement.
           setToDos(allBoards => {
               const boardCopy = [...allBoards[source.droppableId]];
               const taskObj = boardCopy[source.index];
               boardCopy.splice(source.index, 1);
               boardCopy.splice(destination?.index, 0, taskObj);
               return {
                   ...allBoards,
                   [source.droppableId] : boardCopy
               };
           });
       }
        if(destination?.droppableId !== source.droppableId) {
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];
                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard
                }
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Title>kuru kanban</Title>
            <AddBoard />
            <Wrapper>
                <Boards>
                    {Object.keys(toDos).map(boardId => (
                        <Board boardId={boardId} key={boardId} toDos={toDos[boardId]}/>
                    ))}
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
