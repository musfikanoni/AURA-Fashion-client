import React from 'react';
import { useForm } from "react-hook-form"

const SignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = data => {
        console.log(data)}

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
                                </form>
                            </fieldset>
                        </div>
                    </div>


                </div>
            </div>
    );
};

export default SignUp;