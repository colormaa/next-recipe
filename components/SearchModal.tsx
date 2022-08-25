import React, { ChangeEvent, FormEvent, useState } from 'react'
const SearchModal = ({
    onSubmit=()=>{}
}) => {
    const [showSearch, setShowSearch] = useState(false);
    
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        //const { value } = document.querySelector(event.target.getAttribute("data-input"));
        console.log("value ", event.currentTarget.nodeValue)
    };
    
  return (
    <>
    <div className='border-1 h-10 w-[200px] bg-gray-100 rounded-lg  border-black flex flex-row  items-center align-middle  px-3' onClick={()=>{
        setShowSearch(true);
    }}>
        <svg width="20" height="20" className="w-4 h-5 text-gray-600" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        <div className='text-gray-600 ml-2 text-sm'>Search</div>
    </div>
    {showSearch==true&&<div className="flex justify-center  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
        <div className='fixed w-full h-full bg-gray-900 opacity-60'></div>
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div className="flex justify-between items-start rounded-t border-b dark:border-gray-600">
                <div className='flex flex-row mx-4 py-4 flex-1'>
                    <svg width="20" height="20" className="w-6 h-10 mr-2 text-gray-600 ml-2 pl-2  z-50 " viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    
                    <form className='flex-1 flex flex-row' onSubmit={handleSubmit}>
                        <input type="text"   id="id-input" className='h-10 bg-gray flex-1 pl-8 -ml-8  border-none' placeholder='Search... ' />
                        <button className='hidden' data-input="#id-input" type="submit">Submit</button>
                    </form>
                </div>

                <button  onClick={()=>{
                    setShowSearch(false);
                }} type="button" className=" m-4 mt-5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                </p>
                
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
        </div>
    </div>
    </div>}

    </>
  )
}

export default SearchModal