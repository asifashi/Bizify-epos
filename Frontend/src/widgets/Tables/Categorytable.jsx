import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Spinner } from 'flowbite-react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle, HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';

const CategoryTable = ({ setcategoryId, setEdit,ok,okModal }) => {
  const [itemCategory, setItemCategory] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const toggleModal = () => {
    const modal = document.getElementById('authentication-modalss');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get('http://localhost:8081/api/getItemCategory')
      .then((response) => {
        setItemCategory(response.data);
        setFilteredCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories: ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditCategory = (id) => {
    setcategoryId(id);
    setEdit(true);
  };

  const handleRemoveCategory = (id) => {
    setOpenModal(true);

    setConfirmationCallback(() => () => {
      axios
        .delete(`http://localhost:8081/api/category/${id}`)
        .then((response) => {
          console.log(response.data);
          setShowDeleteAlert(true);
          setTimeout(() => {
            setShowDeleteAlert(false);
          }, 2000);
          fetchCategories(); // Fetch categories again after deletion
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        })
        .finally(() => {
          setOpenModal(false);
        });
    });
  };

  const handleSearchCategory = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredData = itemCategory.filter((category) =>
      category.itemcategory.toLowerCase().includes(searchValue)
    );
    setFilteredCategories(filteredData);
    setCurrentPage(1);
  };

  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <div id='authentication-modalss'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          {ok && (
            <Alert color='info' icon={HiInformationCircle}>
              <span className='font-medium'>Info alert!</span> Category created successfully
            </Alert>
          )}
          {okModal && (
            <Alert color='info' icon={HiInformationCircle}>
              <span className='font-medium'>Info alert!</span> Category updated successfully
            </Alert>
          )}
          {showDeleteAlert && (
            <Alert color='info' icon={HiInformationCircle}>
              <span className='font-medium'>Info alert!</span> Category deleted successfully
            </Alert>
          )}
          <Modal className='pl-32' show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                <h3 className='mb-5 text-sm font-normal text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this Category?
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
                onChange={handleSearchCategory}
                id='table-search'
                className='block p-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search for Categories'
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
                  Name
                </th>
                <th scope='col' className='px-4 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category, index) => (
                <tr
                  key={index}
                  className='bg-white border-b text-xs dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 row-height'
                >
                      <td className="w-4 p-4">
                      <div className="flex items-center">
                       
                      </div>
                    </td>
                  <td className='px-4 py-3'>{category.id}</td>
                  <td className='px-4 py-3 cursor-pointer font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {category.itemcategory}
                  </td>
                  <td className='flex items-center px-4 py-3 space-x-3'>
                    <PencilSquareIcon
                      onClick={(e) => handleEditCategory(category.id)}
                      className='font-medium w-4 h-4 text-blue-600 hover:cursor-pointer dark:text-blue-500 hover:underline'
                    />
                    <TrashIcon
                      onClick={(e) => handleRemoveCategory(category.id)}
                      className='w-4 h-4 font-medium text-red-600 hover:cursor-pointer dark:text-red-500 hover:underline'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className='flex items-center p-1 bg-blue-gray-50' aria-label='Table navigation'>
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
                  { length: Math.ceil(filteredCategories.length / itemsPerPage) },
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

export default CategoryTable;