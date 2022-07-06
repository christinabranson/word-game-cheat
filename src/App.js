import Game from "./components/Game";
import CheatProvider from "./components/cheatContext/context";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <CheatProvider>
        <Game />
      </CheatProvider>
    </div>
  );
}

export default App;
