import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToggleSwitch } from 'flowbite-react';
import { HiSaveAs, HiSave } from 'react-icons/hi';

const CategoryForm = ({ setOk,categoryId, setOkModal, edit, setEdit, setcategoryShow }) => {
  const [formData, setFormData] = useState({ itemcategory: '', disable: false });
  const selectRef = useRef(null);
  useEffect(() => {
    selectRef.current.focus();
  }, []);
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        try {
          const id = categoryId;
          const response = await axios.get(`http://localhost:8081/api/editcategory/${id}`);
          const data = response.data[0];
          setFormData(data);
          setFormData((prevData) => ({ ...prevData, disable: data.status === 1 }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [edit, categoryId, setFormData]);

  const handleUpdateCategory = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8081/api/updatecategory/${categoryId}`, formData)
      .then((res) => {
        console.log(res);
        setFormData({ itemcategory: '', disable: false });
        setEdit(false);
        setOkModal(true);
        setTimeout(() => {
          setOkModal(false);
        }, 2000);
       
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const saveCategory = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/api/saveCategory', formData)
      .then((response) => {
        console.log(response.data);
        setFormData({ itemcategory: '', disable: false });
        setcategoryShow(false)
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 2000);
       
      })
      .catch((error) => {
        console.error('Error saving category: ', error);
      });
  };

  const handleCategoryChange = (e) => {
    if (e.target.name === 'disable') {
      setFormData((prev) => ({ ...prev, disable: !prev.disable }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <div>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
        <div className='px-6 py-6 lg:px-8'>
          <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Create Item Category</h3>
          <form className='space-y-3' method='post' onSubmit={edit ? handleUpdateCategory : saveCategory}>
            <div className='w-1/2'>
              <div>
                <label
                  htmlFor='itemcategory'
                  className='block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Category
                </label>
                <input
                  type='name'
                  name='itemcategory'
                  ref={selectRef}
                  value={formData.itemcategory}
                  onChange={handleCategoryChange}
                  className="block w-3/4 rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 outline-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder='Item Category'
                  autoComplete='offline'
                  required
                />
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='flex items-start pt-3 '>
                <div className='flex items-center'>
                  <ToggleSwitch
                    id='disableToggle'
                    checked={formData.disable}
                    onChange={() => handleCategoryChange({ target: { name: 'disable' } })}
                  />
                </div>
                <label
                  htmlFor='disableToggle'
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  {formData.disable ? 'Disabled' : 'Enabled'}
                </label>
              </div>
            </div>
            <div className='flex justify-start ml-64'>
              <button
                type='submit'
                className='h-10 w-36 text-white shadow-lg bg-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-white hover:text-gray-900'
              >
                {edit ? (
                  <div className='flex -mt-1 items-center justify-center gap-1'>
                    <HiSaveAs className='w-6 h-6'></HiSaveAs>Update
                  </div>
                ) : (
                  <div className='flex -mt-1 items-center justify-center gap-1'>
                    <HiSave className='w-6 h-6'></HiSave>Save
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
