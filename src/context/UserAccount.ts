import { AccountInfo } from '@azure/msal-browser';
import {createContext} from 'react';

const UserAccount = createContext<AccountInfo | null>(null);

export default UserAccount;
