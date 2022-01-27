import styled from 'styled-components';

import useCalculator from '../contexts/useCalculator';

const Display = styled.div`
  color: white;
  background: #1c191c;
  line-height: 130px;
  font-size: 6em;
  flex: 1;
`;

const Text = styled.div`
  padding: 0 30px;
  overflow: auto;
`;

const Screen: React.FC = () => {
  const { state } = useCalculator();
  return (
    <Display>
      <Text>{state.displayValue || state.prevValue || '0'}</Text>
    </Display>
  );
};

export default Screen;
