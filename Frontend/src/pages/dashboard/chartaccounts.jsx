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

import Charttable from "@/widgets/Tables/Chartaccounttable";
import Chartaccount from "@/widgets/Forms/Chartaccount";
import { WalletIcon } from "@heroicons/react/24/solid";
  
  
  
  export function Chartaccounts() {
    const [showaccountsForm, setShowaccountsForm] = useState(false);
    const [edit, setEdit] = useState(false);
    const [chartId,setchartId] = useState('')
    const [ok, setOk] = useState(false);
    const [okModals, setOkModals] = useState(false);
   
  
    const toggleChartForm = (e) => {
      if (edit) {
        setEdit(false);
        
      } else {
        setShowaccountsForm(!showaccountsForm);
        
      }
  
     
    };
   
    return (
     
    
      <>
        <div className=" w-full table-auto">
        </div>
        <Card className=" bg-blue-gray-50">
        <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 w-full grid grid-cols-2 ">
            <Typography variant="h6" className="p-2 " color="white">
            
             { showaccountsForm ? "Account" : edit ? "Edit Account" : "Chart of Accounts" } 
            </Typography>
            <Typography  className="pl-72 ">
  
            {showaccountsForm || edit ? (
                <Button variant="text" color="blue-gray" className=" text-white gap-1 ml-24  xl:flex" onClick={toggleChartForm}>
                  Back
                </Button>
              ) :   (
               
               <Button
                variant="text"
                color="blue-gray"
                className=" text-white ml-20 gap-1  xl:flex"
                onClick={toggleChartForm}
              >
                
                <WalletIcon className="h-5 w-5" color="" />
                Create
              </Button>
              )
  }
            
              </Typography>
            </CardHeader>
           
          <CardBody className="p-0">
        
          <div className="w-full relative">
    {/* Render CustomerTable */}
    {!edit && !showaccountsForm && (
      <div>
        <Charttable
          setchartId={setchartId}
          setEdit={setEdit}
          ok={ok}
          okModals={okModals}
        />
      </div>
    )}
  
  
    {/* Render Customer or CustomerForm based on state */}
    {(edit || showaccountsForm) && (
      <Grow in={edit || showaccountsForm} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
        <div>
      <Chartaccount chartId={chartId} setOk={setOk} setOkModals={setOkModals} edit={edit} setShowaccountsForm={setShowaccountsForm} setEdit={setEdit}   />
      </div>
      </Grow>
    )}
  </div>
  
  
            
             
          </CardBody>
         
        </Card>
      </>
  
      
        
      
    
    );
  }
  
  export default Chartaccounts;
  