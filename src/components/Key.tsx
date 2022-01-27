import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface TKeyProps {
  className?: string;
  onPress: MouseEventHandler<HTMLButtonElement>;
}

const CalculatorKey = styled.button`
  width: 80px;
  height: 80px;
  border-top: 1px solid #777;
  border-right: 1px solid #666;
  text-align: center;
  line-height: 80px;
`;

const Key: React.FC<TKeyProps> = ({ onPress, className, children }): JSX.Element => {
  return (
    <CalculatorKey type="button" onClick={onPress} className={className}>
      {children}
    </CalculatorKey>
  );
};

export default Key;
