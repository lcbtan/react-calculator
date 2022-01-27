import { createContext, Dispatch, useContext } from 'react';

import { initialState, TCalculatorActions, TCalculatorState } from '../reducers/CalculatorReducer';

interface TCalculatorContext {
  state: TCalculatorState;
  dispatch: Dispatch<TCalculatorActions>;
}

export const CalculatorContext = createContext<TCalculatorContext>({
  state: initialState,
  dispatch: () => {},
});

const useCalculator = (): TCalculatorContext => useContext(CalculatorContext);

export default useCalculator;
