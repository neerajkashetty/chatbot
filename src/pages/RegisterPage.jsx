import axios from "axios"
import { useEffect , useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {useForm} from "react-hook-form"


const RegisterPage = () => {

  const {
    register,
    handleSubmit,
  } = useForm();

 // const [products , setProducts] = useState([]);
  const navigate = useNavigate()

  const onSubmit = useCallback(async (data) => {
    try {
      const response = await axios.post('http://localhost:3002/api/signUp', {
        firstName: data.firstName,
        email: data.email,
        password: data.password,
      });

//      console.log(response.data);

      if (response.status === 200) {
        navigate('/login');
      } else {

        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
    }
  }, [navigate]);

useEffect(()=>{
  onSubmit();
}, [onSubmit]);

  
  return(
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    Create an Account
  </h2>
</div>
<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label
        htmlFor="firstName"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        First Name
      </label>
      <div className="mt-2">
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          {...register("firstName", { required: true })}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <label
        htmlFor="lastName"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Last Name
      </label>
      <div className="mt-2">
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

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
          {...register("email", { required: true })}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Password
      </label>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          {...register("password", { required: true })}
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
        Register
      </button>
    </div>
  </form>
</div>
</div>


  )


}

export default RegisterPage