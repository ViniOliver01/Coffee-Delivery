import { MdError } from "react-icons/md";
import styled from "styled-components";

const ErrorBox = styled.div`
  background-color: #fed7d7;
  display: flex;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  svg {
    color: #e53e3e;
  }
`;

interface FormErrorProps {
  message: string;
}

export default function FormError(error: FormErrorProps) {
  return (
    <ErrorBox>
      <MdError size={24} />
      <p>{error.message}</p>
    </ErrorBox>
  );
}
