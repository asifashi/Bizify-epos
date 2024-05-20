import { Table } from '@mui/material';
import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Spinner } from 'flowbite-react';

const Accountsview = ({setAccview,VoucherNo}) => {
    
    const [accounts,setAccounts] = useState();
    const [loading, setLoading] = useState(true);
    console.log(VoucherNo)
    useEffect(() => {
        fetchInvoices();
      }, [VoucherNo]);
    
      const fetchInvoices = () => {
        setLoading(true)
        VoucherNo=VoucherNo
        axios.get(`http://localhost:8081/api/AccountsInvoice/${VoucherNo}`)
          .then(response => {
            const data = response.data;
            setAccounts(data)
            
           })
          .catch(error => {
            console.error('Error fetching data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      };
    const toggleModal = () => {
        const modal = document.getElementById('cruds-modal');
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
        setAccview(false)
      };
    
  return (
    <div className='w-3/4'>
     
     <div className='grid grid-col bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 mt-1 rounded-xl shadow-xl h-10'>
        <span className='text-white text-lg p-2'><span className='pl-2 text-white pr-1 text-xl'>Account Details</span>
        <span><PencilSquareIcon   className='w-5 h-5 cursor-pointer hover:bg-gray-300 flex ml-auto mr-7 justify-center items-center -mt-6'/>
        <button
              type="button"
              onClick={toggleModal}
              className="relative text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto flex justify-center items-center -mt-6 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="cruds-modal"
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
        id="cruds-modal"
       
      >
        <div className="w-full  max-h-full">
          <div className="relative bg-white shadow-xl dark:bg-gray-700">
          {loading && (
          <div className="flex items-center justify-center h-64">
            <Spinner aria-label="Loading" />
          </div>
        )}
          
            <div className="px-3 py-3 text-sm max-w-full">
                <div className='grid grid-cols-2'>
                {!loading && (  <span className='p-4 text-3xl font-semibold'>Voucher #{VoucherNo}</span> )}
            {/* <label className='font-semibold bg-white pt-5 pl-32 font-sans'>Date :<label className='px-3 font-normal'>{accounts && accounts.VoucherDate}</label></label> */}
            </div>
             <div className='grid grid-cols-1 pt-8 w-full '>
             {/* <span className='text-lg font-semibold pl-4 p-1'>BILL TO</span> */}
             {/* <p className='pl-5 pb-4 italic'>{invoices && invoices.CustomerDetail}</p> */}
               
              {!loading && (  <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-600">
              <thead className="text-xs text-gray-700 shadow-md bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                     
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    DATE
                  </th>
                  <th scope="col" className="px-4 py-3">
                  ACC NO 
                  </th>
                  <th scope="col" className="px-4 py-3">
                   PARTICULARS
                  </th>
                  <th scope="col" className="px-4 py-3">
                   DEBIT
                  </th>
                  <th scope="col" className="px-4 py-3">
                   CREDIT
                  </th>
                
                  
                  
                 
                </tr>
              </thead>
              <tbody>
              {accounts && accounts.map((acc,index) => {
               
                
                return(
                  <tr key={index} className="bg-white border-b text-xs dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                       
                      </div>
                    </td>
                    <td  className="px-4 cursor-pointer py-4">
                    {new Date (acc.transdate).toLocaleDateString()} 
                    </td>
                    <td className="px-4 py-4">
                    {acc.accno}
                    </td>
                    <td className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {acc.particulars}
                    </td>
                    <td className="px-4 py-4">
                    {acc.debit.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                    {acc.credit.toFixed(2)}
                    </td>
                    
                   
                  </tr>)
                  
})}
              </tbody>
            </table> )}
          
             </div> 
           
            
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accountsview