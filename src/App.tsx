import React from 'react';
import {useRecoilState} from "recoil";
import {minutesState} from "./atoms";

function App() {
    const [minutes, setMinutes] = useRecoilState(minutesState);
    const onMinutesChange = (event:React.FormEvent<HTMLInputElement>) => {
      setMinutes(+event.currentTarget.value);
    };
    return (
        <div>
          <input
              value={minutes}
              onChange={onMinutesChange}
              type={"number"}
              placeholder={"Minutes"}
          />
          <input type={"number"} placeholder={"Hours"} />
        </div>
    );
}

export default App;
