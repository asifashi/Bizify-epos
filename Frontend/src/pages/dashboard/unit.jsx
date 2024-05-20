
import Units from "@/widgets/Dropdown/Unit";
import Unitable from "@/widgets/Tables/Unittable";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Grow from '@mui/material/Grow';

export function Unit() {
  const [unitShow,setunitShow]=useState(false)
  const [edit, setEdit] = useState(false);
  const [unitId,setunitId] = useState('')
  const [ok, setOk] = useState(false);
  const [okModal, setOkModal] = useState(false);
  const toggle=(e)=>{
    if (edit) {
        setEdit(false);
      } else {
        setunitShow(!unitShow)
      }
   
  }
  return (
    <>
     <div className="absolute w-full  rounded-xl table-auto">
      </div>
       <Card className=" bg-blue-gray-50">
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 w-full grid grid-cols-2 ">
          <Typography className="p-2 text-white font-semibold " color="white">
         { unitShow ? "New Unit" : edit ? "Edit Unit" : "Unit"}
           </Typography>
          <Typography  className="pl-72 ">
           {unitShow || edit ? (
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
      {!edit && !unitShow && (
    <div>
      <Unitable
        setunitId={setunitId}
        setEdit={setEdit}
        ok={ok}
        okModal={okModal}
      />
    </div>
  )}

      

   {(edit || unitShow) && (
    <Grow in={edit || unitShow} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <div>
    <Units unitId={unitId} setOk={setOk} setOkModal={setOkModal} edit={edit} setunitShow={setunitShow} setEdit={setEdit} />
    </div>
    </Grow>
  )}
      </div>
          
           
        </CardBody>
       
      </Card>
    </>
  );
}

export default Unit;
