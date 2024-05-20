import { UserCircleIcon,DocumentIcon,UserGroupIcon,InboxIcon,PlusIcon ,TrashIcon} from '@heroicons/react/24/solid'
import { Switch, Tooltip } from '@material-tailwind/react'
import React, { useState,useEffect, useRef } from 'react'
import axios from 'axios'
import Select,{ components } from 'react-select'
import { Alert, Datepicker, Spinner } from 'flowbite-react';
import moment from 'moment';
import { HiInformationCircle } from 'react-icons/hi'

const Deliverform = ({setOkModal,setdelivereShow,setView,setOkModaldeliver,deliverId,edit,setEdit,setSelecteddeliver,okM,deliverShow,setPlus}) => {
    const [open,setOpen] = useState(false);
    const [start,setStart] = useState(false)
    const [customerDetails,setcustomerDetails]=useState([])
    const [item,setItem]=useState([])
    const [loading, setLoading] = useState(false);
    const [valid,setvalid]= useState(false);
    const customerSelectRef = useRef(null);
    const selectRef = useRef(null);
    let subtotal = 0;
    
    const date=new Date();
    const [formData, setFormData] = useState({         
      CustomerDetail: '',
      VoucherDate: date,
      Duedate: date,
      VoucherNo: '',
      accno: '',
      Refrence: '',
      ItemDetail: [],
      ItemId: [],
      SDet_ID: [],
      Barcode: [],
      Description: [],
      UnitId: [],
      Sold_Qty: [],
      UnitPrice: [],
      Account: '',
      Tax: '',
      GrossAmt: [],
      GrossAmount:'',
    });
    const calculateSubtotal = () => {
      let calculatedSubtotal = 0;
      formData.ItemDetail.forEach((itemDetail, index) => {
        const product = parseFloat(formData.Sold_Qty[index] || 0) * parseFloat(formData.UnitPrice[index] || 0);
        calculatedSubtotal += product;
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        GrossAmount: calculatedSubtotal.toFixed(2), // Optionally, round to two decimal places
      }));
    
    };
    useEffect(() => {
      if (selectRef.current) {
        selectRef.current.focus();
      }
    }, [formData.ItemDetail]);
    useEffect(() => {
      calculateSubtotal();
    }, [formData.ItemDetail, formData.Sold_Qty, formData.UnitPrice]);
    useEffect(() => {
      customerSelectRef.current.focus();
    }, []);
    useEffect(() => {
      if (edit) {
        const fetchData = async () => {
          try {
            const VoucherNo = deliverId;
            const response = await axios.get(`http://localhost:8081/api/getDatadeliver/${VoucherNo}`);
            const data = response.data;
    
            // Update the state with the received data
            setFormData({
              CustomerDetail: data.CustomerDetail,
              VoucherDate: moment(data.VoucherDate).format('YYYY-MM-DD HH:mm:ss'),
              Duedate: moment(data.DueDate).format('YYYY-MM-DD HH:mm:ss'),
              VoucherNo: data.VoucherNo,
              Refrence: data.Refrence,
              ItemDetail: data.items.map(item => [
                `${item.ItemId || ''}`,
                `${item.Description || ''}`,
                `${item.UnitId || ''}`,
                 `${item.ItemName || ''}`,
                 `${item.Barcode || ''}`,
                
              ]),
              Sold_Qty: data.items.map(item => item.Sold_Qty),
              UnitPrice: data.items.map(item => item.UnitPrice),
              SDet_ID: data.items.map(item => item.SDet_ID),
              // ... other properties
            });
    
            console.log('Received Data:', formData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }
      else {
        const fetchMaxVoucherNo = async () => {
          try {
            const response = await axios.get('http://localhost:8081/api/getMaxNo');
            const { nextvoucherNo} = response.data;
            
          setFormData((prevFormData) => ({
            ...prevFormData,
            VoucherNo: nextvoucherNo, 
          }));
          } catch (error) {
            console.error('Error fetching max accno:', error);
          }
        };
    
        fetchMaxVoucherNo();
      }
    }, [edit, deliverId, setFormData]);
    
   
    
  
    useEffect(() => {
   if(deliverShow || edit) {
      axios.get('http://localhost:8081/api/getCustomerDetails')
      .then((response) => {
        setcustomerDetails(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching CustomerDetails: ', error);
      });
    }
  }, [deliverShow,edit]);
  useEffect(() => {
   
    axios.get('http://localhost:8081/api/getItem')
    .then((response) => {
      setItem(response.data);
    
    })
    .catch((error) => {
      console.error('Error fetching ItemDetails: ', error);
    });

}, []);
const handleEdit = (e) => {
  e.preventDefault();
  
  const VoucherNo = deliverId;
  
  // Update the voucher data
  const voucherDataToUpdate = {
    VoucherNo: formData.VoucherNo,
    items: formData.ItemDetail.map((itemDetail, index) => ({
      ItemId: itemDetail[0],
      Description: itemDetail[1],
      UnitId: itemDetail[2],
      Sold_Qty: formData.Sold_Qty[index],
      UnitPrice:formData.UnitPrice[index],
      GrossAmt: parseFloat(formData.Sold_Qty[index] || 0) * parseFloat(formData.UnitPrice[index] || 0),
      SDet_ID:formData.SDet_ID[index],
    
    
    })),

  };
  console.log('VoucherNo:', VoucherNo);
  console.log('voucherDataToUpdate:', voucherDataToUpdate);

  axios
    .put(`http://localhost:8081/api/update/${VoucherNo}`, voucherDataToUpdate)
    .then((voucherResponse) => {
      console.log('Response from updateVoucher:', voucherResponse.data);
      
      // Now update the invoice data
      axios
        .put(`http://localhost:8081/api/updatedeliver/${VoucherNo}`, formData)
        .then((deliverResponse) => {
          console.log('Response from updatedeliver:', deliverResponse.data);
          setEdit(false)
            setOkModal(true);

             setTimeout(() => {
             setOkModal(false);
             
              }, 1000);
              setSelecteddeliver(VoucherNo)
              setView(true) 
        })
        .catch((Error) => {
          console.error('Error updating data:', Error);
        });
    })
    .catch((voucherError) => {
      console.error('Error updating voucher data:', voucherError);
    });
    
};
  
const saveData = (e) => {
  setLoading(true)
  calculateSubtotal();
  e.preventDefault();
 

  const dataToSave = {
    VoucherNo: formData.VoucherNo,
    items: formData.ItemDetail.map((itemDetail, index) => ({
      ItemId: itemDetail[0],
      Description: itemDetail[1],
      UnitId: itemDetail[2],
      Sold_Qty: formData.Sold_Qty[index],
      UnitPrice: formData.UnitPrice[index],
      GrossAmt: parseFloat(formData.Sold_Qty[index] || 0) * parseFloat(formData.UnitPrice[index] || 0), 
    })),
  
  };
 
  axios
    .post('http://localhost:8081/api/savedeliver', dataToSave)
    .then((response) => {
      console.log('Response from save:', response.data);
      setFormData({
        CustomerDetail: '',
        VoucherNo: '',
        Refrence: '',
        ItemDetail: [],
        Sold_Qty: [],
      });
      setLoading(false)
      setdelivereShow(false)
      setOkModaldeliver(true);
      setSelecteddeliver(formData.VoucherNo)
        setTimeout(() => {
          setOkModaldeliver(false);
          
        }, 1000);
        setView(true)           
        
       
    })
    .catch((error) => {
      console.error('Error saving data: ', error);
    });

  axios
    .post('http://localhost:8081/api/savedel', formData)
    .then((response) => {
      console.log(response.data);
      setFormData({
        CustomerDetail: '',
        VoucherNo: '',
        Refrence: '',
        ItemDetail: [],
        Sold_Qty: [],
      });
      setLoading(false)
      setdelivereShow(false)
      setOkModaldeliver(true);
      setSelecteddeliver(formData.VoucherNo)
        setTimeout(() => {
          setOkModaldeliver(false);
         
        }, 1000);
        setView(true)
        
   
    })
    .catch((error) => {
      console.error('Error saving data: ', error);
    });
    
   
    
};


    const togglenew= ()=>{
        setOpen(!open)
    }
    const tabletoggle = () =>{
      setStart(!start)
    }
    const handleInput = (e, index) => {
      const { name, value } = e.target;
     
      if (name === 'ItemDetail') {
        const itemDetail = value.split(',');
        const updatedItemDetail = [...formData.ItemDetail];
        updatedItemDetail[index] = itemDetail;
    
        setFormData((prev) => ({
          ...prev,
          ItemDetail: updatedItemDetail,
        }));
      } 
      else if (name === 'CustomerDetail') {
        const [customerId, customerDisplayName, accno] = value.split(',');
        const selectedCustomer = customerDetails.find((customer) => customer.customerId === parseInt(customerId, 10));
        const creditDays = selectedCustomer ? selectedCustomer.dueOnReceipt : 0;
         const currentDate = moment();
        const dueDate = currentDate.add(creditDays, 'days').format('YYYY-MM-DD HH:mm:ss');

  setFormData((prev) => ({
    ...prev,
    CustomerDetail: value,
    Duedate: dueDate,
  }));
      } 
      else if (name === 'VoucherDate' || name === 'Duedate') {
    // Ensure that you set the correct date format here
    setFormData((prev) => ({
      ...prev,
      [name]: moment(value).format('YYYY-MM-DD HH:mm:ss'),
    }));
  }
       else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        console.log(formData.CustomerDetail)
      }
      console.log(formData)
    };
    
    const handleRemove = (index) => {
      const updatedItemDetails = formData.ItemDetail.filter((_, i) => i !== index);
      const updatedSoldQty = formData.Sold_Qty.filter((_, i) => i !== index);
      const updatedUnitPrice = formData.UnitPrice.filter((_, i) => i !== index);
      const updatedSDet_ID = formData.SDet_ID.filter((_, i) => i !== index);
    
      setFormData((prev) => ({
        ...prev,
        ItemDetail: updatedItemDetails,
        Sold_Qty: updatedSoldQty,
        UnitPrice: updatedUnitPrice,
        SDet_ID: updatedSDet_ID,
      }));
    };
    const handleQuantityChange = (e, index) => {
      const { value } = e.target;
      setFormData((prev) => {
        const updatedSoldQty = [...prev.Sold_Qty];
        updatedSoldQty[index] = value;
        return { ...prev, Sold_Qty: updatedSoldQty };
      });
    };
    const handleUnitPriceChange = (e, index) => {
      const { value } = e.target;
      setFormData((prev) => {
        const updatedUnitPrice = [...prev.UnitPrice];
        updatedUnitPrice[index] = value;
        return { ...prev, UnitPrice: updatedUnitPrice };
      });
    };
    const handleAddRow = () => {
      const isCurrentRowValid =
      formData.ItemDetail.length === 0 ||
      formData.ItemDetail[formData.ItemDetail.length - 1].every((field) => field.trim() !== "");

    if (!isCurrentRowValid) {
      setvalid(true);

      setTimeout(() => {
        setvalid(false);
      }, 2000);
      return;
    }
      const newItemDetail = ["", "", "", "", ""];
      setFormData((prev) => ({
        ...prev,
        ItemDetail: [...prev.ItemDetail, newItemDetail],
      }));
    };
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent the default tab behavior
        handleAddRow();
        window.scrollTo(1, document.body.scrollHeight);
      }
    };
    const CustomDropdownIndicator = (props) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <PlusIcon className='w-4 h-4 text-black cursor-pointer' onClick={handlenew} />
          </components.DropdownIndicator>
        )
      );
    };
    const handlenew = () =>{
      
      if(edit){
        setPlus(true)
        
      }else{
        setPlus(true)
      setdelivereShow(false)
      setEdit(false)
      }
      
    }
    
    
   
  return (
    <div className=' w-full rounded-xl bg-white h-full'>
          {okM && (
       <Alert color="success" icon={HiInformationCircle}>
        <span className="font-medium">Info alert!</span> Customer Created Successfully
      </Alert> 
      )}
      
         {loading && (
          <div className="flex items-center justify-center h-64">
            <Spinner aria-label="Saving" />
          </div>
        )}
       {!loading &&(<div className='p-4'>
            <span className='w-full h-full text-xs bg-transparent relative border-b border-gray-400'>
                <form className='space-y-4' method='post' onSubmit={edit ? handleEdit : saveData}> 
                <div className='grid grid-cols-4 gap-4'>
                <div>
                    <label
                      html For="sno"
                      className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    To
                    </label>
                    <div class="absolute  items-center pl-2 mt-2  pointer-events-none">
                        <UserCircleIcon className="w-6 h-6  text-gray-500 dark:text-gray-400"  />
                       
                   </div>
                   <Select
  options={customerDetails.map((item) => ({
    label: item.companyName,
    value: `${item.customerId},${item.companyName},${item.accno}`,
  }))}
  components={{ DropdownIndicator: CustomDropdownIndicator }}
  placeholder={formData.CustomerDetail ? formData.CustomerDetail.split(',')[1] : 'Select Customers'}
  onChange={(selectedOption) => handleInput({ target: { name: 'CustomerDetail', value: selectedOption.value } })}
  name='CustomerDetail'
  ref={customerSelectRef}
  autoComplete='offline'
  id='customerSelects'
  required={!edit}
  menuPortalTarget={document.body} // Render the menu outside the DOM hierarchy
  styles={{
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, 
    }),
    menu: (base) => ({
      ...base,
      maxHeight: 'auto',
       
    }),
    option: (provided) => ({
      ...provided,
      fontSize: 'small', // Set the font size to small
    }),
  }}
/>
                  </div>
                  <div>
                  <label
                      html For="dtcreate"
                      className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Issue Date
                    </label>
                 
                    <div class="relative w-full max-h-8">
                    <Datepicker
                    
  name="VoucherDate"
  value={new Date(formData.VoucherDate).toLocaleDateString()}
  maxDate={new Date} 
  onSelectedDateChanged={(date) => handleInput({ target: { name: 'VoucherDate', value: date } })}
/>

 
</div>  
                
                  </div>
                  <div>
                  <label
                      html For="dtcreate"
                      className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                       Due Date
                    </label>
                 
<div class="relative w-full max-h-10">
  <Datepicker name='Duedate' value={new Date(formData.Duedate).toLocaleDateString()} onSelectedDateChanged={(date) => handleInput({ target: { name: 'Duedate', value: date} })} />
  
 
</div>    
                  </div>
                  <div>
                    <label
                      html For="sno"
                      className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Invoice number
                    </label>
                    <div class="absolute inset-y-0 flex justify-end pl-2 mt-8  pointer-events-none">
                        <DocumentIcon className="w-6 h-5 text-gray-500 dark:text-gray-400" />

                   </div>
                    <input
                       type="text"
                      name="VoucherNo"
                      value={formData.VoucherNo}
                      onChange={handleInput}
                     
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                      readOnly
                      required
                    />
                  </div>

                </div>
                <div className='grid grid-cols-4 gap-4'>
                <div className=''>
                    <label
                      html For="sno"
                      className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Reference
                    </label>
                    <div class="absolute inset-y-0 left-0  pl-2  mt-28  pointer-events-none">
                        <UserGroupIcon className="w-6 h-5 text-gray-500 dark:text-gray-400" />

                   </div>
                    <input
                       type="text"
                      name="Refrence"
                      value={formData.Refrence}
                      onChange={handleInput}
                     
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 p-1 h-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                     
                   
                    />
                  </div>
                 
                  
                  
               
                </div>
                <div>  <div className='pt-4'>
              
              <div className=' w-full justify-center'>
<div className="relative overflow-x-auto shadow-md ">
<table className="w-full text-xs text-left text-gray-500 dark:text-gray-600">
<thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">

<tr>
<th scope="col" className="p-1">
<div className="flex items-center">
<PlusIcon className="w-5 h-5 text-gray-800 cursor-pointer dark:text-gray-400"   onClick={handleAddRow} />
</div>
</th>
<th scope="col" className="px-4 py-3">

Sno
</th>
<th scope="col" className="px-4 py-3">
Barcode
</th>
<th scope="col" className="px-4 py-3">
Name
</th>
<th scope="col" className="px-4 py-3">
Unit
</th>
<th scope="col" className="px-4 py-3">
Qty
</th>
<th scope="col" className="px-4 py-3">
Prices
</th>
<th scope="col" className="px-4 py-3">
Account
</th>
<th scope="col" className="px-4 py-3">
Tax rate
</th>
<th scope="col" className="px-4 py-3">
Amount
</th>
<th scope="col" className="px-4 py-3">
Action
</th>
</tr>
</thead>
<tbody>

{formData.ItemDetail && formData.ItemDetail.map((itemDetail, index) => {

const product = parseFloat(formData.Sold_Qty[index] || 0) * parseFloat(formData.UnitPrice[index] || 0) ;
subtotal += product;

return (
<tr key={index} className="bg-white text-xs border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
<td className="">
<div className="flex items-center"></div>
</td>
<td className="px-4 py-3">{index + 1}</td>
<td className="px-4 py-3">
<Select
  
  onChange={(selectedOption) => handleInput({ target: { name: 'ItemDetail', value: selectedOption.value } }, index)}
  name='ItemDetail'
 ref={selectRef}
  options={item.map((item) => ({
    label: `${item.Barcode},${item.ItemName}`,
    value: `${item.ItemId},${item.AddDesc},${item.UnitId},${item.ItemName},${item.Barcode}`,
  }))}
  placeholder={itemDetail[4] || 'Select'}
  menuPortalTarget={document.body} // Render the menu outside the DOM hierarchy
  styles={{
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    menu: (base) => ({
      ...base,
      maxHeight: '100px',
      overflowY: 'auto',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: 'small', // Set the font size to small
    
    }),
   
  }}
  menuPosition="fixed"
/>
</td>
<td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{itemDetail[3] || 'Name'}</td>
<td className="px-4 py-4">{itemDetail[2] || 'unit'}</td>
<td className="px-4 py-4">
<input
type="number"
value={formData.Sold_Qty[index] || ""}
className="block w-20 h-8 rounded-lg border border-gray-300 bg-gray-50 p-1 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
onChange={(e) => handleQuantityChange(e, index)}
placeholder='0.00'
required/>
</td>
<td className="px-4 py-4">
<input
type="number"
value={formData.UnitPrice[index] || ""}
className="block w-20 h-8 rounded-lg border border-gray-300 bg-gray-50 p-1 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
onChange={(e) => handleUnitPriceChange(e, index)}
onKeyDown={handleKeyPress}
placeholder='0.00'
required/>
</td>
<td className="px-4 py-4">Sales</td>
<td className="px-4 py-4">0.00</td>
<td className="px-4 py-4">{product.toFixed(2)}</td>
<td className="px-4 py-4">
<TrashIcon onClick={(e) => handleRemove(index)} className="font-medium w-4 h-4 text-red-600 cursor-pointer dark:text-red-500 hover:underline"/>
</td>
</tr>
);
})}

</tbody>

</table>
{valid && (
  <Alert color="success" icon={HiInformationCircle}>
  <span className="font-medium relative">Info alert!</span> fill al the fields
</Alert>
)}
</div>
</div>
         </div> 
         <div className='flex justify-end'>
             <div className='grid grid-cols-2 ml-12 mr-4 pt-5 gap-5'>
                  <label >Sub Total</label>
                  <input
 
 
  placeholder={subtotal.toFixed(2)}
  readOnly
/>
                  <label  >Total Tax</label>
                  <label >00.00</label>
                  
                 </div>
                 </div>   </div> 
              
      

                   <div className='flex pt-10 -ml-5 justify-end'>
                <button type="submit"  class="text-gray-900 bg-gray-300 shadow-md hover:bg-gray-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2">
  <svg class="w-4 h-4 mr-3 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
  { edit ? 'Update and Close' : 'Save and Close'}
</button>
                </div>
                </form>
               
            
                
            </span>
        </div>
        )} 
    </div>
  )
}

export default Deliverform