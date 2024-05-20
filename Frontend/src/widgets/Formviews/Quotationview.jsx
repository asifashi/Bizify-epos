import { Table } from '@mui/material';
import {TrashIcon,PencilSquareIcon} from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { ArrowRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { PlayArrowTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Invoiceform from '@/widgets/Invoice/Invoiceform'; 
import { useInvoiceShow } from '@/context/invoiceshow';
import { useQuotation } from '@/context/quotation';

const Quotationview = ({setView,setEdit,setquotationId,VoucherNo}) => {
    let subtotal=0;
    const { setinvoiceShow } = useInvoiceShow();
    const navigate = useNavigate();
    const [quotation,setquotation] = useState();
    const [loading, setLoading] = useState(true);
    console.log(VoucherNo)
    const { setQuotation,setQtid } = useQuotation();
    const handleSalesFormNavigation = (VoucherNo) => {
          navigate("/dashboard/sales")
         setinvoiceShow(true)
         setQtid(VoucherNo)
         setQuotation(true)
         
      };
    useEffect(() => {
        fetchquotation();
      }, [VoucherNo]);
    
      const fetchquotation = () => {
        setLoading(true)
        VoucherNo=VoucherNo
        axios.get(`http://localhost:8081/api/getDataquotation/${VoucherNo}`)
          .then(response => {
            const data = response.data;
            setquotation(data)
            console.log(data)
           
           
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
      const handleEdit = (VoucherNo)=>{
        setEdit(true);
        setquotationId(VoucherNo)
        setView(false)
      }
    
      
  return (
    <div className='w-3/4  '>
     
     <div className='grid grid-col bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 mt-1 rounded-xl shadow-xl h-10'>
        <span className='text-white text-lg p-2'><span className='pl-2 text-white pr-1 text-xl'>Quotation </span>
    <div className='-mt-6 md:flex-row md:items-center'>
     <PaperAirplaneIcon onClick={()=>{handleSalesFormNavigation(quotation && quotation.VoucherNo)}}  className='w-5 h-5 cursor-pointer ml-auto  mr-14  '/>
     <PencilSquareIcon onClick={(e)=>handleEdit(quotation && quotation.VoucherNo)}  className='w-5 h-5 cursor-pointer ml-auto mr-7 -mt-5  '/>
        
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
            </div>
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
          
           {!loading && ( <div className="px-3 py-3 text-sm max-w-full">
                <div className='grid grid-cols-2'>
            <span className='p-4 text-3xl font-semibold'>Quotation #{quotation && quotation.VoucherNo}</span> 
            <label className='font-semibold bg-white pt-5 pl-32 font-sans'>Date :<label className='px-3 font-normal'>{ quotation && new Date (quotation.VoucherDate).toLocaleDateString()}</label></label>
            </div>
             <div className='grid grid-cols-1 pt-8 w-full '>
             <span className='text-lg font-semibold pl-4 p-1'>BILL TO</span>
             <p className='pl-5 pb-4 italic'>{quotation && quotation.CustomerDetail.split(',')[1]}</p>
               
                <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-600">
              <thead className="text-xs text-gray-700 shadow-md bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                     
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    ITEM
                  </th>
                  <th scope="col" className="px-4 py-3">
                    BARCODE
                  </th>
                  <th scope="col" className="px-4 py-3">
                   QTY
                  </th>
                  <th scope="col" className="px-4 py-3">
                   PRICE
                  </th>
                  <th scope="col" className="px-4 py-3">
                   AMOUNT
                  </th>
                
                  
                  
                 
                </tr>
              </thead>
              <tbody>
              {quotation && quotation.items && quotation.items.map((quotation,index) => {
                const product=parseFloat(quotation.Sold_Qty || 0) * parseFloat(quotation.UnitPrice || 0 ) 
                subtotal += product
                return(
                  <tr key={index} className="bg-white border-b text-xs dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                       
                      </div>
                    </td>
                    <td  className="px-4 cursor-pointer py-4">
                    {quotation.ItemId}
                    </td>
                    <td className="px-4 py-4">
                    {quotation.ItemName}
                    </td>
                    <td className="px-4 py-4">
                    {quotation.Barcode}
                    </td>
                    <td className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {quotation.Sold_Qty}
                    </td>
                    <td className="px-4 py-4">
                     {quotation.UnitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                    {product.toFixed(2)}
                    </td>
                    
                   
                  </tr>)
                  
})}
              </tbody>
            </table>
            <div className='grid grid-cols-4'>
                <span></span>
                <span></span>
            <span className='font-semibold flex justify-end mt-5  text-sm'>Total </span>
            <span className='text-xs font-semibold  mr-28 flex justify-end mt-5'>{subtotal.toFixed(2)}</span>
            </div>
             </div> 
             <div className='pl-5 mt-6 mb-2'>
  <span className='flex text-sm font font-semibold'>Terms & Conditions</span>
  {quotation && quotation.TermsAndConditions_V && (
    <div className='font-normal pt-1 text-xs'>
      {quotation.TermsAndConditions_V.split('.').map((sentence, index) => (
        <div key={index}>
          {sentence.trim() && `* ${sentence.trim()}`}
        </div>
      ))}
    </div>
  )}
</div>

            
            
            </div> 
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quotationview