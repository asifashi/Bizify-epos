
import Stockitem from "@/widgets/Dropdown/Stockitem";
import Stockview from "@/widgets/Formviews/Stockview";
import StockTable from "@/widgets/Tables/StockTable";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Grow from '@mui/material/Grow';

export function Inventory() {
  const [inveneShow,setinvenShow]=useState(false)
  const [edit, setEdit] = useState(false);
  const [stockId,setstockId] = useState('')
  const [view,setView] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null);
  const [okModalStock, setOkModalStock] = useState(false);
  const [okModal, setOkModal] = useState(false);
  
  const toggle=(e)=>{
    if (edit) {
        setEdit(false);
      } else {
        setinvenShow(!inveneShow)
      }
   
  }
  return (
    <>
     <div className="absolute w-full  rounded-xl table-auto">
      </div>
       <Card className=" bg-blue-gray-50">
      <CardHeader variant="gradient" className="mt-1 -ml-0 mb-2 h-10 bg-gradient-to-br from-blue-gray-700 to-blue-gray-800 w-full grid grid-cols-2 ">
          <Typography variant="h6" className="p-2 " color="white">
         { inveneShow ? "New Stockitem" : edit ? "Edit Stock" : "Stock List"}
           </Typography>
          <Typography  className="pl-72 ">
           {inveneShow || edit ? (
              <Button variant="text" color="blue-gray" className=" text-white gap-1 ml-24  xl:flex" onClick={toggle}>
                Back
              </Button>
            ) : !view ?  (
             
             <Button
              variant="text"
              color="blue-gray"
              className=" text-white gap-1 ml-20  xl:flex"
              onClick={toggle}
            >
              
              <Square3Stack3DIcon className="h-5 w-5" color="" />
              Create 
            </Button>
            ) : ""
}
</Typography>
          </CardHeader>
          <CardBody className="p-0">
      
      <div className="w-full relative">
      {!edit && !inveneShow && (
    <div
      className={`${
        view ? 'opacity-50' : ''
      } transition-opacity duration-300`}
    >
      <StockTable
        setstockId={setstockId}
        setSelectedStock={setSelectedStock}
        setView={setView}
        setEdit={setEdit}
        okModalStock={okModalStock}
        okModal={okModal}
       
      />
    </div>
  )}

      
{view && (
    <div className="absolute inset-0 flex items-start justify-center">
      <Stockview setView={setView} view={view} setEdit={setEdit} setstockId={setstockId} ItemId={selectedStock} />
    </div>
  )}
   {(edit || inveneShow) && (
    <Grow in={edit || inveneShow} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <div>
    <Stockitem setOkModal={setOkModal} setinvenShow={setinvenShow} setOkModalStock={setOkModalStock} stockId={stockId} edit={edit} setEdit={setEdit} />
    </div>
    </Grow>
  )}
      </div>
          
           
        </CardBody>
       
      </Card>
    </>
  );
}

export default Inventory;
