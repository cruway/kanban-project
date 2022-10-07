import {DragDropContext, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {toDoState} from "./atoms";
import {useRecoilState} from "recoil";
import React from "react";
import AddBoard from "./Components/AddBoard";
import BoardContents from "./Components/BoardContents";

const Title = styled.div`
  margin: 10px;
  font-size: 20px;
  font-weight: 600;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
       const {destination, source} = info;
       if(!destination) return;
       if(source.droppableId === "boards") {
           setToDos((allBoards) => {
               const copyBoard = Object.entries(allBoards);
               const movingBoard = copyBoard[source.index];
               copyBoard.splice(source.index, 1);
               copyBoard.splice(destination.index, 0, movingBoard);
               return Object.fromEntries(copyBoard);
           });
       } else if(destination?.droppableId === source.droppableId) {
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
       } else if(destination?.droppableId !== source.droppableId) {
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
            <BoardContents toDos={toDos} />
        </DragDropContext>
    );
}

export default App;
