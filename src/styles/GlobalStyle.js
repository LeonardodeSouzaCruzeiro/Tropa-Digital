import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
  }
`;

export default GlobalStyle;
