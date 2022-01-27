import { Operator } from '../constants/Operator';
import { applyOperation } from '../utils/calculate';

export interface TCalculatorState {
  operation?: Operator;
  prevValue?: string;
  displayValue?: string;
  fromEqual?: boolean;
}

export const initialState: TCalculatorState = {};

const CalculatorActionLabel = '[CalculatorActionLabel]';

export const CalculatorAction = {
  SET_OPERATOR: 'SET_OPERATOR',
  INPUT_DIGIT: 'INPUT_DIGIT',
  NEGATE: 'NEGATE',
  PERCENT: 'PERCENT',
  GET_OUTPUT: 'GET_OUTPUT',
  CLEAR: 'CLEAR',
  ALL_CLEAR: 'ALL_CLEAR',
};

Object.keys(CalculatorAction).forEach((k) => {
  const key = k as keyof typeof CalculatorAction;
  CalculatorAction[key] = `${CalculatorActionLabel} ${CalculatorAction[key]}`;
});

export type TCalculatorActions =
  | TSetOperatorAction
  | TInputDigitAction
  | TNegateAction
  | TPercentAction
  | TGetOutputAction
  | TClearAction
  | TAllClearAction;

interface TSetOperatorAction {
  type: typeof CalculatorAction.SET_OPERATOR;
  payload: Operator;
}

interface TInputDigitAction {
  type: typeof CalculatorAction.INPUT_DIGIT;
  payload: string;
}

interface TNegateAction {
  type: typeof CalculatorAction.NEGATE;
}

interface TPercentAction {
  type: typeof CalculatorAction.PERCENT;
}

interface TGetOutputAction {
  type: typeof CalculatorAction.GET_OUTPUT;
}

interface TClearAction {
  type: typeof CalculatorAction.CLEAR;
}

interface TAllClearAction {
  type: typeof CalculatorAction.ALL_CLEAR;
}

const CalculatorReducer = (state: TCalculatorState, action: TCalculatorActions): TCalculatorState => {
  switch (action.type) {
    case CalculatorAction.SET_OPERATOR: {
      const reducerAction = action as TSetOperatorAction;
      const operation = reducerAction.payload;
      return {
        operation,
        prevValue: state.displayValue,
      };
    }
    case CalculatorAction.NEGATE: {
      if (!state.displayValue) return state;
      const newValue = String(Number(state.displayValue) * -1);
      return {
        ...state,
        displayValue: newValue,
        fromEqual: false,
      };
    }
    case CalculatorAction.PERCENT: {
      if (!state.displayValue) return state;
      const newValue = String(Number(state.displayValue) * 0.01);
      return {
        ...state,
        displayValue: newValue,
        fromEqual: false,
      };
    }
    case CalculatorAction.INPUT_DIGIT: {
      const { payload } = action as TInputDigitAction;
      let newValue = !!state.fromEqual || !state.displayValue ? '0' : state.displayValue;
      if (newValue === '0' && payload !== '.') {
        newValue = payload;
      } else if (payload !== '.') {
        newValue = `${newValue}${payload}`;
      } else if (!/\./.test(newValue)) {
        newValue = `${newValue}.`;
      }

      return {
        ...state,
        displayValue: newValue,
        fromEqual: false,
      };
    }
    case CalculatorAction.ALL_CLEAR:
      return {};
    case CalculatorAction.CLEAR:
      return {
        prevValue: state.prevValue,
        displayValue: '0',
      };
    case CalculatorAction.GET_OUTPUT: {
      if (!state.operation) {
        return state;
      }
      const aValue = Number(state.prevValue || state.displayValue);
      const bValue = Number(state.displayValue || state.prevValue);
      const newValue = String(applyOperation(state.operation, aValue, bValue));
      return {
        ...state,
        displayValue: newValue,
        fromEqual: true,
      };
    }
    default:
      return state;
  }
};

export default CalculatorReducer;
