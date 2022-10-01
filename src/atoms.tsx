import { atom, selector } from "recoil";

export const minutesState = atom({
   key: "minutes",
   default: 0,
});