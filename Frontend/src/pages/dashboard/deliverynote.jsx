import DeliverTable from "@/widgets/Tables/Deliverytable";
import Deliverform from "@/widgets/Forms/Delivery";
import Deliverview from "@/widgets/Formviews/Deliverview";
import { InboxStackIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Grow from '@mui/material/Grow';
import { usePlus } from "@/context/plus";
import Customer from "@/widgets/Forms/Customer";

export function Deliver() {
  const [deliverShow,setdelivereShow]=useState(false)
  const [edit,setEdit] = useState(false);
  const [deliverId,setdeliverId] = useState('')
  const [view,setView] = useState(false)
  const [selecteddeliver, setSelecteddeliver] = useState(null);
  const [okModaldeliver, setOkModaldeliver] = useState(false);
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
      setdelivereShow(true)
     
    }
     else{
    setdelivereShow(!deliverShow)
    }
  }
  return (
    <>
     <div className="absolute w-full  rounded-xl table-auto">
      </div>
       <Card className={plus ? "bg-gray-200" : "bg-blue-gray-50"}>
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 w-full bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 grid grid-cols-2 ">
          <Typography variant="h6" className="p-2 " color="white">
         { deliverShow ? "New Delivery Note" : edit ? "Edit Delivery Note" : plus ? "Customer" : "Delivery Note List"}
           </Typography>
          <Typography  className="pl-72 ">
           {deliverShow || edit || plus ? (
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
      { !edit && !deliverShow &&  !plus && (
    <div
      className={`${
        view ? 'opacity-50' : ''
      } transition-opacity duration-300`}
    >
      <DeliverTable
        setdeliverId={setdeliverId}
        setSelecteddeliver={setSelecteddeliver}
        setView={setView}
        setEdit={setEdit}
        okModaldeliver={okModaldeliver}
        okModal={okModal}
      />
    </div>
  )}

      
{view && (
    <div className="absolute inset-0 flex items-start justify-center">
      
              
                    <Deliverview setView={setView} view={view} setEdit={setEdit} setdeliverId={setdeliverId} VoucherNo={selecteddeliver} />
                
              
    </div>
  )}
   {(edit || deliverShow || plus) && (
    <Grow in={edit || deliverShow || plus} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
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
      <Deliverform
        setOkModal={setOkModal}
        setdelivereShow={setdelivereShow}
        setView={setView}
        setOkModaldeliver={setOkModaldeliver}
        deliverId={deliverId}
        edit={edit}
        setEdit={setEdit}
        setSelecteddeliver={setSelecteddeliver}
        setPlus={setPlus}
        deliverShow={deliverShow}
        okM={okM}
      />
    </div>
  </Grow>
  )}
  {plus  && (
  <Grow in={plus} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
  
     
  <div className="absolute inset-0 flex pt-10 justify-center">
      
   
      <Customer setdelivereShow={setdelivereShow} deliverShow={deliverShow} setOkM={setOkM} plus={plus} setPlus={setPlus} />
    </div>
  
  </Grow>
)}

      </div>
          
           
        </CardBody>
       
      </Card>
    </>
  );
}

export default Deliver;
