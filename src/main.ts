import { Chess } from "./classes";
import "./style.css";

const chess = new Chess();
console.table(chess.getPosition({ x: 1, y: 4 }));

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    hello
  </div>
`;
