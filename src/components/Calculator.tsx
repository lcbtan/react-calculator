/* eslint-disable react/jsx-no-constructed-context-values */
import { useReducer } from 'react';
import styled from 'styled-components';

import { CalculatorContext } from '../contexts/useCalculator';
import CalculatorReducer, { initialState } from '../reducers/CalculatorReducer';
import { Keypad } from './Keypad';
import Screen from './Screen';

const CalculatorWrapper = styled.div`
  width: 320px;
  height: 520px;
  background: black;
  display: flex;
  flex-direction: column;
`;
const Calculator: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(CalculatorReducer, initialState);
  return (
    <CalculatorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <CalculatorWrapper>
        <Screen />
        <Keypad />
      </CalculatorWrapper>
    </CalculatorContext.Provider>
  );
};

export default Calculator;
