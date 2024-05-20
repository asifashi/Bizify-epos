import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Spinner } from 'flowbite-react';

const Stockview = ({setView,setEdit,setstockId,ItemId}) => {
    const [stocks,setstocks] = useState();
    const [loading, setLoading] = useState(true);
    console.log(ItemId)
    useEffect(() => {
        fetchStocks();
      }, [ItemId]);
    
      const fetchStocks = () => {
        setLoading(true)
        ItemId=ItemId
        axios.get(`http://localhost:8081/api/editstock/${ItemId}`)
          .then(response => {
            setstocks(response.data[0]);
            
           
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
        setView(false)
      };
      const handleEdit = (ItemId)=>{
        setEdit(true);
        setstockId(ItemId)
        setView(false)
      }
  return (
    <div>
     
     <div className='grid grid-col bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 mt-1 rounded-xl shadow-xl h-10'>
        <span className='text-white text-lg p-2'><span className='pl-2 text-white pr-1 text-lg'>Stock Details</span>
        <span><PencilSquareIcon  onClick={(e)=>handleEdit(stocks && stocks.ItemId)} className='w-5 h-5 cursor-pointer hover:bg-gray-300 flex ml-80 justify-center items-center -mt-6'/>
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
        <div className="w-96  max-h-full">
          <div className="relative flex justify-center bg-blue-gray-50 rounded-lg shadow dark:bg-gray-700">
          {loading && (
          <div className="flex items-center justify-center h-64">
            <Spinner aria-label="Loading" />
          </div>
        )} 
          {!loading && (
            <div className="px-3 py-3 text-sm w-3/4">
           
              
             <div className='grid grid-cols-2 pt-6 w-full '>
                
                <label className='font-semibold rounded-lg font-serif'>Code </label>
                <label className='font-normal'>: {stocks && stocks.ItemId}</label>
             </div> 
             <div className='grid grid-cols-2 pt-8 w-full '>
                
                <label className='font-semibold rounded-lg font-serif'>Name</label>
                <label className='font-normal'>: {stocks && stocks.ItemName}</label>
             </div> 
             <div className='grid grid-cols-2 pt-8 w-full '>
                
                <label className='font-semibold rounded-lg  font-serif'>Barcode </label>
                <label className='font-normal'>: {stocks && stocks.Barcode}</label>
             </div> 
             <div className='grid grid-cols-2 pt-8 w-full '>
                
                <label className='font-semibold rounded-lg font-serif'>Type</label>
                <label className=' font-normal'>: {stocks && stocks.ItemType}</label>
             </div> 
             <div className='grid grid-cols-2 pt-8 w-full '>
                
                <label className='font-semibold rounded-lg font-serif'>Price</label>
                <label className='font-normal'>: {stocks && stocks.UnitPrice.toFixed(2)}</label>
             </div>
             
            
            
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stockview