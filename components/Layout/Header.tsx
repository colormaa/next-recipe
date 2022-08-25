import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    // <header className="text-gray-600 body-font">
    //   <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    //     <Link href="/">
    //       <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    //         <svg
    //           className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    //           ></path>
    //         </svg>
    //       </a>
    //     </Link>
    //     <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
    //       {/* {user ? (
    //         <div className="flex items-center space-x-5">
    //           <Link href="/favorites">
    //             <a className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //               My Favorites
    //             </a>
    //           </Link>
    //           <Link href="/api/auth/logout">
    //             <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //               Logout
    //             </a>
    //           </Link>
    //           <img
    //             alt="profile"
    //             className="rounded-full w-12 h-12"
    //             src={user.picture}
    //           />
    //         </div>
    //       ) : (
    //         <Link href="/api/auth/login">
    //           <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //             Login
    //           </a>
    //         </Link>
    //       )} */}
    //     </nav>
    //   </div>
    // </header>
    <nav className="fixed z-30 w-full bg-white border-b-2 border-indigo-600">
    <div className="px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <button className="p-2 text-gray-600 rounded cursor-pointer lg:hidden ">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="#" className="flex items-center text-xl font-bold">
            <span className="text-blue-800">Logo</span>
          </a>

        </div>
        <div className="flex items-center">
          <div className="hidden mr-6 lg:block">
            <form action="#">
              <label className="sr-only">Search</label>
              <div className="relative mt-1 lg:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
                <input type="text" name="name"
                  className=" border  text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 block w-full pl-10 p-2.5"
                  placeholder="Search"/>
              </div>
            </form>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>

          <div className="relative inline-block ">
            {/* <!-- Dropdown toggle button --> */}
            <button
              className="relative flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none">
              <span className="mx-1">Jane Doe</span>
              <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                  fill="currentColor"></path>
              </svg>
            </button>
{/* 
            <!-- Dropdown menu --> */}
            <div className="absolute right-0 z-20 w-56 mt-2 overflow-hidden bg-white rounded-md">

            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Header;