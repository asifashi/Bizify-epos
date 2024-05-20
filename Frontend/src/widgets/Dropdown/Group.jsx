import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToggleSwitch } from 'flowbite-react';
import { HiSaveAs, HiSave } from 'react-icons/hi';

const Groups = ({ setOk,groupId, setOkModal, edit, setEdit, setgroupShow }) => {
  const [formData, setFormData] = useState({ groupName:'',disable:false });
  const selectRef = useRef(null);
  useEffect(() => {
    selectRef.current.focus();
  }, []);
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        try {
          const id = groupId;
          const response = await axios.get(`http://localhost:8081/api/editStockGroup/${id}`)
          const data = response.data[0];
          setFormData(data);
          setFormData((prevData) => ({ ...prevData, disable: data.status === 1 }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [edit, groupId, setFormData]);

  const handleUpdateGroup = (e) => {
    e.preventDefault();

    axios
    .put(`http://localhost:8081/api/updateStockGroup/${groupId}`,  {
      groupName: formData.groupName,
      disable: formData.disable
    })
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

  const saveStockGroup = (e) => {
    e.preventDefault();
    axios
    .post('http://localhost:8081/api/saveGroupName',  {
      groupName: formData.groupName,
      disable: formData.disable
    })
      .then((response) => {
        console.log(response.data);
        setFormData({ itemcategory: '', disable: false });
        setgroupShow(false)
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 2000);
       
      })
      .catch((error) => {
        console.error('Error saving : ', error);
      });
  };
  const handleGroupNameChange = (e) => {
    if (e.target.name === 'disable') {
      setFormData((prev) => ({ ...prev, disable: !prev.disable }));
    } else {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  };

  return (
    <div>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
      <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
              Create Stock Group
            </h3>
            <form
              className='space-y-3'
              method='post'
              onSubmit={edit ? handleUpdateGroup : saveStockGroup}
            >
              <div className='w-1/2'>
                <label
                  for='groupName'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                </label>
                <input
                  type='name'
                  name='groupName'
                  ref={selectRef}
                  value={formData.groupName}
                  onChange={handleGroupNameChange}
                  autoComplete='offline'
                  className="block w-3/4 rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 outline-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                  placeholder='Group Name'
                  required
                />
              </div>

              <div className='flex justify-between'>
              <div className='flex items-start pt-3'>
                <div className='flex items-center'>
                  <ToggleSwitch
                    id='disableToggle'
                    checked={formData.disable}
                    onChange={() => handleGroupNameChange({ target: { name: 'disable' } })}
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
                  {edit ? (<div className='flex -mt-1 items-center justify-center gap-1'><HiSaveAs className='w-6 h-6'></HiSaveAs>Update </div>) : (<div className='flex -mt-1 items-center justify-center gap-1'><HiSave className='w-6 h-6'></HiSave>Save </div>) }
                </button>
                </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Groups;
