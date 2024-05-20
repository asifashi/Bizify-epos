import React, { useRef, useState } from 'react'
import  {StepperContext} from './context/StepperContext'


import Account from './components/Account'
import Details from './components/Details'
import Final from './components/Final'
const Customer = ({edit,custId,setEdit,setShowCustomerForm,setOkModals,setPlus,setinvoiceShow,plus,setOkM,setdelivereShow,deliverShow,invoiceShow,setquotationShow,quotationShow}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userData,setUserData]=useState('')
    const [submitClicked, setSubmitClicked] = useState(false);
    const [finalData,setFinalData]=useState([]);

    

  return (
    <div className={plus ? 'w-3/4 rounded-lg -mt-10  ' : 'w-full'}>
    
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <div className="container horizontal mt-1 ">
       
        <div id='new-modal' className='my-10 p-8'>
            <StepperContext.Provider value={{
                userData,
                setUserData,
                finalData,
                setFinalData
            }}>
                <Account plus={plus}  setEdit={setEdit} custId={custId} edit={edit} setSubmitClicked={setSubmitClicked} submitClicked={submitClicked} />
             { !plus && <Details setEdit={setEdit} custId={custId} edit={edit} />}
              <Final invoiceShow={invoiceShow} deliverShow={deliverShow} setOkM={setOkM} setEdit={setEdit} plus={plus} setinvoiceShow={setinvoiceShow} setdelivereShow={setdelivereShow} setquotationShow={setquotationShow} quotationShow={quotationShow}  setPlus={setPlus} custId={custId} setShowCustomerForm={setShowCustomerForm} setOkModals={setOkModals} edit={edit} setSubmitClicked={setSubmitClicked} />
                
            </StepperContext.Provider>
        </div>
        </div>
        
    </div>
     </div>
  )
}

export default Customer