import { useMutation, useQuery } from '@apollo/client';
import { gql } from 'apollo-server-micro';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Sidebar from '../../components/Admin/Sidebar';
import toast, { Toaster } from 'react-hot-toast';
import SearchModal from '../../components/SearchModal';
const catsQuery=gql`
    query Query {
    categories {
        description
        name
        id
        parentId
        updatedAt
        createdAt
    }
    }
`;
const addCat = gql`
mutation Mutation($name: String!, $description: String!) {
  createCategory(name: $name, description: $description) {
    id
    name
    description
    parentId
    updatedAt
    createdAt
  }
}`;
const editCat = gql`
mutation Mutation($name: String!, $description: String!, $editCategoryId: String!) {
  editCategory(name: $name, description: $description, id: $editCategoryId) {
    id
    name
    description
    parentId
    updatedAt
    createdAt
  }
}`;
const deleteCat =gql`
mutation Mutation($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId) {
    id
    name
    description
    parentId
    updatedAt
    createdAt
  }
}`;
const Category = () => {
    const {data, loading, error} = useQuery(catsQuery);
    const [showCreateModal, setShowCreateModal]=useState(false);
    const [showEditModal, setShowEditModal]=useState(false);
    const [showDeleteModal, setShowDeleteModal]=useState(false);
    const [catEdit, setCatEdit]=useState();
    const [catDelete, setCatDelete] = useState();
    const [showCategory, setShowCategory]=useState(null);
    const [createCategory, {loading: loadingCreate, error:errorCreate}] = useMutation(addCat, {
        onCompleted:()=>onreset(), 
        refetchQueries: [
            { query: catsQuery }
          ]
    });
    const [editCategory, {loading: loadingEdit, error:errorEdit}] = useMutation(editCat, {
        onCompleted:()=>onresetedit(), 
        refetchQueries: [
            { query: catsQuery }
          ]
    });
    const [deleteCategory, {loading: loadingDelete, error:errorDelete}] = useMutation(deleteCat, {
        onCompleted:()=>onresetdelete(), 
        refetchQueries: [
            { query: catsQuery }
          ]
    });
    const onreset=()=>{
        setShowCreateModal(false)
        reset()
    }
    const onresetedit=()=>{
        setShowEditModal(false);
        resetEdit();
    }
    const onresetdelete=()=>{
        setShowEditModal(false);
        resetEdit();
    }
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues:{
            categoryname:"",
            categorydesc: ""
        }
    });
    const { register:registerEdit, handleSubmit:handleSubmitEdit, watch:watchEdit, formState: { errors:errorsEdit }, reset:resetEdit } = useForm({
        defaultValues:{
            categoryname:"",
            categorydesc: ""
        }
    });
  const onSubmit = (data:any )=>{
    console.log(data);
    const variables = {name: data.categoryname, description: data.categorydesc};
    
    try {
        toast.promise(createCategory({variables}), {
          loading: 'Creating new category..',
          success: 'Category successfully created!🎉',
          error: `${errorCreate?.message}`,
        });

  
      } catch (error) {
        console.error(error)
      }
  }
  const onSubmitEdit = (data:any )=>{
    console.log(data);
    const variables = {name: data.categoryname, description: data.categorydesc, editCategoryId:catEdit?.id};
    
    try {
        toast.promise(editCategory({variables}), {
          loading: 'Editing new category..',
          success: 'Category successfully updated!🎉',
          error: `${errorsEdit?.message}`,
        });
    
    } catch (error) {
    console.error(error)
    }
  }
  const sendDeleteRequest=()=>{
    try {
        const variables = {deleteCategoryId: catDelete?.id};
        toast.promise(deleteCategory({variables}), {
          loading: 'Deleting new category..',
          success: 'Category successfully deleted!🎉',
          error: `${errorDelete?.message}`,
        });
        setShowDeleteModal(false);
    
    } catch (error) {
        console.error(error)
    }
  }
  
  return (
    <div>

    <div className="pt-12 lg:flex">
      {/* sidebar */}
      <Sidebar/>
      <div className="w-full h-full p-4 m-8 overflow-y-auto">
        {/* <div className="flex items-center justify-center p-16 mr-8 border-4 border-dotted lg:p-40"> */}


          <div className="container max-w-6xl mx-auto mt-8">
  <div className="mb-4">
    <h1 className="font-serif text-3xl font-bold underline decoration-gray-400"> Category</h1>
    <SearchModal/>
    <div className="flex justify-end">
      {/* <button className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">Create Category</button> */}
      <button onClick={()=>{setShowCreateModal(true)}}  type="button" className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModal">
 Create Category
</button>


    </div>
  </div>
    {showCreateModal==true&&<div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center   z-50">
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 opacity-50"></div>
    <div className="modal fade mt-10 w-full h-full outline-none overflow-x-hidden overflow-y-auto md:w-[70%] lg:w-[30%]"
    id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <form onSubmit={handleSubmit(onSubmit)} className="modal-dialog relative w-auto pointer-events-none">
        <div
        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div
            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Add Category</h5>
            <button type="button"
            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body relative p-4 pb-10 flex flex-col ">
            
            <label htmlFor="">Name</label>
            <input className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" placeholder="Name" {...register("categoryname", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.categoryname && <span className='text-sm text-red-600'>This field is required</span>}
            <label htmlFor="">Description</label>
            <input className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" placeholder="Description" {...register("categorydesc", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.categorydesc && <span className='text-sm text-red-600'>This field is required</span>}

        </div>
        <div
            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button onClick={()=>{setShowCreateModal(false); reset()}} type="button" className="px-6
            py-2.5
            bg-purple-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-purple-700 hover:shadow-lg
            focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-purple-800 active:shadow-lg
            transition
            duration-150
            ease-in-out" data-bs-dismiss="modal">Close</button>
            <button disabled={loadingCreate} onClick={()=>{}} type="submit" className="px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out
        ml-1">
            {loadingCreate?<svg className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            : "Save changes"}</button>
        </div>
        </div>
    </form>
    </div>
    </div>}
    {showEditModal==true&&
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center   z-50">
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 opacity-50"></div>
    <div className="modal fade mt-10 w-full h-full outline-none overflow-x-hidden overflow-y-auto md:w-[70%] lg:w-[30%]"
    id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="modal-dialog relative w-auto pointer-events-none">
        <div
        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div
            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Edit Category</h5>
            <button type="button"
            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body relative p-4 pb-10 flex flex-col ">
            
            <label htmlFor="">Name</label>
            <input className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" placeholder="Name" {...registerEdit("categoryname", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errorsEdit.categoryname && <span className='text-sm text-red-600'>This field is required</span>}
            <label htmlFor="">Description</label>
            <input className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" placeholder="Description" {...registerEdit("categorydesc", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errorsEdit.categorydesc && <span className='text-sm text-red-600'>This field is required</span>}

        </div>
        <div
            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button onClick={()=>{setShowEditModal(false); reset()}} type="button" className="px-6
            py-2.5
            bg-purple-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-purple-700 hover:shadow-lg
            focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-purple-800 active:shadow-lg
            transition
            duration-150
            ease-in-out" data-bs-dismiss="modal">Close</button>
            <button disabled={loadingEdit} onClick={()=>{}} type="submit" className="px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out
        ml-1">
            {loadingEdit?<svg className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            : "Save changes"}</button>
        </div>
        </div>
    </form>
    </div>
    </div>}
    {(showDeleteModal==true)&&
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center   z-50">
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 opacity-50"></div>
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" onClick={()=>{setShowDeleteModal(false)}} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button onClick={()=>{
                    sendDeleteRequest()
                }} data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                </button>
                <button onClick={()=>{setShowDeleteModal(false)}} data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
    </div>}
    {showCategory!=null&&
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center   z-50">
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-800 opacity-50"></div>
    <div className="modal fade mt-10 w-full h-full outline-none overflow-x-hidden overflow-y-auto md:w-[70%] lg:w-[30%]"
    id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog relative w-auto pointer-events-none">
        <div
        className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div
            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Show Category</h5>
            <button onClick={()=>{
                setShowCategory(null)
            }} type="button"
            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body relative p-4 pb-10 flex flex-col ">
            
            <label htmlFor="">Name</label>
            <input value={showCategory?.name} disabled className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" placeholder="Name" />
            <label htmlFor="">Description</label>
            <input value={showCategory?.description} disabled className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" placeholder="Description" />
            
        </div>
        <div
            className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button onClick={()=>{ setShowCategory(null)}} type="button" className="px-6
            py-2.5
            bg-purple-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-purple-700 hover:shadow-lg
            focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
            active:bg-purple-800 active:shadow-lg
            transition
            duration-150
            ease-in-out" data-bs-dismiss="modal">Close</button>
            
        </div>
        </div>
    </div>
    </div>
    </div>}
    
  
  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
      
      {loading==false && !error &&

      (<table className="min-w-full">
          <thead>
            <tr>
              <th
                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                ID</th>
              <th
                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Name</th>
              <th
                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Description</th>
              <th
                className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Created_At</th>
              <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colSpan="3">
                Action</th>
                </tr>
          </thead>

          <tbody className="bg-white">
            {data.categories.map((cat, catid)=>(
            <tr key={catid}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                  {catid+1}
                </div>

              </td>

              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">{cat.name}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p>{cat.description}</p>
              </td>

              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                <span>{cat.updatedAt}</span>
              </td>
              <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                <div onClick={()=>{
                    setCatEdit(cat);
                    resetEdit({
                        categorydesc:cat.description,
                        categoryname:cat.name
                    })
                    setShowEditModal(true);
                    
                    }} className="text-indigo-600 hover:text-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                </td>
              <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
              <div onClick={()=>{
                    setShowCategory(cat)
                    
                    }}  className="text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>

              </td>

              
              <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200 ">
              <div onClick={()=>{
                    
                    setCatDelete(cat);
                    setShowDeleteModal(true);
                    
                    }} ><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg></div>

              </td>
            </tr>
            ))
            }
          </tbody>
        </table>)}
      </div>
    </div>
  </div>
</div>









        {/* </div> */}
      </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default Category;