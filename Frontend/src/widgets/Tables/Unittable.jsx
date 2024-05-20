import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Spinner } from 'flowbite-react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiInformationCircle, HiSaveAs, HiSave } from 'react-icons/hi';
import { Alert,ToggleSwitch } from 'flowbite-react';

const Unitable = ({setunitId,setEdit,ok, okModal}) => {
  
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);


  const toggleModal = () => {
    const modal = document.getElementById('authentication-modalsse');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = () => {
    setLoading(true);
    axios
      .get('http://localhost:8081/api/getUnit')
      .then((response) => {
        setUnits(response.data);
        setFilteredUnits(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching units: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditUnit = (id) => {
    setunitId(id);
    setEdit(true);
  };

 


  const handleRemoveUnit = (id) => {
    setOpenModal(true);

    setConfirmationCallback(() => () => {
      axios
        .delete(`http://localhost:8081/api/unit/${id}`)
        .then((response) => {
          console.log(response.data);
          setShowDeleteAlert(true);
          setTimeout(() => {
            setShowDeleteAlert(false);
          }, 2000);
          fetchUnits(); // Fetch units again after deletion
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        })
        .finally(() => {
          setOpenModal(false);
        });
    });
  };


  const handleSearchUnit = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = units.filter(
      (unit) => unit.shortname.toLowerCase().includes(searchValue) || unit.fullname.toLowerCase().includes(searchValue)
    );
    setFilteredUnits(filteredData);
    setCurrentPage(1);
  };

  const indexOfLastUnit = currentPage * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;
  const currentUnits = filteredUnits.slice(indexOfFirstUnit, indexOfLastUnit);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
   
      <div id='authentication-modalsse'>
        <div className='relative bg-gray-100 rounded-lg shadow dark:bg-gray-700'>
          {ok && (
            <Alert color='info' icon={HiInformationCircle}>
              <span className='font-medium'>Info alert!</span> Unit created successfully
            </Alert>
          )}
          {okModal && (
            <Alert color='info' icon={HiInformationCircle}>
              <span className='font-medium'>Info alert!</span> Unit updated successfully
            </Alert>
          )}
          {showDeleteAlert && (
            <Alert color='info' icon={HiInformationCircle}>
              <span className='font-medium'>Info alert!</span> Unit deleted successfully
            </Alert>
          )}
          <Modal className='pl-32' show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                <h3 className='mb-5 text-sm font-normal text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this Unit?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={confirmationCallback}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color='gray' onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
         
        </div>
      </div>
      {loading ? (
        <div className='flex items-center justify-center h-64'>
          <Spinner aria-label='Loading' />
        </div>
      ) : (
        <div className='grid pt-1 bg-white rounded-lg overflow-x-auto col-span-2'>
          <div className='relative pl-1'>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative mt-1 '>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='text'
                onChange={handleSearchUnit}
                id='table-search'
                className='block p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search for Units'
              />
            </div>
          </div>
          <table className='w-full text-sm text-left mt-1  text-gray-500 dark:text-gray-600'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
              <th scope="col" className="p-4">
                    <div className="flex items-center">
                     
                    </div>
                  </th>
                <th scope='col' className='px-4 py-3'>
                  ID
                </th>
               
                <th scope='col' className='px-4 py-3 '>
                  Full Name
                </th>
                <th scope='col' className='px-4 py-3 '>
                  Short Name
                </th>
                <th scope='col' className='px-4 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUnits.map((unit, index) => (
                <tr
                  key={index}
                  className='bg-white border-b text-xs dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 row-height'
                >
                       <td className="w-4 p-4">
                      <div className="flex items-center">
                       
                      </div>
                    </td>
                  <td className='px-4 py-3'>{unit.id}</td>
                  <td className='px-4 py-3 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {unit.fullname}
                  </td>
                  <td className='px-4 py-2'>{unit.shortname}</td>
                  <td className='flex items-center px-4 py-3 space-x-3'>
                    <PencilSquareIcon
                      onClick={(e) =>handleEditUnit(unit.id)}
                      className='font-medium w-4 h-4 text-blue-600 hover:cursor-pointer dark:text-blue-500 hover:underline'
                    />
                    <TrashIcon
                      onClick={(e) =>handleRemoveUnit(unit.id)}
                      className='w-4 h-4 font-medium text-red-600 hover:cursor-pointer dark:text-red-500 hover:underline'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className='flex bg-blue-gray-50 p-1 items-center' aria-label='Table navigation'>
            <div className='grid col-span-2'>
              <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
                <li>
                  <a
                    href='#'
                    onClick={() => paginate(currentPage - 1)}
                    className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    Previous
                  </a>
                </li>
                {Array.from(
                  { length: Math.ceil(filteredUnits.length / itemsPerPage) },
                  (_, index) => (
                    <li key={index}>
                      <a
                        href='#'
                        onClick={() => paginate(index + 1)}
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                          currentPage === index + 1
                            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                            : ''
                        }`}
                      >
                        {index + 1}
                      </a>
                    </li>
                  )
                )}
                <li>
                  <a
                    href='#'
                    onClick={() => paginate(currentPage + 1)}
                    className='flex items-center justify-center px-3 h-8 rounded-e-lg leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Unitable;
 
