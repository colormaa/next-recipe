import React from 'react'
import Sidebar from '../../components/Admin/Sidebar';

const Admin = () => {
  return (
    <div>
   
    <div className="pt-12 lg:flex">
      {/* sidebar */}
      <Sidebar/>
      <div className="w-full h-full p-4 m-8 overflow-y-auto">
        <div className="flex items-center justify-center p-16 mr-8 border-4 border-dotted lg:p-40">
          Content...
        </div>
      </div>
      </div>
    </div>
  )
}

export default Admin;