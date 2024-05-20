import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {TrashIcon,PencilSquareIcon,EyeIcon} from '@heroicons/react/24/solid'
import { Button, Modal,Spinner,Alert} from 'flowbite-react';
import { HiOutlineExclamationCircle,HiInformationCircle} from 'react-icons/hi';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';

const QuotationTable = ({setquotationId,setEdit,setSelectedquotation,setView,okModalquotation,okModal}) => {
  const [quotation,setquotation]=useState([])
  const [filteredquotation, setFilteredquotation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotationPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedSearchOption, setSelectedSearchOption] = useState('VoucherNo');
  useEffect(() => {
    fetchquotation();
  }, []);
  const  fetchquotation = () =>{
    setLoading(true); 
    axios.get('http://localhost:8081/api/getquotation', {
      headers: {
        'access-token': localStorage.getItem('token') || '',
      },})
    .then(response => {
      setquotation(response.data);
      setFilteredquotation(response.data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }
  const handleRemove = (VoucherNo) => {
    setOpenModal(true);
    setConfirmationCallback(() => () => {
    axios.delete(`http://localhost:8081/api/removeQT/${VoucherNo}`)
      .then(response => {
        console.log(response.data);
        setShowDeleteAlert(true);
        setTimeout(() => {
          setShowDeleteAlert(false);
        }, 2000);
       
        fetchquotation(); 
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      })
      .finally(() => {
        setOpenModal(false); // Close the modal after the operation is complete
      });
    });
  };
  const handleInvoiceClick = (VoucherNo) => {
    // Set the selected customer when a row is clicked
    setView(true)
    setSelectedquotation(VoucherNo);
  };
  const handleEdit = (VoucherNo)=>{
        setEdit(true);
        setquotationId(VoucherNo)
        console.log(VoucherNo)
      }
      const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
      
        if (quotation && quotation.length > 0) {
          const filteredData = quotation.filter((quotation) => {
            const propertyValue = quotation[selectedSearchOption];
      
            if (propertyValue) {
              const stringValue = propertyValue.toString().toLowerCase();
              return stringValue.includes(searchValue);
            }
      
            return false;
          });
      
          setFilteredquotation(filteredData);
          setCurrentPage(1);
        }
      };
      const indexOfLastquotation = currentPage * quotationPerPage;
      const indexOfFirstquotation = indexOfLastquotation - quotationPerPage;
      const currentquotation = filteredquotation.slice(indexOfFirstquotation, indexOfLastquotation);
      const paginatedquotation = currentquotation.slice(0, quotationPerPage);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className=' w-full justify-center'>
                {showDeleteAlert && (
  <Alert color="success" icon={HiInformationCircle}>
  <span className="font-medium">Info alert!</span> quotation note deleted successfully
</Alert>
)}

{okModalquotation && (
  <Alert color="success" icon={HiInformationCircle}>
    <span className="font-medium">Info alert!</span>  quotation note created successfully
  </Alert>
)}
{okModal && (
  <Alert color="success" icon={HiInformationCircle}>
    <span className="font-medium">Info alert!</span>  quotation note updated successfully
  </Alert>
)}

      <Modal className='pl-32' show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
      <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this invoice?
      </h3>
      <div className="flex justify-center gap-4">
        <Button color="failure" onClick={confirmationCallback}>
          {"Yes, I'm sure"}
        </Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          No, cancel
        </Button>
      </div>
    </div>
  </Modal.Body>
</Modal>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {loading && (
          <div className="flex items-center justify-center h-64">
            <Spinner aria-label="Loading" />
          </div>
        )}
          {!loading && (
          <div class="pb-1 pt-1 pl-1 flex bg-white dark:bg-gray-900">
              <select
                   name=""
    
                   value={selectedSearchOption}
                   onChange={(e) => setSelectedSearchOption(e.target.value)}
                   className="block outline-none w-28 rounded-l-md border border-gray-300 text-gray-900 bg-white pl-2 mt-1 p-2 text-xs focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                 >
                  <option value="VoucherNo">No</option>
                 <option value="CustomerName">Customer</option>
                <option value="GrossAmount">Amount</option>
                  <option value="VoucherDate">Date</option>
                      
                     
                
                 </select>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" onChange={handleSearch} id="table-search" class="block p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-r-md w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for quotation Note" />
        </div>
    </div>  )}
    {!loading && filteredquotation.length === 0 && (
  <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
    No search results found.
  </div>
)}
           {!loading &&  filteredquotation.length > 0 && (
           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
              <thead className="text-xs text-gray-700  bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                     
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Voucher No
                  </th>
                 
                  <th scope="col" className="px-4 py-3">
                   Customer
                  </th>
                  <th scope="col" className="px-4 py-3">
                  Gross Amount
                  </th>
                  <th scope="col" className="px-4 py-3">
                   Voucher Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                   Due Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Action
                  </th>
                  
                  
                 
                </tr>
              </thead>
              <tbody>
               
              {Array.isArray(paginatedquotation) && paginatedquotation.map(quotation => (
             
                 <tr key={quotation.V_ID} className="bg-white border-b text-xs dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                       
                      </div>
                    </td>
                    <td  className="px-4 cursor-pointer py-3">
                
                     {quotation.VoucherNo}
                  
                    </td>
                   
                    <td  onClick={(e) => handleAccounsClick(quotation.VoucherNo)} className="px-4 py-3 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  
                     {quotation.CustomerName}
                  
                    </td>
                    <td className="px-4 py-3">
                     {quotation.GrossAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                    {new Date(quotation.VoucherDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                    {new Date(quotation.DueDate).toLocaleDateString()}
                    </td>
                    <td className={quotation.status == "Approved" ? "px-4 py-3 text-green-500" : quotation.status == "Draft" ? "px-4 py-3 text-blue-500 " : quotation.status == "Dropped" ? "px-4 py-3 text-red-500" : "px-4 py-3 text-yellow-500"}>
                      {quotation.status}
                    </td>
                    <td className="flex items-center px-4 py-3 space-x-3">
                    <EyeIcon onClick={(e) => handleInvoiceClick(quotation.VoucherNo)} className='w-4 cursor-pointer h-4'/>
                    <PencilSquareIcon onClick={(e)=>handleEdit(quotation.VoucherNo)} className="w-4 h-4 text-blue-600 hover:cursor-pointer dark:text-blue-500 hover:underline"/>
                  <TrashIcon onClick={() => handleRemove(quotation.VoucherNo)} className="font-medium w-4 h-4 hover:cursor-pointer text-red-600 dark:text-red-500 hover:underline"/>
                </td>
                   
                  </tr>
              
                ))}
             
              </tbody>
            </table> )} 
            <div className='grid grid-cols-1'>
  <nav className="flex items-center pt-4" aria-label="Table navigation">
    <div className='grid col-span-2'>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full ">
        Showing <span className="font-semibold text-gray-900 dark:text-white">
          {indexOfFirstquotation + 1}-{indexOfLastquotation > filteredquotation.length ? filteredquotation.length : indexOfLastquotation}
        </span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredquotation.length}</span>
      </span>
    </div>
    <div className='grid col-span-2'>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a href="#" onClick={() => paginate(currentPage - 1)} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous
          </a>
        </li>
        {/* Map over your page numbers and create page links */}
        {Array.from({ length: Math.ceil(filteredquotation.length / quotationPerPage) }, (_, index) => (
          <li key={index}>
            <a href="#" onClick={() => paginate(index + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}>
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={() => paginate(currentPage + 1)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </a>
        </li>
      </ul>
    </div>
  </nav>
</div> 
          </div>
        </div>
      );
}

export default QuotationTable