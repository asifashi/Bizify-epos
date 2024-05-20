import { Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, redirect } from 'react-router-dom'
import { StepperContext } from '../context/StepperContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { HiInformationCircle, HiSave,HiSaveAs} from 'react-icons/hi'
import { Alert } from 'flowbite-react'

const Final = ({edit,custId,setEdit,setShowCustomerForm,setSubmitClicked,setOkModals,setPlus,setinvoiceShow,plus,setOkM,setdelivereShow,deliverShow,invoiceShow,setquotationShow,quotationShow}) => {
  const [state,setState] = useState(false);
  const [err,setErr]= useState('')

  const { userData } = useContext(StepperContext);
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);
  
    axios
      .post('http://localhost:8081/api/customer', userData, {
        headers: {
          'access-token': localStorage.getItem('token') || '',
        },
      })
      .then((res) => {
        console.log(res);
        setState(true);
        if (!plus) {
          setShowCustomerForm(false);
          
        }
        // Only if the first API call is successful, proceed with the second API call
        const data = {
          relativeno: userData.relativeno,
          accno: userData.accno,
          accname: userData.companyName,
        };
        return axios.post('http://localhost:8081/api/master', data);
      })
      .then((res) => {
        console.log(res);
       
        setState(true);
        if(plus == true)
        {
        setPlus(false);
        if(deliverShow == false){
          setdelivereShow(true);        
          } else if(invoiceShow == false)
          {
           setinvoiceShow(true)  
          } else if(quotationShow == false)
          {
           setquotationShow(true)  
          }
        }
       
       
      })
      .catch((err) => {
        console.error(err);
       setErr( err.response.data)
       setTimeout(() => {
        setErr('')
      }, 2000);
       
      })
      .finally(() => {
         
        if (!plus) {
          setOkModals(true);
          setTimeout(() => {
            setOkModals(false);
          }, 2000);
         
        } else {
          setOkM(true)
          setTimeout(() => {
            setOkM(false);
          }, 2000);
        }
      });
  };
  
  const handleEdit = () => {
    
    const customerId = custId;
    axios
    .put(`http://localhost:8081/api/updatecustomer/${customerId}`, userData) 
    .then((res) => {
      console.log(res);
      setState(true);
      setOkModals(true);
      setTimeout(() => {
        setOkModals(false);
      }, 2000); 
      setShowCustomerForm(false)
     setEdit(false)
    })
    .catch((err) => {
      console.error(err);
      setErr( err.response.data)
      setTimeout(() => {
       setErr('')
     }, 2000);
    });
  }
  
  return (
    <div className='container md:mt-10'>
      <div className='flex flex-col'>
      <div className='text-gray-50'>
        
          </div>
         {  state ? (<div className='mt-3 flex justify-center text-xl font-semibold uppercase text-blue-500'>
               Successfull
          </div>) : err ? ( <Alert color="failure" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> {err}
      </Alert> ) : ""   }  
          <div className='flex justify-end'>
          <NavLink >
            {edit ? ( <Button color='success'  onClick={handleEdit}  className='h-10 px-20 text-gray-900 bg-white transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-gray-800 hover:text-green-100'>
            <div className='flex -mt-1 items-center justify-center gap-1'><HiSaveAs className='w-6 h-6'></HiSaveAs>Update </div>
            </Button>) :
           ( <Button color='success'  onClick={handleSubmit}  className='h-10 px-20 text-gray-900 bg-white transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-gray-800 hover:text-green-100'>
             <div className='flex -mt-1 items-center justify-center gap-1'><HiSave className='w-6 h-6'></HiSave>Save </div>
            </Button>)}
            </NavLink>
            </div>

          </div>
    </div>
  )
}

export default Final