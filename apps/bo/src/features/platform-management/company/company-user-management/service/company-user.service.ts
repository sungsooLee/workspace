export const getUserStatus = (user: any) => {
  if (user.isOnLeave) return 'LEAVE';
  else if (user.isSuspended) return 'SUSPENDED';
  else if (user.deletedDate === null && user.retireDate === null) return 'ACTIVE';
  return null;
};
