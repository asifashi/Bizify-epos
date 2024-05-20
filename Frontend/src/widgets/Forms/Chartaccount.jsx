import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { HiSaveAs, HiSave } from 'react-icons/hi';
import Select,{ components } from 'react-select'

const Chartaccount  = ({chartId,setOk,setOkModals,edit,setShowaccountsForm,setEdit}) => {
    const [account,setAccount] = useState([]);
    const [chartData, setDataChart] = useState({
        ChartDetails: '',
        accname: '',
        Number : '',
    
    });
    const selectRef = useRef(null);
    useEffect(() => {
      selectRef.current.focus();
      if (edit) {
        const fetchData = async () => {
          try {
            const sno = chartId;
            const response = await axios.get(`http://localhost:8081/api/editchart/${sno}`);
            const data = response.data;
            console.log(data)
            if (data && data.ChartDetails) {
              setDataChart({
                ChartDetails: data.ChartDetails,
                accname: data.accname,
              });
            } else {
              console.error('Invalid data format or missing ChartDetails property');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        fetchData();
      }
    }, [edit, chartId, setDataChart]);
   
    useEffect(() => {
      
        axios.get('http://localhost:8081/api/getAccname')
        .then((response) => {
          setAccount(response.data);
          console.log(response.data)
          
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
      
  
    }, []);

    const saveChart = (e) => {
      e.preventDefault();
      const sno = chartId;
      const apiUrl = edit ? `http://localhost:8081/api/updatechart/${sno}` : 'http://localhost:8081/api/savechart';
    
      const axiosMethod = edit ? axios.put : axios.post;
    
      axiosMethod(apiUrl, chartData)
        .then((response) => {
          console.log(response.data);
          setDataChart({
            ChartDetails: '',
            accname: '',
            Number: '',
          });
          if (edit) {
            setEdit(false);
            setOkModals(true);
            setTimeout(() => {
              setOkModals(false);
            }, 2000);
          }else {
          setShowaccountsForm(false);
          setOk(true);
          setTimeout(() => {
            setOk(false);
          }, 2000);
        }
        })
        .catch((error) => {
          console.error(`Error ${edit ? 'updating' : 'saving'} chart: `, error);
        });
    };
    
  const handleInput = (e,index) => {
    const { name, value } = e.target;
    setDataChart((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <div className='relative bg-white text-xs rounded-lg shadow dark:bg-gray-700'>
      <div className='px-6 py-6 lg:px-8'>
        
            <form className='space-y-3' method='post' onSubmit={saveChart}>
              <div className='grid w-full text-xs grid-cols-1 gap-6'>
              <div className='grid col-span-1'>
                    <label
                     
                      className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Account Type
                    <span className="text-gray-500 pl-1">*</span>
                    </label>
                  
                   <Select
  options={account.map((acc) => ({
    label: acc.accname.charAt(0).toUpperCase() + acc.accname.slice(1).toLowerCase(),
    value: `${acc.accno},${acc.mainhead},${acc.relativeno},${acc.accname},${acc.acctype},${acc.subhead},${acc.imagekey},${acc.systemacc}`,

  }))}
  placeholder={chartData.ChartDetails ? chartData.ChartDetails.split(',')[3] : 'Select'}
  required={!edit}
  ref={selectRef}
  onChange={(selectedOption) => handleInput({ target: { name: 'ChartDetails', value: selectedOption.value } })}
  name='ChartDetails'
  menuPortalTarget={document.body} // Render the menu outside the DOM hierarchy
  styles={{
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
     
    }),
    menu: (base) => ({
      ...base,
      maxHeight: 'auto',
      
       
    }),
    option: (provided) => ({
      ...provided,
      fontSize: 'small',
    }),
  }}
  
/>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
              <div >
                <label
                  htmlFor='Name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Name
                  <span className="text-gray-500 pl-1">*</span>
                </label>
                <input
                  type='text'
                  name='accname'
                  value={chartData.accname}
                  onChange={handleInput}
                  autoComplete='offline'
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-xs h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                  placeholder='Name'
                  required={!edit}
                />
              </div>
              <div>
                <label
                 
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Number
                </label>
                <input
                  type='text'
                  name='Number'
                  autoComplete='offline'
                  value={chartData.Number}
                  onChange={handleInput}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-xs h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                  placeholder='Number'

                />
              </div>
            </div>
            </div>

             
              <div className='flex pt-5 justify-end'>
            
              <button
                type='submit'
                className='h-10 w-36 text-white shadow-lg bg-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-white hover:text-gray-900'
                >
                {edit ? (<div className='flex -mt-1 items-center justify-center gap-1'><HiSaveAs className='w-6 h-6'></HiSaveAs>Update{' '} </div>) : (<div className='flex -mt-1 items-center justify-center gap-1'><HiSave className='w-6 h-6'></HiSave>Save{' '} </div>) }
                </button>
              
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Chartaccount;
