import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  IconButton,
} from "@material-tailwind/react";



import { useState } from "react";
import Grow from '@mui/material/Grow';

import CustomerTable from "@/widgets/Tables/CustomerTable";
import { UserPlusIcon } from "@heroicons/react/24/outline";

import Customer from "@/widgets/Forms/Customer";
import Customerview from "@/widgets/Formviews/Customerview";
import { usePlus } from "@/context/plus";



export function Profile() {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [custId,setcustId] = useState('')
  const [view,setView] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [okModals, setOkModals] = useState(false);
 

  const toggleCustomerForm = (e) => {
    if (edit) {
      setEdit(false);
      
    } else {
      setShowCustomerForm(!showCustomerForm);
      
    }

   
  };
 
  return (
   
  
    <>
      <div className=" w-full table-auto">
      </div>
      <Card className=" bg-blue-gray-50">
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 w-full grid grid-cols-2 ">
          <Typography variant="h6" className="p-2 " color="white">
          
           { showCustomerForm ? "New Customer" : edit ? "Edit Customer" : "Customer" } 
          </Typography>
          <Typography  className="pl-72 ">

          {showCustomerForm || edit ? (
              <Button variant="text" color="blue-gray" className=" text-white gap-1 ml-24  xl:flex" onClick={toggleCustomerForm}>
                Back
              </Button>
            ) : !view ?  (
             
             <Button
              variant="text"
              color="blue-gray"
              className=" text-white ml-20 gap-1  xl:flex"
              onClick={toggleCustomerForm}
            >
              
              <UserPlusIcon className="h-5 w-5" color="" />
              Create
            </Button>
            ) : ""
}
          
            </Typography>
          </CardHeader>
         
        <CardBody className="p-0">
      
        <div className="w-full relative">
  {/* Render CustomerTable */}
  {!edit && !showCustomerForm && (
    <div
      className={`${
        view ? 'opacity-50' : ''
      } transition-opacity duration-300`}
    >
      <CustomerTable
        setcustId={setcustId}
        setSelectedCustomer={setSelectedCustomer}
        setView={setView}
        setEdit={setEdit}
        okModals={okModals}
        edit={edit}
      />
    </div>
  )}


  {view && (
    <div className="absolute inset-0 flex items-start justify-center">
      <Customerview setView={setView} view={view} setEdit={setEdit} setcustId={setcustId} customerId={selectedCustomer} />
    </div>
  )}

  {/* Render Customer or CustomerForm based on state */}
  {(edit || showCustomerForm) && (
    <Grow in={edit || showCustomerForm} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <div>
    <Customer  setOkModals={setOkModals} custId={custId} setShowCustomerForm={setShowCustomerForm} edit={edit} setEdit={setEdit} />
    </div>
    </Grow>
  )}
</div>


          
           
        </CardBody>
       
      </Card>
    </>

    
      
    
  
  );
}

export default Profile;
