import Axios from 'axios';

import { IAuthUserInfo } from './types/AuthUserInfo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Auth(userId: string, password: string): Promise<IAuthUserInfo> {
  return Axios.post('/auth/login', {
    userId  : userId,
    password: password
  }).then(res => {
    return { jwtToken: res.data.token, isAuth: true };
  });
}
