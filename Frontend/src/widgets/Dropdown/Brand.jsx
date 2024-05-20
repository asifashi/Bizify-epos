import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToggleSwitch } from 'flowbite-react';

import { HiSaveAs, HiSave } from 'react-icons/hi';


const Brands = ({brandId,setOk,setOkModal,edit,setbrandShow,setEdit}) => {
  const [formData, setFormData] = useState({ brandname: '',disable: false });
  const selectRef = useRef(null);
const toggleModal = () => {
    const modal = document.getElementById('authentication-modalss');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
  };
  useEffect(() => {
    selectRef.current.focus();
  }, []);
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        try {
          const id=brandId;
          const response = await axios .get(`http://localhost:8081/api/editBrand/${id}`)
          const data = response.data[0];
          setFormData(data);
          setFormData((prevData) => ({ ...prevData, disable: data.status === 1 }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
       }
  
  }, [edit, brandId, setFormData]);

 const handleUpdateBrand = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8081/api/updateBrand/${brandId}`,  {
        brandname: formData.brandname,
        disable: formData.disable
      })
      .then((res) => {
        console.log(res);
     
        setFormData({ brandname: '',disable: false })
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

  const saveBrandName = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/api/saveBrandName',  {
        brandname: formData.brandname,
        disable: formData.disable
      })
      .then((response) => {
        console.log(response.data);
        setFormData({ brandname: '',disable: false })
        setbrandShow(false)
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error saving brand: ', error);
      });
  };



  const handleBrandNameChange = (e) => {
    if (e.target.name === 'disable') {
      setFormData((prev) => ({ ...prev, disable: !prev.disable }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
 


  return (
    <div>
     
      <div id='authentication-modalss'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
     
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Create Brand</h3>
            <form
              className='space-y-3'
              method='post'
              onSubmit={edit ? handleUpdateBrand : saveBrandName}
            >
              <div className='w-1/2'>
                <label
                  htmlFor='brandname'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Brand Name
                </label>
                <input
                  type='name'
                  name='brandname'
                  ref={selectRef}
                  value={formData.brandname}
                  onChange={handleBrandNameChange}
                  className="block w-3/4 rounded-lg border outline-blue-400 border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder='Brand Name'
                  autoComplete='offline'
                  required
                />
              </div>

              <div className='flex justify-between'>
                <div className='flex pt-3 items-start'>
                <div className='flex items-center'>
        <ToggleSwitch      
          id='disableToggle'
          checked={formData.disable}
          onChange={() => handleBrandNameChange({ target: { name: 'disable' } })}
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
              <div className='ml-64'> 
              <button
                type='submit'
                className='h-10 w-36 text-white shadow-lg bg-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-white hover:text-gray-900'
                >
                  {edit ? (<div className='flex -mt-1 items-center justify-center gap-1'><HiSaveAs className='w-6 h-6'></HiSaveAs>Update </div>) : (<div className='flex -mt-1 items-center justify-center gap-1'><HiSave className='w-6 h-6'></HiSave>Save </div>) }
                </button>
                </div>
            </form>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Brands;
 