import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: "Pretendard Variable";
    font-weight: 45 920;
    font-style: normal;
    font-display: swap;
    src: url("/PretendardVariable.woff2") format("woff2-variations");
  }

  @font-face {
    font-family: "BlackHansSans-Regular";
    src: url("/BlackHanSans-Regular.ttf");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: "Pretendard Variable";
  }
`;

export default GlobalStyles;
