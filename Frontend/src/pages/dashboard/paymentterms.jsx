
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Grow from '@mui/material/Grow';
import Termstable from "@/widgets/Tables/termstable";
import TermsForm from "@/widgets/Forms/Paymentterms";


export function Terms() {
  const [termsShow,settermsShow]=useState(false)
  const [edit, setEdit] = useState(false);
  const [termsId,settermsId] = useState('')
  const [selectedterms,setSelectedTerms] = useState(null);
  const [ok, setOk] = useState(false);
  const [okModal, setOkModal] = useState(false);
  const toggle=(e)=>{
    if (edit) {
        setEdit(false);
      } else {
        settermsShow(!termsShow)
      }
   
  }
  return (
    <>
     <div className="absolute w-full  rounded-xl table-auto">
      </div>
       <Card className=" bg-blue-gray-50">
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 w-full grid grid-cols-2 ">
          <Typography  className="p-2 text-white font-semibold " color="white">
         { termsShow ? "New Terms" : edit ? "Edit Terms" : "Payment Terms"}
           </Typography>
          <Typography  className="pl-72 ">
           {termsShow || edit ? (
              <Button variant="text" color="blue-gray" className=" text-white gap-1 ml-24 md:absolute sm:absolute  xl:flex" onClick={toggle}>
                Back
              </Button>
            ) :  (
             
             <Button
              variant="text"
              color="blue-gray"
              className=" text-white gap-1 ml-20 xl:flex"
              onClick={toggle}
            >
              
              <ArrowRightOnRectangleIcon className="h-5 w-5  text-white" color="" />
              Create
            </Button>
            ) 
}
</Typography>
          </CardHeader>
          <CardBody className="p-0">
      
      <div className="w-full relative">
      {!edit && !termsShow && (
    <div>
      <Termstable
        settermsId={settermsId}
        setEdit={setEdit}
        setSelectedTerms={setSelectedTerms}
        ok={ok}
        okModal={okModal}
      />
    </div>
  )}


  

   {(edit || termsShow) && (
    <Grow in={edit || termsShow} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <div>
    <TermsForm termsId={termsId} setOk={setOk} setOkModal={setOkModal} edit={edit}  setSelectedTerms={setSelectedTerms} settermsShow={settermsShow} setEdit={setEdit} />
    </div>
    </Grow>
  )}
      </div>
          
           
        </CardBody>
       
      </Card>
    </>
  );
}

export default Terms;
