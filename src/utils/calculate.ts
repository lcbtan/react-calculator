import { Operator } from '../constants/Operator';

export const applyOperation = (operation: Operator, a: number, b: number): number => {
  switch (operation) {
    case Operator.Add:
      return a + b;
    case Operator.Subtract:
      return a - b;
    case Operator.Multiply:
      return a * b;
    case Operator.Divide:
    default:
      return a / b;
  }
};
