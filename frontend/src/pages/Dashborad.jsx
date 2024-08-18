import React from 'react'

import {motion} from "framer-motion"
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const Dashborad = () => {

  const { user, logout } = useAuthStore();


  const handleLogout = () => {
		logout();
	};

  return (
<motion.div

initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
exit={{opacity:0,scale:0.9}}
transition={{duration:0.5}}
className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'


>

  <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
    Dashboard
  </h2>

  <div className="space-y-6">
    <motion.div

    className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700
    '
    initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
    </motion.div>
  </div>





</motion.div>
  )
}

export default Dashborad