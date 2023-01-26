import styled from "styled-components";

const ErrorBox = styled.div`
  background-color: #fed7d7;
  display: flex;
  width: 100%;
  gap: 0.5rem;
  padding-block: 0.3rem;
  padding-inline: 0.5rem;
  border-radius: 6px;
  word-break: break-all;
  p {
    word-break: break-all;
  }
  svg {
    color: #e53e3e;
  }
`;

interface InputErrorProps {
  message: string;
  isChecked?: boolean;
}

export default function InputError({ message, isChecked = false }: InputErrorProps) {
  return (
    <ErrorBox>
      {/* <MdError size={24} /> */}
      <p>{message}</p>
    </ErrorBox>
  );
}
