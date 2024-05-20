

import Accountsview from "@/widgets/Formviews/Accountsinvoice";
import Invoiceview from "@/widgets/Formviews/Invoiceview";
import Invoiceform from "@/widgets/Invoice/Invoiceform";
import InvoiceTable from "@/widgets/Tables/InvoiceTable";
import { UserPlusIcon,WalletIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Grow from '@mui/material/Grow';
import Customer from "@/widgets/Forms/Customer";
import { usePlus } from "@/context/plus";
import { CloseButton } from "react-bootstrap";
import { useInvoiceShow } from "@/context/invoiceshow";
import { useQuotation } from "@/context/quotation";

export function Tables() {
  const { invoiceShow, setinvoiceShow } = useInvoiceShow();
  const [edit,setEdit] = useState(false);
  const [invoiceId,setinvoiceId] = useState('')
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [view,setView] = useState(false)
  const [acc,setAcc] = useState('')
  const [accview,setAccview] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [okModalStock, setOkModalStock] = useState(false);
  const [okModal, setOkModal] = useState(false);
  const [okM, setOkM] = useState(false);
  const { plus, setPlus } = usePlus();
  const { quotations, setQuotation, qtid, setQtid } = useQuotation();


  const toggle=()=>{
    if(edit)
    {
      setEdit(false) 
      if (plus) { 
        setPlus(false)
        setEdit(true)   
      } 
      
    }else if(plus && !edit)
    {
       setPlus(false)
      setinvoiceShow(true)
    }else if(quotations)
    {
      setQuotation(false)
    }
    else{
    setinvoiceShow(!invoiceShow)
    }
    
  }
 

  return (
    <>
     <div className="absolute w-full  rounded-xl table-auto">
      </div>
       <Card className={plus ? "bg-gray-200" : "bg-blue-gray-50"}>
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 w-full bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 grid grid-cols-2 ">
          <Typography variant="h6" className="p-2 " color="white">
         { invoiceShow ? "New Invoice" : edit ? "Edit invoice" : plus ? "Customer" : "Invoice List"}
           </Typography>
          <Typography  className="pl-72 ">
           {invoiceShow || edit || plus ? (
              <Button variant="text" color="blue-gray" className=" text-white gap-1 ml-24  xl:flex" onClick={toggle}>
                { plus ? (<div>  <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg></div>)  : 'Back'}
              </Button>
            ) : !view || !accview || !plus ? (
             
             <Button
              variant="text"
              color="blue-gray"
              className=" text-white gap-1 ml-20 xl:flex"
              onClick={toggle}
            >
              
              <WalletIcon className="h-5 w-5" color="" />
              Create
            </Button>
            ) : ""
}
</Typography>
          </CardHeader>
          <CardBody className="p-0">
      
          <div className="w-full relative">
      { !edit && !invoiceShow && !plus && (
    <div
      className={`${
        view || accview ? 'opacity-50' : ''
      } transition-opacity duration-300`}
    >
      <InvoiceTable
        setinvoiceId={setinvoiceId}
        setSelectedInvoice={setSelectedInvoice}
        setView={setView}
        setEdit={setEdit}
        setAcc={setAcc}
        setAccview={setAccview}
        okModalStock={okModalStock}
        okModal={okModal}
      />
    </div>
  )}

      
{view && (
    <div className="absolute inset-0 flex items-start justify-center">
      
              
                    <Invoiceview  setView={setView} view={view} setEdit={setEdit} setinvoiceId={setinvoiceId} VoucherNo={selectedInvoice} />
                
              
    </div>
  )}
{(edit || invoiceShow || plus || quotations) && (
  <Grow in={edit || invoiceShow || plus} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
    <div
      className={`transition-opacity duration-300`}
      style={{
        opacity: plus ? 0.2 : 1,
       
      }}
    >
      {plus && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 999, // Adjust the z-index to make sure the overlay is above the blurred Invoiceform
          }}
          onClick={(e) => {
            // Prevent any click events from reaching the underlying fields
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      )}
      <Invoiceform
        setOkModal={setOkModal}
        setinvoiceShow={setinvoiceShow}
        setView={setView}
        setOkModalStock={setOkModalStock}
        invoiceId={invoiceId}
        edit={edit}
        setEdit={setEdit}
        setSelectedInvoice={setSelectedInvoice}
        setPlus={setPlus}
        invoiceShow={invoiceShow}
        okM={okM}
      />
    </div>
  </Grow>
)}


{plus  && (
  <Grow in={plus} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
  
     
  <div className="absolute inset-0 flex pt-10 justify-center">
      
   
      <Customer invoiceShow={invoiceShow} setinvoiceShow={setinvoiceShow} setOkM={setOkM} plus={plus} setPlus={setPlus} />
    </div>
  
  </Grow>
)}


  {
    accview && (
      <div className="absolute inset-0 flex items-start justify-center">
      <Accountsview setAccview={setAccview}  VoucherNo={acc} />
    </div>

    )
  }
  
      </div>
          
           
        </CardBody>
       
      </Card>
    </>
  );
}

export default Tables;
