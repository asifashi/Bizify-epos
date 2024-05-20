import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {TrashIcon,PencilSquareIcon, EyeIcon} from '@heroicons/react/24/solid'
import {HiOutlineExclamationCircle,HiInformationCircle } from 'react-icons/hi'
import { Button, Modal, Spinner } from 'flowbite-react';
import { Alert } from 'flowbite-react';


const CustomerTable = ({setEdit,setcustId,setSelectedCustomer,setView,okModals}) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [okModal, setOkModal] = useState(false);
  const [selectedSearchOption, setSelectedSearchOption] = useState('customerId');



  useEffect(() => {
    fetchCustomers();
    
  }, []);
 
  const fetchCustomers = () => {
    setLoading(true); 
    axios
      .get('http://localhost:8081/api/customer', {
        headers: {
          'access-token': localStorage.getItem('token') || '',
        },
      })
      .then((response) => {
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
       
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemove = (customerId,accno) => {
    console.log(accno)
    axios
      .get(`http://localhost:8081/api/Accountsno/${accno}`)
      .then((response) => {
        const transactions = response.data;
        console.log(response.data)
  
        if (transactions && transactions.length > 0) {
          setOpenModal(false);
          setShowDeleteAlert(true);
          setTimeout(() => {
            setShowDeleteAlert(false);
          }, 2000); 
        } else {
          // No transactions, proceed with delete
          setShowDeleteAlert(false);
          setOpenModal(true);
          setConfirmationCallback(() => () => {
            axios
              .delete(`http://localhost:8081/api/customer/${customerId}`)
              .then((deleteResponse) => {
                console.log(deleteResponse.data);
                setOkModal(true);
                setTimeout(() => {
                  setOkModal(false);
                }, 2000); 
                fetchCustomers();
               
              })
              .catch((deleteError) => {
                console.error('Error deleting data:', deleteError);
              })
              .finally(() => {
                setOpenModal(false);
              });
          });
        }
      })
      .catch((error) => {
        console.error('Error checking transactions:', error);
        setShowDeleteAlert(true);
        setOpenModal(false); 
        setTimeout(() => {
          setShowDeleteAlert(false);
        }, 2000); 
      });
  };
  

  const handleEdit = (customerId)=>{
        setEdit(true);
        setcustId(customerId)
        console.log(customerId)
      }
      const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
      
        if (customers && customers.length > 0) {
          const filteredData = customers.filter((customer) => {
            const propertyValue = customer[selectedSearchOption];
      
            if (propertyValue) {
              const stringValue = propertyValue.toString().toLowerCase();
              return stringValue.includes(searchValue);
            }
      
            return false;
          });
      
          setFilteredCustomers(filteredData);
          setCurrentPage(1);
        }
      };
      
      const handleCustomerClick = (customerId) => {
        // Set the selected customer when a row is clicked
        setView(true)
        setSelectedCustomer(customerId);
      };
      const indexOfLastCustomer = currentPage * customersPerPage;
      const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
      const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
      const paginatedCustomers = currentCustomers.slice(0, customersPerPage);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
     

  return (
    <div className=' w-full'>
      { showDeleteAlert && (
       <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> Cannot delete the customer.
      </Alert>
      )}
         {okModal && (
        <Alert color="success" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> Customer deleted successfully
      </Alert>
      )}
       {okModals && (
       <Alert color="success" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> {'Successfull'}
      </Alert> 
      )}
      <div className=''>
        <Modal className='pl-32' show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this customer?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={confirmationCallback}>
                  {"Yes, I'm sure"}
                </Button>
                <Button  color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal></div>
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
                  <option value="customerId">Id</option>
                  <option value="accno">AccNo</option>
                 <option value="companyName">Company</option>
               
                
                 </select>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="text" onChange={handleSearch} id="table-search" class="block p-2 pl-10 text-xs  text-gray-900 border border-gray-300 rounded-r-md w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Customers" />
        </div>
    </div> )}
    {!loading && filteredCustomers.length === 0 && (
  <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
    No search results found.
  </div>
)}
           {!loading &&  filteredCustomers.length > 0 && (<table className="w-full text-sm text-left text-gray-500 dark:text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                 
                </div>
              </th>
              <th scope="col" className="px-4 py-3">
                ID
              </th>
              <th scope="col" className="px-4 py-3">
                Company
              </th>
              <th scope="col" className="px-4 py-3">
                Acc No
              </th>
              <th scope="col" className="px-4 py-3">
                Relative 
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Phone
              </th>
              
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(paginatedCustomers) && paginatedCustomers.map(customer => (
              <tr key={customer.customerId}  className="bg-white border-b cursor-pointer text-xs dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                   
                  </div>
                </td>
                <td className="px-4 py-3">
                  {customer.customerId}
                </td>
                <td   className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {customer.companyName}
                 
                </td>
                <td className="px-4 py-3">
                  {customer.accno}
                </td>
                <td className="px-4 py-3">
                  {customer.relativeno}
                </td>
                <td className="px-4 py-3">
                  {customer.customerEmail}
                </td>
                <td className="px-4 py-3">
                  {customer.customerPhone}
                </td>
                <td className="flex items-center px-4 py-3 space-x-3">
                <EyeIcon onClick={(e) => handleCustomerClick(customer.customerId)} className='cursor-pointer w-4 h-4'/>
                  <PencilSquareIcon onClick={(e)=>handleEdit(customer.customerId)} className="w-4 h-4 text-blue-600 hover:cursor-pointer dark:text-blue-500 hover:underline"/>
                  <TrashIcon onClick={(e) => handleRemove(customer.customerId,customer.accno)} className="w-4 h-4 text-red-600 hover:cursor-pointer dark:text-red-500 hover:underline"/>
                </td>
              </tr>
            ))}
            
          </tbody>
       

        </table> )}
        {/* Pagination Section */}
<div className='grid grid-cols-1'>
  <nav className="flex items-center pt-4" aria-label="Table navigation">
    <div className='grid col-span-2'>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full ">
        Showing <span className="font-semibold text-gray-900 dark:text-white">
          {indexOfFirstCustomer + 1}-{indexOfLastCustomer > filteredCustomers.length ? filteredCustomers.length : indexOfLastCustomer}
        </span> of <span className="font-semibold text-gray-900 dark:text-white">{filteredCustomers.length}</span>
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
        {Array.from({ length: Math.ceil(filteredCustomers.length / customersPerPage) }, (_, index) => (
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
};



export default CustomerTable