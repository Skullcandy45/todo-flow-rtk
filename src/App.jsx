import TodoApp from "./Components/TodoApp";
import { Provider } from "react-redux";
import Store from "./Store/Store";
const App = () => {
  return (
    <Provider store={Store}>
      <TodoApp />
    </Provider>
  );
};

export default App;
