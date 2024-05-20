
import { InboxStackIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Grow from '@mui/material/Grow';
import { usePlus } from "@/context/plus";
import Customer from "@/widgets/Forms/Customer";
import Quotationform from "@/widgets/Forms/Quotation";
import Quotationview from "@/widgets/Formviews/Quotationview";
import QuotationTable from "@/widgets/Tables/Quotationtable";

export function Quotation() {
  const [quotationShow,setquotationShow]=useState(false)
  const [edit,setEdit] = useState(false);
  const [quotationId,setquotationId] = useState('')
  const [view,setView] = useState(false)
  const [selectedquotation, setSelectedquotation] = useState(null);
  const [okModalquotation, setOkModalquotation] = useState(false);
  const [okModal, setOkModal] = useState(false);
  const [okM, setOkM] = useState(false);
  const { plus, setPlus } = usePlus();
  const toggle=()=>{
    if(edit)
    {
      setEdit(false) 
      if (plus) {
        
        setPlus(false)
        setEdit(true)
      } 
      
    } else if(plus && !edit)
    {
      
      setPlus(false)
      setquotationShow(true)
     
    }
     else{
    setquotationShow(!quotationShow)
    }
  }
  return (
    <div className={view ? "bg-gray-100 min-h-screen" : ""}>
     <div className="absolute bg-gray-100  rounded-xl table-auto">
      </div>
       <Card className={plus ? "bg-gray-200" : "bg-blue-gray-50"}>
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 w-full bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 grid grid-cols-2 ">
          <Typography variant="h6" className="p-2 " color="white">
         { quotationShow ? "New Quotation" : edit ? "Edit Quotation" : plus ? "Customer" : "Quotation List"}
           </Typography>
          <Typography  className="pl-72 ">
           {quotationShow || edit || plus ? (
              <Button variant="text" color="blue-gray" className=" text-white gap-1 ml-24  xl:flex" onClick={toggle}>
                Back
              </Button>
            ) : !view ? (
             
             <Button
              variant="text"
              color="blue-gray"
              className=" text-white gap-1 ml-20 xl:flex"
              onClick={toggle}
            >
              
              <InboxStackIcon className="h-5 w-5" color="" />
              Create
            </Button>
            ) : ""
}
</Typography>
          </CardHeader>
          <CardBody className="p-0">
      
          <div className="w-full relative">
      { !edit && !quotationShow &&  !plus && (
    <div
      className={`${
        view ? 'opacity-50' : ''
      } transition-opacity duration-300`}
    >
      <QuotationTable
        setquotationId={setquotationId}
        setSelectedquotation={setSelectedquotation}
        setView={setView}
        setEdit={setEdit}
        okModalquotation={okModalquotation}
        okModal={okModal}
        view={view}
      />
    </div>
  )}

      
{view && (
    <div className="absolute inset-0 min-h-screen flex justify-center">
      
              
                    <Quotationview setView={setView} view={view} setEdit={setEdit} setquotationId={setquotationId} VoucherNo={selectedquotation} />
                
              
    </div>
  )}
   {(edit || quotationShow || plus) && (
    <Grow in={edit || quotationShow || plus} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
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
      <Quotationform
        setOkModal={setOkModal}
        setquotationShow={setquotationShow}
        setView={setView}
        setOkModalquotation={setOkModalquotation}
        quotationId={quotationId}
        edit={edit}
        setEdit={setEdit}
        setSelectedquotation={setSelectedquotation}
        setPlus={setPlus}
        quotationShow={quotationShow}
        okM={okM}
      />
    </div>
  </Grow>
  )}
  {plus  && (
  <Grow in={plus} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
  
     
    <div className="absolute inset-0 flex pt-10 justify-center">
      
   
      <Customer setquotationShow={setquotationShow} quotationShow={quotationShow} setOkM={setOkM} plus={plus} setPlus={setPlus} />
    </div>
  
  </Grow>
)}

      </div>
          
           
        </CardBody>
       
      </Card>
    </div>
  );
}

export default Quotation;
