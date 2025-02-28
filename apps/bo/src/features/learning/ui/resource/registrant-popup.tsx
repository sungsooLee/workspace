import { FC } from 'react';

const RegistrantPopupComponent: FC<any> = ({ name, employeeNumber, email, contact }) => {
  return (
    <div className={'flex flex-col gap-4'}>
      <div>
        <label htmlFor="name" className={'font-bold'}>
          이름(사번)
        </label>
        <p id={'name'} className={'text-gray-7'}>
          {name}({employeeNumber})
        </p>
      </div>
      <div>
        <label htmlFor="email" className={'font-bold'}>
          이메일 주소
        </label>
        <p id={'email'} className={'text-gray-7'}>
          {email}
        </p>
      </div>
      {contact && (
        <div>
          <label htmlFor="contact" className={'font-bold'}>
            연락처
          </label>
          <p id={'contact'} className={'text-gray-7'}>
            {contact}
          </p>
        </div>
      )}
    </div>
  );
};

export const RegistrantPopup = RegistrantPopupComponent;
