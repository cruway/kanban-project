import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {RecoilRoot} from "recoil";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import reset from "styled-reset";
import backgroundImage from "./img/kanban_image.png";
import {darkTheme} from "./theme";

const GlobalStyle = createGlobalStyle`
  ${reset}

  // reset css
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Source+Sans+Pro&display=swap'); // font install
  * {
    box-sizing: border-box;
  }

  body {
    font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-image: url(${backgroundImage});
    color: black;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </RecoilRoot>
);