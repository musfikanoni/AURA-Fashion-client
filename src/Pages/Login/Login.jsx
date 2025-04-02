import React, { useContext } from 'react';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    // const [disabled, setDisabled] = useState(true);
    // const [showPassword, setShowPassword] = useState(false);
    const {logInUser}  = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.form?.pathname || "/";

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        logInUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
                Swal.fire({
                    title: "User Login Successful",
                    icon: "success",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  }); 
                navigate(from, {replace: true});
            }

        )
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content grid lg:grid-cols-2 grid-cols-1">

                <div className="text-center">
                        <h1 className="text-5xl font-bold">Welcome Back!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        Create an account <b className='text-teal-500'><Link to="/signup">Sign Up</Link></b>
                    </div>

                    
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset">
                                <form onSubmit={handleLogin}>
         
                  
                                <input type="email" name='email' className="input w-full" placeholder="Email" />
                            
                                <input type="password" name='password' className="input mt-4 w-full" placeholder="Password" />
                            
                                <button className="btn btn-block btn-neutral mt-4">Login</button>
                                    <SocialLogin></SocialLogin>
                                </form>
                            </fieldset>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Login;