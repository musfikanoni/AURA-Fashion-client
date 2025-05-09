import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import siteLogo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';
import { Badge } from 'antd';
import { PiShoppingCart } from "react-icons/pi";

const Navbar = () => {
    const {user, logOutUser} = useAuth();

    const links = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink>About Us</NavLink></li>
    <li><NavLink>Contact Us</NavLink></li>
    <li>
        <Link to="/">
            <Badge count={5} className=''>
                <PiShoppingCart className='text-3xl text-gray-700' />
            </Badge>
        </Link>
    </li>
    </>

    const handleLogOut = () => {
        logOutUser()
        .then(() => { })
        .catch(error => console.log(error));
    }

    return (
        <div className=" bg-emerald-500/60 sticky backdrop-blur py-1 shadow-sm">
            <div className='w-11/12 mx-auto'>
                <div className="navbar">
                    <div className="navbar-start">
                        
                        <div className="flex items-center">
                            <img src={siteLogo} className='h-10' alt="" />
                            <a className="text-4xl font-bold">AURA</a>
                        </div>
                    </div>
                    
                    <div className="navbar-end">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>


                        <div className="navbar-center hidden lg:flex mr-4">
                            <ul className="menu menu-horizontal menu__btn text-lg font- text-gray-700 px-1">
                                {links}
                            </ul>
                        
                        </div>

                        {
                            user ? <>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt=""
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                                <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                                </li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogOut}>Log Out</button></li>
                            </ul>
                        </div>

                            </> : <>
                                {/* <Link to="/signup">
                                    <button className='btn'>Sign Up</button>
                                </Link> */}
                                <Link to="/login">
                                    <button className='btn bg-teal-700 text-white border-none shadow-none
                                    text-base font-semibold'>Login</button>
                                </Link>
                            </>
                        }
                        
           
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;