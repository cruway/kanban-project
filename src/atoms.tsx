import { atom } from "recoil";
import {recoilPersist} from "recoil-persist";

export interface ITodo {
   id: number;
   text: string;
}

export interface IToDoState {
   [key: string]: ITodo[];
}

// local stroge 追加
const { persistAtom } = recoilPersist({
   key: 'toDoLocal',
   storage: localStorage,
});

export const toDoState = atom<IToDoState>({
   key: "toDo",
   default: {
      "To Do": [],
      Doing: [],
      Done: [],
   },
   effects_UNSTABLE: [persistAtom]
});