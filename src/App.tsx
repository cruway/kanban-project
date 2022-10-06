import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {toDoState} from "./atoms";

const AddToDos = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const AddToDoText = styled.input`
  padding: 10px 10px;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 30px 10px;
  background-color: ${props => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${props => props.theme.cardColor};    
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = () => {
        console.log("draggin finish");
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <AddToDos>
                <AddToDoText type={"text"} placeholder={"input toDo"}/>
            </AddToDos>
            <Wrapper>
                <Boards>
                    <Droppable droppableId={"one"}>
                        {(magic) =>
                            <Board
                                ref={magic.innerRef}
                                {...magic.droppableProps}>
                                {toDos.map((todo, index) => (
                                    <Draggable key={index} draggableId={todo} index={index}>
                                    {(magic) =>
                                        <Card
                                            ref={magic.innerRef}
                                            {...magic.draggableProps}
                                            {...magic.dragHandleProps}
                                        >
                                            {todo}
                                        </Card>
                                    }
                                </Draggable>
                                ))}
                                {magic.placeholder}
                            </Board>
                        }
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;

/**
 * onDragEnd関数: ユーザがドラック終わった時点で呼ぶ関数のこと
 * Droppable: この領域を使いためには子供属性のタグが必要
 *   - react要素じゃないとエラーが発生する
 *   - Droppableの領域の中でdraggableを宣言する。
 */