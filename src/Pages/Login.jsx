import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/firebase.login';
import Swal from 'sweetalert2';

const Login = () => {
  const { userLogin, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Google login provider
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          icon: 'success',
          title: 'Logged in with Google!',
          showConfirmButton: false,
          timer: 2000
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then(result => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 2000
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email or Password does not match!',
        });
      });
  };

  return (
    <div className="contain py-10">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden mt-16 border-2 border-[#22d3ee]">
        <h2 className="text-2xl uppercase font-medium mb-3 text-center">Signin</h2>
        <form onSubmit={handleLogin}>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full border border-gray-300 px-4 py-3 dark:text-[#BFBBA9] text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 dark:placeholder-white"
                placeholder="youremail.@gmail.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label className="text-gray-600 mb-2 block dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-teal-500 placeholder-gray-400"
                  placeholder="***********"
                  required
                />
                <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="block w-full py-2 text-center text-white bg-gradient-to-r from-[#60a5fa] to-[#22d3ee]  rounded hover:bg-transparent hover:text-black transition uppercase font-roboto font-medium"
            >
              Login
            </button>

            <div className="text-center mt-6">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="btn btn-outline border border-[#22d3ee] hover:text-[#22d3ee]"
              >
                <div className="flex items-center gap-3 ">
                  <img
                    className="w-7"
                    src="https://cdn-icons-png.freepik.com/256/2504/2504914.png"
                    alt="Google"
                  />
                  <p className="text-xl font-semibold">Login With Google</p>
                </div>
              </button>
            </div>

            <div className="flex gap-2 pt-5">
              <p className="text-[#60a5fa] text-xl">
                Don't have an account?
              </p>
              <Link className="text-xl underline text-purple-500" to="/auth/register">
                Register here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
