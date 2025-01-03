import styled from 'tailwind';

const StyledEditor = styled.div`
  color: pink;
`;

export function Editor() {
  return (
    <StyledEditor>
      <h1>Welcome to Editor!</h1>
    </StyledEditor>
  );
}

export default Editor;
