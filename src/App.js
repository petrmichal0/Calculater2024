import { useReducer } from "react";

import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: "",
  overwrite: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "add-digit":
      if (state.overwrite)
        return {
          ...state,
          currentOperand: action.payload,
          overwrite: false,
        };
      if (action.payload === "0" && state.currentOperand === "0") return state;
      if (action.payload !== "0" && state.currentOperand === "0")
        return {
          ...state,
          currentOperand: action.payload,
        };
      if (action.payload === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: state.currentOperand + action.payload,
      };
    case "choose-operation":
      if (state.currentOperand === "" && state.previousOperand === "") {
        return state;
      }

      if (state.currentOperand === "")
        return {
          ...state,
          operation: action.payload,
        };

      if (state.previousOperand === "") {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: "",
        operation: action.payload,
      };

    case "clear":
      return { ...initialState };
    case "delete-digit":
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: "",
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case "evaluate":
      if (
        state.operation === "" ||
        state.currentOperand === "" ||
        state.previousOperand === ""
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: "",
        operation: "",
        currentOperand: evaluate(state),
      };
    default:
      console.log("");
  }
}

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  let computation;

  if (operation === "+") {
    computation = prev + current;
    return computation;
  }

  if (operation === "-") {
    computation = prev - current;
    return computation;
  }

  if (operation === "*") {
    computation = prev * current;
    return computation;
  }

  if (operation === "/") {
    computation = prev / current;
    return computation;
  }

  return computation.toString();
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="calculater-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: "clear" })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: "delete-digit" })}>DEL</button>
      <OperationButton operation={"/"} dispatch={dispatch} />
      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />
      <OperationButton operation={"*"} dispatch={dispatch} />
      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />
      <OperationButton operation={"+"} dispatch={dispatch} />
      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />
      <OperationButton operation={"-"} dispatch={dispatch} />
      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: "evaluate" })}
      >
        =
      </button>
    </div>
  );
}

export default App;
