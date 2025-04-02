import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import siteLogo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const {user, logOutUser} = useAuth();

    const links = <>
    <li><NavLink>Home</NavLink></li>
    <li><NavLink>About Us</NavLink></li>
    <li><NavLink>Contact Us</NavLink></li>

    </>

    const handleLogOut = () => {
        logOutUser()
        .then(() => { })
        .catch(error => console.log(error));
    }

    return (
        <div className=" bg-pcolor shadow-sm">
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


                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {links}
                            </ul>
                        </div>

                        {
                            user ? <>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><button onClick={handleLogOut}>Log Out</button></li>
                            </ul>
                        </div>

                            </> : <>
                                {/* <Link to="/signup">
                                    <button className='btn'>Sign Up</button>
                                </Link> */}
                                <Link to="/login">
                                    <button className='btn'>Login</button>
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