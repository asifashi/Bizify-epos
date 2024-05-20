
import Brands from "@/widgets/Dropdown/Brand";
import Brandtable from "@/widgets/Tables/Brandtable";
import {ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Grow from '@mui/material/Grow';


export function Brand() {
  const [brandShow,setbrandShow]=useState(false)
  const [edit, setEdit] = useState(false);
  const [brandId,setbrandId] = useState('')
  const [ok, setOk] = useState(false);
  const [okModal, setOkModal] = useState(false);
  const toggle=(e)=>{
    if (edit) {
        setEdit(false);
      } else {
        setbrandShow(!brandShow)
      }
   
  }
  return (
    <>
     <div className="absolute w-full  rounded-xl table-auto">
      </div>
       <Card className=" bg-blue-gray-50">
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 w-full grid grid-cols-2 ">
          <Typography  className="p-2 text-white font-semibold " color="white">
         { brandShow ? "New Brand" : edit ? "Edit Brand" : "Brand"}
           </Typography>
          <Typography  className="pl-72 ">
           {brandShow || edit ? (
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
      {!edit && !brandShow && (
    <div>
      <Brandtable
        setbrandId={setbrandId}
        setEdit={setEdit}
        ok={ok}
        okModal={okModal}
      />
    </div>
  )}

      

   {(edit || brandShow) && (
    <Grow in={edit || brandShow} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <div>
    <Brands brandId={brandId} setOk={setOk} setOkModal={setOkModal} edit={edit} setbrandShow={setbrandShow} setEdit={setEdit} />
    </div>
    </Grow>
  )}
      </div>
          
           
        </CardBody>
       
      </Card>
    </>
  );
}

export default Brand;
