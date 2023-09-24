import { TicTacToe } from "./components/TicTacToe";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      <TicTacToe size={3} />
    </div>
  );
}

export default App;
