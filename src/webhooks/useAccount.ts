import UserAccount from '@context/UserAccount';
import { useContext } from 'react';

const useAccount = () => {
  const account = useContext(UserAccount);
  if (account === null) {
    throw new Error('useAccount must be used within a UserAccount.Provider');
  }
  return account;
}

export default useAccount;
