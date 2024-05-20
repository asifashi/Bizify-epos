import { Table } from '@mui/material';
import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Spinner } from 'flowbite-react';

const Customerview = ({customerId,setView,setEdit,setcustId}) => {
    const [customers,setCustomers] = useState();
    const [loading, setLoading] = useState(true);
    console.log(customerId)
    useEffect(() => {
        fetchCustomers();
      }, [customerId]);
    
      const fetchCustomers = () => {
        setLoading(true)
        customerId=customerId
        axios.get(`http://localhost:8081/api/editcustomer/${customerId}`)
          .then(response => {
            setCustomers(response.data[0]);
            
           
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      };
    const toggleModal = () => {
        const modal = document.getElementById('crud-modal');
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
        setView(false)
      };
      const handleEdit = (customerId)=>{
        setEdit(true);
        setcustId(customerId)
        setView(false)
      }
  return (
    <div className='w-1/2'>
     
     <div className='grid grid-col bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 mt-1 rounded-xl shadow-xl h-10'>
        <span className='text-white text-lg p-2'><span className='pl-2 text-gray-300 pr-1 text-xl'>Customer Details </span>
        <span><PencilSquareIcon  onClick={(e)=>handleEdit(customers && customers.customerId)} className='w-5 h-5 cursor-pointer hover:bg-gray-300 flex ml-auto justify-center mr-7 items-center -mt-6'/>
        <button
              type="button"
              onClick={toggleModal}
              className="relative text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto flex justify-center items-center -mt-6 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button> 
            </span> 
        </span> 
       
        </div>
       
      <div
        id="crud-modal"
       
      >
        <div className="w-full  max-h-full">
          <div className="relative bg-blue-gray-50 rounded-lg shadow-lg  dark:bg-gray-700">
          {loading && (
          <div className="flex items-center justify-center h-64">
            <Spinner aria-label="Loading" />
          </div>
        )} 
        {!loading && (
          <div className='grid  p-3 '>
          <span className='p-4 text-3xl flex justify-center underline font-semibold'>{customers && customers.customerDisplayName} #{customers && customers.customerId}{customers && customers.types==='online' ? (<div class="relative">
    
    <span class="top-0 start-7 absolute w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
</div>) : (<div class="relative">
    
    <span class="top-0 start-7 absolute w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
</div>) }</span>
          
           <div className='grid grid-cols-1'>
          <span className='text-lg flex justify-center font-semibold p-5'>Address</span>
          <p className='-mt-5  italic  flex justify-center text-xs font-normal'>{customers && `${customers.billingAddress} ${customers.billingCity}`}</p>
          <p className='-mt-1  italic  flex justify-center text-xs font-normal'>{customers && `${customers.billingState} ${customers.billingCountry} ${customers.billingZipCode}`}</p>
          <p className='  italic text-xs flex justify-center font-normal'>{customers && customers.customerPhone}</p>
          <p className='  italic text-xs flex justify-center font-normal'>{customers && customers.customerEmail}</p>
          </div>
            <div className="px-3 py-5 text-sm max-w-full">
                <span className='text-lg underline font-semibold'></span>
    
             <div className='grid grid-cols-2 pl-20 pt-5 w-3/4 '>
                
                <label className='font-semibold flex justify-end font-serif'>Company </label>
                <label className=' px-10 font-normal  flex justify-center'>{customers && customers.companyName}</label>
             </div> 
             <div className='grid grid-cols-2 pl-20 pt-5 w-3/4 '>
                
                <label className='font-semibold flex justify-end font-serif'>Type </label>
                <label className='px-10 font-normal flex justify-center'>{customers && customers.type}</label>
             </div> 
             <div className='grid grid-cols-2 pl-20 pt-5 w-3/4'>
                
                <label className='font-semibold flex justify-end font-serif'>AcNo </label>
                <label className='px-10 font-normal flex justify-center'>{customers && customers.accno}</label>
             </div> 
            
            

            
            </div>
            
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customerview