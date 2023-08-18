import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
:root {
  --primary-font: "Passion One";
  --secondary-font: "Lato";
  --tertiary-font: "Oswald";

  --background-color: #333333;
  --foreground-color: #151515;
  --white-color: #ffffff;
  --blue-color: #1877f2;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

span{
  color: var(--white-color)
}

`;

export default Global;
