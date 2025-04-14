import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { DeleteOutlined } from '@ant-design/icons';
import { FaUser } from "react-icons/fa6";
import Swal from 'sweetalert2';



const Users = () => {

    const axiosSecure = useAxiosSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: `${user.name} is an Admin Now!`,
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
                refetch();
            }
        })
    }

    const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: " You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: " Yes, delete it!"
        }).then((result) => {
            if(result.isConfirmed){
                axiosSecure.delete(`/users/${user._id}`)
                .then(res => {
                    if(res.data.deleteCount > 0) {
                        
                        Swal.fire({
                            title: "Deleted!",
                            text: `Your user ${user.name} has been deleted.`,
                            icon: "success"
                        })
                    }
                    refetch();
                })

            }
        })
    }

    return (
        <div>
            All Users: {users.length}
            <div className="overflow-x-auto rounded-box border border-base-content/5 ">
                <table className="table">
                    {/* head */}
                    <thead className='bg-emerald-300'>
                    <tr>
                        <th>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Profile</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, idx) =>
                        <tr key={user._id}>
                            <td>{idx+1}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.number}</td>
                            <td>
                                <div className="avatar">
                                    <div className="w-14 rounded-full">
                                        <img src={user?.photoURL} alt="" />
                                    </div>
                                </div> 
                            </td>
                            <th>
                                { user.role === 'admin' ? 'Admin' :
                                <button className='text-emerald-400'
                                onClick={() => handleMakeAdmin(user)}>
                                <FaUser className='text-2xl' />
                                </button>
                                }
                            </th>
                            <th>
                                <button className='text-red-500'
                                onClick={() => handleDelete(user)}>
                                    <DeleteOutlined className='text-2xl' />
                                </button>
                            </th>
                        </tr>
                     )
                    }
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;