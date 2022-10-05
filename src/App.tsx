import React from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";


function App() {
    const onDragEnd = () => {};
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <Droppable droppableId={"one"}>
                    {(magic) =>
                        <ul
                            ref={magic.innerRef}
                            {...magic.droppableProps}>
                            <Draggable draggableId={"first"} index={0}>
                                {(magic) =>
                                    <li
                                        ref={magic.innerRef}
                                        {...magic.draggableProps}
                                        {...magic.dragHandleProps}>One
                                    </li>
                                }
                            </Draggable>
                            <Draggable draggableId={"second"} index={1}>
                                {(magic) =>
                                    <li
                                        ref={magic.innerRef}
                                        {...magic.draggableProps}
                                        {...magic.dragHandleProps}>
                                        Two
                                    </li>
                                }
                            </Draggable>
                        </ul>
                    }
                </Droppable>
            </div>
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