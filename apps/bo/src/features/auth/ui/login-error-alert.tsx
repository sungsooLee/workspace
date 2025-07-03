import { ReactElement } from 'react';

type Prpos = {
  message: string;
  subMessage?: string | ReactElement;
};
const LoginErrorAlertComponent = ({ message, subMessage }: Prpos) => {
  return (
    <div>
      {message}
      {subMessage && <div className="time">{subMessage}</div>}
    </div>
  );
};

export const LoginErrorAlert = LoginErrorAlertComponent;
