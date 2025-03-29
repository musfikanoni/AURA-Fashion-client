import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../SocialLogin/SocialLogin';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();

    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();
    

    const {
        register,
        handleSubmit, 
        reset,
        formState: { errors },
      } = useForm()

      const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    photoURL: data.photoURL
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                    if(res.data.insertedId){
                        console.log('user added')
                        reset();
                        Swal.fire({
                            title: "Sign Up Successful",
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
                    }
                    navigate('/');
                })
                
            })
            .catch(error => console.log(error));
        })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content grid lg:grid-cols-2 grid-cols-1">

                <div className="text-center">
                        <h1 className="text-5xl font-bold">Create An Account!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>

                    
                    <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                        <div className="card-body">
                            <fieldset className="fieldset ">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Name */}
                                    <input type="name" className="input w-full" placeholder="Name"
                                    {...register("name", { required: true })} />
                                    {errors.name && <span className="text-red-600">Name is required</span>}

                                    {/* Email */}
                                    <input type="email" className="input mt-3 w-full" placeholder="Email"
                                    {...register("email", { required: true })} />
                                    {errors.email && <span className="text-red-600">Email is required</span>}

                                    {/* Number */}
                                    <input type="number" className="input mt-3 w-full" placeholder="Phone Number"
                                    {...register("number", { required: true })} />
                                    {errors.number && <span className="text-red-600">Number is required</span>}

                                    {/* Photo url */}
                                    <input type="file" className="file-input mt-3 w-full"
                                    {...register("file", { required: true })} />
                                    {errors.file && <span className="text-red-600">Photo is required</span>}

                                    {/* password */}
                                    <input type="password" className="input mt-3 w-full" placeholder="Password"
                                    {...register("password", { required: true })} />
                                    <input type="confirm-password" className="input mt-3 w-full" placeholder="Re-Enter Password"
                                    {...register("confirm-password", { required: true })} />
                                    <button type='submit' className="btn btn-block mt-5">Sign Up</button>
                                    <SocialLogin></SocialLogin>
                                </form>
                            </fieldset>
                        </div>
                    </div>


                </div>
            </div>
    );
};

export default SignUp;