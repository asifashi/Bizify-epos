import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Textarea, ToggleSwitch } from 'flowbite-react';
import { HiSaveAs, HiSave } from 'react-icons/hi';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

const TermsForm = ({ setOk, termsId, setOkModal, edit, setEdit, settermsShow }) => {
  const [formData, setFormData] = useState({ Name: '',Terms: '' });

  const selectRef = useRef(null);
  useEffect(() => {
    selectRef.current.focus();
  }, []);
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        try {
          const id = termsId;
          const response = await axios.get(`http://localhost:8081/api/editterms/${id}`);
          const data = response.data[0];
          setFormData(data);
         
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [edit, termsId, setFormData]);

  const handleUpdateterms = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8081/api/updateterms/${termsId}`, formData)
      .then((res) => {
        console.log(res);
        setFormData({Name:'',Terms:'' });
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

  const saveterms = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/api/saveterms', formData)
      .then((response) => {
        console.log(response.data);
        setFormData({Name:'',Terms:'' });
        settermsShow(false)
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 2000);
       
      })
      .catch((error) => {
        console.error('Error saving terms: ', error);
      });
  };
  const handletermsChange = (e) => {
    const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  

  return (
    <div>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
        <div className='px-6 py-6 lg:px-8'>
          <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Create Terms</h3>
          <form className='space-y-3' method='post' onSubmit={edit ? handleUpdateterms : saveterms}>
            <div className='w-1/2'>
              <div>
                <label
                  htmlFor='itemterms'
                  className='block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='Name'
                  ref={selectRef}
                  value={formData.Name}
                  onChange={handletermsChange}
                  className="block w-3/4 rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-xs h-10 text-gray-900 outline-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder='Terms Name'
                  autoComplete='offline'
                  required
                />
              </div>
            </div>

         
                <div className='w-full'>
                <label
                  htmlFor='itemterms'
                  className='block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Terms
                </label>
                <Textarea
              name='Terms'
              value={formData.Terms}
              onChange={handletermsChange}
              placeholder='Payment terms...'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-xs h-full text-gray-900 outline-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
              required
              rows={10} 
            
            />
               
            </div>
            <div className='flex justify-end pt-5'>
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

export default TermsForm;
