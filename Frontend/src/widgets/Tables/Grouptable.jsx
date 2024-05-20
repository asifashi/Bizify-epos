import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Spinner } from 'flowbite-react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiInformationCircle} from 'react-icons/hi';
import { Alert} from 'flowbite-react';

const Grouptable = ({setgroupId,setEdit,ok, okModal}) => {
  const [groupName, setGroupName] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);


  const toggleModal = () => {
    const modal = document.getElementById('authentication-modal');
    modal.classList.toggle('hidden');
  };

  useEffect(() => {
    fetchStockGroups();
  }, []);

  const fetchStockGroups = () => {
    setLoading(true);
    axios
      .get('http://localhost:8081/api/getItemGroups')
      .then((response) => {
        setGroupName(response.data);
        setFilteredGroups(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stock groups: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditGroup = (id) => {
    setgroupId(id);
    setEdit(true);
  };


  const handleRemoveGroup = (id) => {
    setOpenModal(true);

    setConfirmationCallback(() => () => {
      axios
        .delete(`http://localhost:8081/api/stockGroup/${id}`)
        .then((response) => {
          console.log(response.data);
          setShowDeleteAlert(true);
          setTimeout(() => {
            setShowDeleteAlert(false);
          }, 2000);
          setFormData({
            groupName:'',
            disable:false,
          })
          fetchStockGroups(); // Fetch stock groups again after deletion
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        })
        .finally(() => {
          setOpenModal(false);
        });
    });
  };

  const handleSearchGroup = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = groupName.filter((group) =>
      group.groupName.toLowerCase().includes(searchValue)
    );
    setFilteredGroups(filteredData);
    setCurrentPage(1);
  };

  const indexOfLastGroup = currentPage * itemsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - itemsPerPage;
  const currentGroups = filteredGroups.slice(indexOfFirstGroup, indexOfLastGroup);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      
      <div id='authentication-modal'>
        <div className='relative bg-gray-100 rounded-lg shadow dark:bg-gray-700'>
        { ok && (
        <Alert color="success" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> customer created successfully
      </Alert>
      )}
       { okModal && (
        <Alert color="success" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> customer updated successfully
      </Alert>
      )}
       {showDeleteAlert && (
        <Alert color="success" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> customer deleted successfully
      </Alert>
      )}
        <Modal className='pl-32' show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
  <Modal.Header />
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
      <h3 className="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this Group?
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
                onChange={handleSearchGroup}
                id='table-search'
                className='block p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search for Stock Groups'
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
                  Group Name
                </th>
                <th scope='col' className='px-4 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentGroups.map((group, index) => (
                <tr
                  key={index}
                  className='bg-white border-b text-xs dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 row-height'
                >
                       <td className="w-4 p-4">
                      <div className="flex items-center">
                       
                      </div>
                    </td>
                  <td className='px-4 py-3'>{group.id}</td>
                  <td className='px-4 py-3 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {group.groupName}
                  </td>
                  <td className='flex items-center px-4 py-3 space-x-3'>
                    <PencilSquareIcon
                      onClick={(e) => handleEditGroup(group.id)}
                      className='font-medium w-4 h-4 text-blue-600 hover:cursor-pointer dark:text-blue-500 hover:underline'
                    />
                    <TrashIcon
                      onClick={(e) => handleRemoveGroup(group.id)}
                      className='w-4 h-4 font-medium text-red-600 hover:cursor-pointer dark:text-red-500 hover:underline'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className='flex p-1 bg-blue-gray-50 items-center' aria-label='Table navigation'>
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
                  { length: Math.ceil(filteredGroups.length / itemsPerPage) },
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

export default Grouptable;
