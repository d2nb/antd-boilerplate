import { FC } from 'react';
import SignIn from './sign-in';
import SignUp from './sign-up';
import { useLocation } from 'react-router-dom';

const Auth: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-80 -mt-40">
        {pathname === '/sign-in' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Auth;
