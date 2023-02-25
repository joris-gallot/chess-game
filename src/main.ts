import { Chess } from "./classes";
import "./style.css";

const chess = new Chess();
console.table(chess.board);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    hello
  </div>
`;
