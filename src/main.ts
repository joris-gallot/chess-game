import { setupChess } from "./chess";
import "./style.css";

const appElement = document.querySelector<HTMLDivElement>("#app")!;
setupChess(appElement);
