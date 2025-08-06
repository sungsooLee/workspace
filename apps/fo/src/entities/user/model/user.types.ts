export type UpdateVerificationsChangePasswordRequest = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

export type UpdateChangePhoneNumberRequest = {
  name: string;
  birthday: string;
  currentPhoneNumber: string;
  newPhoneNumber: string;
};
