import { Link} from 'react-router-dom';
import { useCallback } from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { usernameState } from '../atoms/user';

const LoginPage = () => {
  const {
    register, 
    handleSubmit
  } = useForm();

  const [username,setUserName] = useRecoilState(usernameState)
  
  const onSubmit = useCallback(async (data) => {
    try {
      if (data && data.email && data.password) {
        const response = await axios.post('http://localhost:3002/api/Login', {
          email: data.email,
          password: data.password,
        });
        console.log(response)
  
        if (response.status === 200) {
          localStorage.clear()
          localStorage.setItem("token", JSON.stringify(response.data.data.authtoken))
          console.log(response.data.data.username)
          setUserName({
            isAuthenticated: true,
            user :localStorage.setItem('username', response.data.data.username)})
          console.log(username)
          window.location = '/home'
        } else {
          console.error('Login issues', response.statusText);
        }

        console.log(response);
      } else {
        console.error('Invalid form data:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  },
   // eslint-disable-next-line react-hooks/exhaustive-deps
  [setUserName]);




  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {required: true}) }
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <p
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password',{required:true})}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div> 
    <button
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign in
    </button>
            </div>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
        <p className="font-semibold text-gray-700">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </p>
      </div>
      </div>
  </>
  );
}

export default LoginPage;



