import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProviders';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../SocialLogin/SocialLogin';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const userImage_hosting_key = import.meta.env.VITE_USERIMAGE_KEY;
const userImage_hosting_api = `https://api.imgbb.com/1/upload?key=${userImage_hosting_key}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();
    

    const {
        register,
        handleSubmit, 
        reset,
        formState: { errors },
      } = useForm()

      

      const onSubmit = async(data) => {
        console.log(data)
        if (data.password !== data['confirm-password']) {
            Swal.fire({
                title: "Passwords do not match",
                icon: "error"
            });
            return;
        }

        const imageFile = {image: data.file[0]}
        const res = await axiosPublic.post(userImage_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data);
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            const imageURL = res.data.data.display_url;
            const currentDateTime = new Date().toUTCString();
            console.log(loggedUser);
            updateUserProfile(data.name, data.number, imageURL)
            .then(() => {
                const userInfo = {
                    name: data?.name,
                    email: data.email,
                    number: data.number,
                    created_at: currentDateTime,
                    photoURL: imageURL
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
                                    <input type="text" className="input w-full" placeholder="Name"
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
                                    <input type={showPassword? 'text' : 'password'} className="input mt-3 w-full"
                                     placeholder="Password" 
                                     {...register("password", { required: true,
                                        minLength: 6, 
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z])/ })} />
                                    {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                    {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                                    {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less 20 characters</span>}
                                    {errors.password?.type === 'pattern' && <span className="text-red-600">Password must one uppercase, one lowercase, one number, one special character</span>}
                                    <button className="btn absolute bg-transparent border-none right-6 top-[250px] z-10"
                                    onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <FaEye className="text-lg text-gray-500" />
                                             :<FaEyeSlash className="text-lg text-gray-500" /> 
                                        }
                                        
                                    </button>

                                    <input type="password" className="input mt-3 w-full" placeholder="Re-Enter Password"
                                    {...register("confirm-password", { required: true })} />
                                    {errors.name && <span className="text-red-600">Re-Enter Password is required</span>}
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