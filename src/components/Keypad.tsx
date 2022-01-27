/* eslint-disable no-console */
import styled from 'styled-components';

import { Operator } from '../constants/Operator';
import useCalculator from '../contexts/useCalculator';
import { CalculatorAction } from '../reducers/CalculatorReducer';
import Key from './Key';

const Body = styled.div`
  height: 400px;
  display: flex;
`;

const InputKeys = styled.div`
  min-width: 240px;
`;

const FunctionKeys = styled.div`
  background: linear-gradient(to bottom, rgba(202, 202, 204, 1) 0%, rgba(196, 194, 204, 1) 100%);
  font-size: 2em;
`;

const DigitKeys = styled.div`
  background: #e0e0e7;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  font-size: 2.25em;
`;

const OperatorKeys = styled.div`
  background: linear-gradient(to bottom, rgba(252, 156, 23, 1) 0%, rgba(247, 126, 27, 1) 100%);
  > button {
    color: white;
    border-right: 0;
    font-size: 3em;
    background: none;
  }
`;

const DigitZeroKey = styled(Key)`
  width: 160px;
`;

export const Keypad = (): JSX.Element => {
  const { state, dispatch } = useCalculator();
  // Digit Section
  const inputDigit = (digit: string) => () => {
    dispatch({
      type: CalculatorAction.INPUT_DIGIT,
      payload: digit,
    });
  };

  // Clear Section
  const clearFunction = (): void => {
    dispatch({ type: CalculatorAction.CLEAR });
  };
  const clearAllFunction = (): void => {
    dispatch({ type: CalculatorAction.ALL_CLEAR });
  };

  const clearValue = state.displayValue === '0' ? 'AC' : 'C';
  const clearFcn = state.displayValue === '0' ? clearAllFunction : clearFunction;

  // Function Section
  const negateValue = (): void => {
    dispatch({
      type: CalculatorAction.NEGATE,
    });
  };

  const convertToPercentValue = (): void => {
    dispatch({
      type: CalculatorAction.PERCENT,
    });
  };

  // Operator Keys
  const inputOperator = (operator: Operator) => (): void => {
    dispatch({
      type: CalculatorAction.SET_OPERATOR,
      payload: operator,
    });
  };

  const getOperationValue = (): void => {
    dispatch({
      type: CalculatorAction.GET_OUTPUT,
    });
  };

  return (
    <Body>
      <InputKeys>
        <FunctionKeys>
          <Key onPress={clearFcn}>{clearValue}</Key>
          <Key onPress={negateValue}>±</Key>
          <Key onPress={convertToPercentValue}>%</Key>
        </FunctionKeys>
        <DigitKeys>
          <DigitZeroKey onPress={inputDigit('0')}>0</DigitZeroKey>
          <Key onPress={inputDigit('.')}>●</Key>
          <Key onPress={inputDigit('1')}>1</Key>
          <Key onPress={inputDigit('2')}>2</Key>
          <Key onPress={inputDigit('3')}>3</Key>
          <Key onPress={inputDigit('4')}>4</Key>
          <Key onPress={inputDigit('5')}>5</Key>
          <Key onPress={inputDigit('6')}>6</Key>
          <Key onPress={inputDigit('7')}>7</Key>
          <Key onPress={inputDigit('8')}>8</Key>
          <Key onPress={inputDigit('9')}>9</Key>
        </DigitKeys>
      </InputKeys>
      <OperatorKeys>
        <Key onPress={inputOperator(Operator.Add)}>+</Key>
        <Key onPress={inputOperator(Operator.Subtract)}>-</Key>
        <Key onPress={inputOperator(Operator.Multiply)}>*</Key>
        <Key onPress={inputOperator(Operator.Divide)}>/</Key>
        <Key onPress={getOperationValue}>=</Key>
      </OperatorKeys>
    </Body>
  );
};
