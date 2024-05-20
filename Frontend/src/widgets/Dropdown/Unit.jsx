import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToggleSwitch } from 'flowbite-react';
import { HiSaveAs, HiSave } from 'react-icons/hi';

const Units  = ({ setOk,unitId, setOkModal, edit, setEdit, setunitShow }) => {
  
    const [unitData, setUnitData] = useState({
      shortname: '',
      fullname: '',
      disable: false,
    });
    const selectRef = useRef(null);
    useEffect(() => {
      selectRef.current.focus();
    }, []);
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        try {
          const id = unitId;
          const response = await axios.get(`http://localhost:8081/api/editUnit/${id}`)
          const data = response.data[0];
          setUnitData({
            shortname: data.shortname,
            fullname: data.fullname,
          });
          setUnitData((prevData) => ({ ...prevData, disable: data.status === 1 }));
       
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [edit, unitId, setUnitData]);

  const handleUpdateUnit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8081/api/updateUnit/${unitId}`, unitData)
      .then((res) => {
        console.log(res);

        setUnitData({
          shortname: '',
          fullname: '',
          disable: false,
        });
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


  const saveUnit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/api/saveUnit', unitData)
      .then((response) => {
        console.log(response.data);
        setUnitData({
          shortname: '',
          fullname: '',
          disable: false,
        });
        setunitShow(false)
        setOk(true);
        setTimeout(() => {
          setOk(false);
        }, 2000);
       
      })
      .catch((error) => {
        console.error('Error saving unit: ', error);
      });
  };
  const handleUnitNameChange = (e) => {
    if (e.target.name === 'disable') {
      setUnitData((prev) => ({ ...prev, disable: !prev.disable }));
    } else {
    setUnitData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  };

  return (
    <div>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
      <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Create Unit</h3>
            <form className='space-y-3' method='post' onSubmit={edit ? handleUpdateUnit : saveUnit}>
              <div className='grid w-full grid-cols-3 gap-6'>
              <div>
                <label
                  htmlFor='shortName'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Short Name
                </label>
                <input
                  type='text'
                  name='shortname'
                  ref={selectRef}
                  value={unitData.shortname}
                  onChange={handleUnitNameChange}
                  className="block w-full rounded-lg border border-gray-300 bg-white pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                  placeholder='Short Name'
                  autoComplete='offline'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='fullName'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  name='fullname'
                  value={unitData.fullname}
                  onChange={handleUnitNameChange}
                  className="block w-full rounded-lg border border-gray-300 bg-white pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                  placeholder='Full Name'
                  required
                />
              </div>
            </div>

              <div className='flex justify-between'>
              <div className='flex items-start pt-3'>
                <div className='flex items-center'>
                  <ToggleSwitch
                    id='disableToggle'
                    checked={unitData.disable}
                    onChange={() => handleUnitNameChange({ target: { name: 'disable' } })}
                  />
                </div>
                <label
                  htmlFor='disableToggle'
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  {unitData.disable ? 'Disabled' : 'Enabled'}
                </label>
              </div>
              </div>
              <div className='flex justify-center ml-52'>
            
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

export default Units;
