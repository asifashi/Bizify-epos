import { UserCircleIcon,DocumentIcon,UserGroupIcon,InboxIcon,PlusIcon ,TrashIcon} from '@heroicons/react/24/solid'
import { Switch, Tooltip } from '@material-tailwind/react'
import React, { useState,useEffect, useRef } from 'react'
import axios from 'axios'
import Select,{ components } from 'react-select'
import { Alert, Datepicker,Spinner } from 'flowbite-react';
import moment from 'moment';
import CustomizedHook from './Delivernote'
import { HiInformationCircle } from 'react-icons/hi'
import { useQuotation } from '@/context/quotation'
import { data } from 'autoprefixer'

const Invoiceform = ({setPlus,plus,edit,invoiceId,setEdit,setOkModal,setOkModalStock,setinvoiceShow,setView,setSelectedInvoice,invoiceShow,okM}) => {
    const [open,setOpen] = useState(false);
    const [start,setStart] = useState(false)
    const [customerDetails,setcustomerDetails]=useState([])
    const [item,setItem]=useState([])
    const [deliveryNotes, setDeliveryNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deliveryNoteDetails, setDeliveryNoteDetails] = useState([]);
    const [showDeliveryNotes, setShowDeliveryNotes] = useState(false);
    const [selectedDeliveryNoteId, setSelectedDeliveryNoteId] = useState([]);
    const [selecteds,setselecteds]=useState('')
    const [valid,setvalid]= useState(false)
    const customerSelectRef = useRef(null);
    const { quotations,setQuotation,qtid } = useQuotation();
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
      ItemName:[],
      AddDesc:[],
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
      DeliveryNote: [],
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
      // Focus on the customer select field when the component mounts
      customerSelectRef.current.focus();
    }, []);
  
    useEffect(() => {
      calculateSubtotal();
      
    }, [formData.ItemDetail, formData.Sold_Qty, formData.UnitPrice]);
    useEffect(() => {
      // Focus on the customer select field
      document.getElementById('customerSelect').focus();
    }, []);
    useEffect(() => {
      if (edit) {
        setQuotation(false)
        const fetchData = async () => {
          try {
            const VoucherNo = invoiceId;
            const response = await axios.get(`http://localhost:8081/api/getFormData/${VoucherNo}`);
            const data = response.data;
           console.log(data)
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
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }
      else {
        const fetchMaxVoucherNo = async () => {
          try {
            const response = await axios.get('http://localhost:8081/api/getMaxvoucherNo');
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
    }, [edit, invoiceId, setFormData]);
    
    useEffect(() => {
      if (quotations) {
        const fetchData = async () => {
          try {
            const VoucherNo = qtid;
          const response = await axios.get(`http://localhost:8081/api/getDataquotation/${VoucherNo}`);
          const data = response.data;
    
          // Update the state with the received data
          setFormData((prev) =>
          ({
            ...prev,
            CustomerDetail: data.CustomerDetail,
            VoucherDate: moment(data.VoucherDate).format('YYYY-MM-DD HH:mm:ss'),
            Duedate: moment(data.DueDate).format('YYYY-MM-DD HH:mm:ss'),
            Refrence: data.Refrence,
            status: data.status,
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
            Addi_Desc: data.items.map(item => item.Addi_Desc),
            // ... other properties
          }));
    
          console.log(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }; 
        };
    
        fetchData();
      }
   
    }, [quotations, qtid, setFormData]);
     
    
  
    useEffect(() => {
      if(invoiceShow || edit)  {
      axios.get('http://localhost:8081/api/getCustomerDetails')
      .then((response) => {
        setcustomerDetails(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching CustomerDetails: ', error);
      });
    }

  }, [invoiceShow,edit]);
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
  
  const VoucherNo = invoiceId;
  
  // Update the voucher data
  const voucherDataToUpdate = {
    VoucherNo: formData.VoucherNo,
    DeliveryNote:formData.DeliveryNote,
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
    .put(`http://localhost:8081/api/updateVoucher/${VoucherNo}`, voucherDataToUpdate)
    .then((voucherResponse) => {
      console.log('Response from updateVoucher:', voucherResponse.data);
      
   
      axios
        .put(`http://localhost:8081/api/updateinvoice/${VoucherNo}`, formData)
        .then((invoiceResponse) => {
          console.log('Response from updateInvoice:', invoiceResponse.data);
          setEdit(false)
          setinvoiceShow(false)
            setOkModal(true);
            setSelectedInvoice(VoucherNo)
             setTimeout(() => {
             setOkModal(false);
           
              }, 1000);
              setView(true)
              
              
        })
        .catch((invoiceError) => {
          console.error('Error updating invoice data:', invoiceError);
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
    DeliveryNote:formData.DeliveryNote,
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
    .post('http://localhost:8081/api/saveVoucher', dataToSave)
    .then((response) => {
      console.log('Response from saveVoucher:', response.data);
      setFormData({
        CustomerDetail: '',
        VoucherNo: '',
        Refrence: '',
        ItemDetail: [],
        Sold_Qty: [],
      });
      setLoading(false)
      setinvoiceShow(false)
      setOkModalStock(true);
      setSelectedInvoice(formData.VoucherNo) 
      setQuotation(false)
        setTimeout(() => {
          setOkModalStock(false);
          
        }, 1000);
        
        setView(true)          
        
       
    })
    .catch((error) => {
      console.error('Error saving data: ', error);
    });

  axios
    .post('http://localhost:8081/api/saveInvoice', formData)
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
      setinvoiceShow(false)
      setOkModalStock(true);
      setQuotation(false)
      setSelectedInvoice(formData.VoucherNo)
        setTimeout(() => {
          setOkModalStock(false);
          
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
   
    const handleInput = async (e, index) => {
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
        const [customerId, companyName, accno] = value.split(',');
        const selectedCustomer = customerDetails.find((customer) => customer.customerId === parseInt(customerId, 10));
        const creditDays = selectedCustomer ? selectedCustomer.dueOnReceipt : 0;
        const currentDate = moment();
        const dueDate = currentDate.add(creditDays, 'days').format('YYYY-MM-DD HH:mm:ss');
      
        setFormData((prev) => ({
          ...prev,
          CustomerDetail: value,
          Duedate: dueDate,
        }));
      
        const fetchDeliveryNotes = async () => {
          try {
            const response = await axios.get(`http://localhost:8081/api/getDeliveryNotes/${customerId}`);
            const data = response.data;
            setDeliveryNotes(data);
            setselecteds(customerId || 0)
            console.log(data)

          } catch (error) {
            console.error('Error fetching delivery notes:', error);
          }
        };
      
        fetchDeliveryNotes();
      

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
    useEffect(() => {
      console.log('Selected Delivery Note ID:', selectedDeliveryNoteId);
      fetchDeliveryNoteDetails();
    }, [selectedDeliveryNoteId]);
    const fetchDeliveryNoteDetails = async () => {
      try {
        if ((Array.isArray(selectedDeliveryNoteId) && selectedDeliveryNoteId.length === 0)) {
          console.error('No selected delivery note ID');
          return;
        }
    
        const response = await axios.get(`http://localhost:8081/api/getDeliveryNoteDetails/${selectedDeliveryNoteId}`);
        const data = response.data;

        setDeliveryNoteDetails(data);
        
        setFormData((prev) =>
         ({
          ...prev,
          DeliveryNote:data.VoucherNo,
          ItemDetail: [...prev.ItemDetail, ...data.items.map((item) => [
           
            `${item.ItemId || ''}`,
            `${item.Description || ''}`,
            `${item.UnitId || ''}`,
            `${item.ItemId} ${item.Description}`,
            `${item.Barcode || ''}`,
            `${item.ItemName || ''}`,
        
           
          ])],
          Sold_Qty: [...prev.Sold_Qty, ...data.items.map((item) => item.Sold_Qty || '')],
          UnitPrice: [...prev.UnitPrice, ...data.items.map((item) => item.UnitPrice || '')],
        
          // ... other properties
        }));
        
      } catch (error) {
        console.error('Error fetching delivery note details:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
        }
      }
    };
    const handleAddRow = (index) => {
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
   
    
useEffect(() => {
  if (selectRef.current) {
    selectRef.current.focus();
  }
}, [formData.ItemDetail]);
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
      setinvoiceShow(false)
      setEdit(false)
      }
      
    }
    console.log(plus)
   
  return (
    <div className=' w-full relative rounded-xl bg-white max-h-full'>
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
        {!loading && (
        <div className='p-4'>
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
  required={!edit && !quotations}
  ref={customerSelectRef}
  id='customerSelect'
  onChange={(selectedOption) => handleInput({ target: { name: 'CustomerDetail', value: selectedOption.value } })}
  name='CustomerDetail'
  menuPortalTarget={document.body} // Render the menu outside the DOM hierarchy
  styles={{
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, 
    }),
    menu: (base) => ({
      ...base,
      maxHeight: 'auto',
      overflowY: 'auto',  
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
                  <div className=''>
                    
                   <CustomizedHook deliveryNotes={deliveryNotes} selecteds={selecteds} formData={formData} setFormData={setFormData}  setDeliveryNotes={setDeliveryNotes} setSelectedDeliveryNoteId={setSelectedDeliveryNoteId}  />


                  </div>
                 
                  {/* <div className='grid col-span-3'>
                    
                    <span
                      
                      className="mb-1 w-1/2  block text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Online Payments
                    <span className='pl-2 pt-2'>
                    <Switch onClick={togglenew} className='w-10 hover:bg-gray-200'/>
                    </span>
                    </span>
                  
                   
                   {open &&

                  <div>
            
                   <button type="button" class="text-gray-900 w-1/2 h-8 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2">
  <svg aria-hidden="true" class="w-8 h-3 mr-2 -ml-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996" fill="#0E4595"/><path d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718" fill="#F2AE14"/></svg>
  Pay with Visa
</button>

    <button type="button" class="text-gray-900 bg-white  w-1/2 h-8 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
  <svg aria-hidden="true" class="h-4 mr-2 -ml-1 w-7" viewBox="0 0 601 360" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M359.01 179.504C359.01 278.647 278.639 359.004 179.5 359.004C80.361 359.004 0 278.643 0 179.504C0 80.3709 80.362 0.00390625 179.5 0.00390625C278.637 0.00390625 359.01 80.3749 359.01 179.504Z" fill="#D9222A"/><path d="M420.489 0C374.11 0 331.846 17.596 299.989 46.467C293.499 52.356 287.441 58.704 281.864 65.463H318.131C323.096 71.5 327.667 77.85 331.816 84.475H268.181C264.354 90.597 260.9 96.944 257.839 103.483H342.152C345.046 109.668 347.583 116.013 349.753 122.487H250.24C248.15 128.721 246.408 135.067 245.023 141.495H354.963C357.652 153.985 359.008 166.726 359.005 179.503C359.005 199.438 355.751 218.615 349.751 236.524H250.238C252.402 243.001 254.938 249.348 257.834 255.532H342.15C339.087 262.073 335.631 268.421 331.803 274.545H268.178C272.325 281.165 276.897 287.511 281.863 293.541H318.122C312.552 300.313 306.492 306.668 299.992 312.554C331.849 341.42 374.109 359.008 420.492 359.008C519.631 359.008 600.002 278.647 600.002 179.508C600.002 80.379 519.631 0.00799561 420.492 0.00799561" fill="#EE9F2D"/><path d="M576.07 279.564C576.07 276.365 578.662 273.763 581.866 273.763C585.07 273.763 587.662 276.365 587.662 279.564C587.662 282.763 585.07 285.365 581.866 285.365C578.662 285.365 576.07 282.763 576.07 279.564ZM581.866 283.972C584.3 283.971 586.273 281.998 586.274 279.564C586.274 277.132 584.303 275.162 581.872 275.16H581.866C579.437 275.157 577.466 277.123 577.462 279.551V279.565C577.46 281.998 579.43 283.971 581.862 283.973C581.863 283.972 581.865 283.972 581.866 283.972V283.972ZM581.083 282.112H579.896V277.016H582.045C582.495 277.016 582.953 277.016 583.35 277.27C583.763 277.549 583.996 278.041 583.996 278.549C583.996 279.12 583.658 279.653 583.112 279.861L584.05 282.111H582.735L581.956 280.094H581.085L581.083 282.112V282.112ZM581.083 279.222H581.741C581.987 279.222 582.246 279.243 582.467 279.122C582.662 278.997 582.763 278.763 582.763 278.538C582.758 278.329 582.651 278.136 582.475 278.02C582.268 277.891 581.939 277.919 581.717 277.919H581.083V279.222ZM137.583 199.159C135.537 198.921 134.638 198.858 133.233 198.858C122.187 198.858 116.595 202.645 116.595 210.126C116.595 214.737 119.324 217.671 123.582 217.671C131.521 217.671 137.241 210.112 137.583 199.159V199.159ZM151.754 232.155H135.608L135.979 224.479C131.053 230.544 124.483 233.428 115.553 233.428C104.99 233.428 97.7492 225.178 97.7492 213.199C97.7492 195.175 110.345 184.658 131.966 184.658C134.174 184.658 137.008 184.857 139.907 185.228C140.511 182.787 140.67 181.74 140.67 180.427C140.67 175.519 137.274 173.69 128.17 173.69C118.637 173.582 110.774 175.961 107.545 177.023C107.749 175.794 110.245 160.364 110.245 160.364C119.957 157.518 126.361 156.447 133.57 156.447C150.302 156.447 159.166 163.96 159.149 178.159C159.182 181.964 158.552 186.659 157.57 192.83C155.879 203.564 152.25 226.551 151.754 232.155V232.155ZM89.5962 232.155H70.1092L81.2712 162.158L56.3462 232.155H43.0672L41.4252 162.558L29.6922 232.155H11.4502L26.6872 141.099H54.7082L56.4082 192.067L73.5002 141.099H104.667L89.5962 232.155ZM444.566 199.159C442.529 198.921 441.625 198.858 440.224 198.858C429.183 198.858 423.59 202.645 423.59 210.126C423.59 214.737 426.316 217.671 430.573 217.671C438.513 217.671 444.237 210.112 444.566 199.159V199.159ZM458.75 232.155H442.604L442.97 224.479C438.044 230.544 431.47 233.428 422.548 233.428C411.983 233.428 404.748 225.178 404.748 213.199C404.748 195.175 417.336 184.658 438.961 184.658C441.169 184.658 443.998 184.857 446.895 185.228C447.499 182.787 447.658 181.74 447.658 180.427C447.658 175.519 444.266 173.69 435.162 173.69C425.629 173.582 417.775 175.961 414.533 177.023C414.737 175.794 417.242 160.364 417.242 160.364C426.954 157.518 433.354 156.447 440.555 156.447C457.295 156.447 466.159 163.96 466.142 178.159C466.174 181.964 465.545 186.659 464.563 192.83C462.879 203.564 459.242 226.551 458.75 232.155V232.155ZM238.36 231.03C233.027 232.709 228.869 233.428 224.36 233.428C214.398 233.428 208.961 227.703 208.961 217.161C208.819 213.89 210.394 205.281 211.632 197.424C212.757 190.507 220.081 146.895 220.081 146.895H239.452L237.189 158.103H248.888L246.246 175.899H234.504C232.254 189.982 229.05 207.524 229.013 209.849C229.013 213.665 231.05 215.332 235.684 215.332C237.905 215.332 239.624 215.105 240.938 214.632L238.36 231.03V231.03ZM297.752 230.43C291.098 232.464 284.677 233.447 277.873 233.43C256.189 233.409 244.886 222.084 244.886 200.398C244.886 175.085 259.266 156.451 278.785 156.451C294.756 156.451 304.956 166.884 304.956 183.247C304.956 188.676 304.256 193.976 302.568 201.459H263.994C262.689 212.2 269.564 216.676 280.831 216.676C287.766 216.676 294.019 215.247 300.973 212.013L297.752 230.43V230.43ZM286.864 186.53C286.971 184.987 288.919 173.313 277.851 173.313C271.68 173.313 267.268 178.017 265.471 186.53H286.864V186.53ZM163.444 181.513C163.444 190.88 167.986 197.339 178.286 202.189C186.178 205.898 187.398 206.999 187.398 210.359C187.398 214.976 183.919 217.06 176.207 217.06C170.394 217.06 164.986 216.152 158.749 214.138C158.749 214.138 156.186 230.459 156.069 231.24C160.499 232.207 164.449 233.101 176.348 233.43C196.911 233.43 206.407 225.601 206.407 208.68C206.407 198.505 202.431 192.534 192.67 188.046C184.499 184.296 183.562 183.459 183.562 180.001C183.562 175.997 186.799 173.955 193.099 173.955C196.924 173.955 202.149 174.363 207.099 175.067L209.874 157.892C204.828 157.092 197.178 156.45 192.724 156.45C170.923 156.451 163.377 167.838 163.444 181.513V181.513ZM392.534 158.397C397.946 158.397 402.992 159.818 409.946 163.318L413.134 143.555C410.28 142.434 400.23 135.855 391.717 135.855C378.676 135.855 367.652 142.326 359.897 153.005C348.588 149.259 343.939 156.83 338.24 164.372L333.177 165.551C333.56 163.068 333.906 160.601 333.789 158.105H315.893C313.448 181.022 309.115 204.233 305.722 227.18L304.838 232.156H324.334C327.588 211.013 329.371 197.476 330.455 188.314L337.796 184.23C338.893 180.152 342.325 178.772 349.213 178.939C348.287 183.947 347.824 189.03 347.83 194.123C347.83 218.348 360.9 233.431 381.88 233.431C387.284 233.431 391.921 232.719 399.101 230.773L402.531 210.014C396.073 213.195 390.772 214.691 385.972 214.691C374.643 214.691 367.788 206.328 367.788 192.506C367.788 172.455 377.984 158.397 392.534 158.397" fill="black"/><path d="M95.2095 226.744H75.7184L86.8895 156.756L61.9635 226.744H48.6805L47.0385 157.156L35.3055 226.744H17.0645L32.3015 135.702H60.3224L61.1104 192.064L80.0145 135.702H110.281L95.2095 226.744Z" fill="white"/><path d="M557.52 141.104L553.199 167.413C547.87 160.4 542.145 155.325 534.587 155.325C524.754 155.325 515.804 162.78 509.945 173.75C501.787 172.058 493.348 169.187 493.348 169.187L493.344 169.254C494.002 163.12 494.265 159.379 494.206 158.108H476.306C473.868 181.025 469.535 204.236 466.149 227.183L465.256 232.159H484.748C487.381 215.063 489.396 200.868 490.881 189.608C497.539 183.592 500.873 178.342 507.602 178.692C504.623 185.897 502.877 194.195 502.877 202.709C502.877 221.222 512.243 233.434 526.41 233.434C533.552 233.434 539.031 230.972 544.377 225.263L543.464 232.147H561.899L576.741 141.105L557.52 141.104V141.104ZM533.149 215.045C526.515 215.045 523.166 210.137 523.166 200.449C523.166 185.894 529.437 175.574 538.278 175.574C544.973 175.574 548.598 180.678 548.598 190.083C548.599 204.762 542.228 215.045 533.149 215.045V215.045Z" fill="black"/><path d="M143.19 193.764C141.148 193.528 140.244 193.465 138.844 193.465C127.798 193.465 122.21 197.252 122.21 204.731C122.21 209.335 124.939 212.278 129.189 212.278C137.136 212.277 142.857 204.719 143.19 193.764V193.764ZM157.368 226.748H141.222L141.589 219.085C136.668 225.139 130.089 228.035 121.168 228.035C110.601 228.035 103.363 219.785 103.363 207.806C103.363 189.774 115.955 179.264 137.58 179.264C139.788 179.264 142.622 179.464 145.518 179.835C146.122 177.394 146.281 176.348 146.281 175.027C146.281 170.118 142.889 168.298 133.785 168.298C124.248 168.19 116.389 170.569 113.156 171.619C113.36 170.394 115.856 154.982 115.856 154.982C125.564 152.124 131.976 151.053 139.176 151.053C155.913 151.053 164.78 158.57 164.764 172.757C164.793 176.578 164.16 181.27 163.18 187.432C161.493 198.156 157.861 221.156 157.368 226.748V226.748ZM418.748 138.156L415.557 157.923C408.607 154.427 403.557 153.003 398.15 153.003C383.599 153.003 373.4 167.061 373.4 187.109C373.4 200.93 380.257 209.29 391.584 209.29C396.384 209.29 401.68 207.798 408.138 204.615L404.717 225.365C397.533 227.322 392.901 228.035 387.492 228.035C366.515 228.035 353.441 212.951 353.441 188.726C353.441 156.176 371.5 133.426 397.329 133.426C405.836 133.427 415.89 137.035 418.748 138.156V138.156ZM450.191 193.764C448.15 193.528 447.25 193.465 445.844 193.465C434.803 193.465 429.211 197.252 429.211 204.731C429.211 209.335 431.94 212.278 436.194 212.278C444.132 212.277 449.857 204.719 450.191 193.764V193.764ZM464.369 226.748H448.219L448.59 219.085C443.665 225.139 437.09 228.035 428.169 228.035C417.606 228.035 410.365 219.785 410.365 207.806C410.365 189.774 422.961 179.264 444.577 179.264C446.79 179.264 449.619 179.464 452.518 179.835C453.119 177.394 453.281 176.348 453.281 175.027C453.281 170.118 449.888 168.298 440.786 168.298C431.253 168.19 423.39 170.569 420.156 171.619C420.36 170.394 422.86 154.982 422.86 154.982C432.569 152.124 438.976 151.053 446.176 151.053C462.917 151.053 471.78 158.57 471.759 172.757C471.792 176.578 471.163 181.27 470.18 187.432C468.498 198.156 464.857 221.156 464.369 226.748ZM243.979 225.627C238.641 227.306 234.483 228.035 229.979 228.035C220.017 228.035 214.58 222.309 214.58 211.767C214.442 208.488 216.018 199.887 217.255 192.031C218.375 185.105 225.7 141.497 225.7 141.497H245.068L242.808 152.709H252.749L250.103 170.497H240.128C237.878 184.589 234.665 202.117 234.632 204.447C234.632 208.277 236.673 209.929 241.303 209.929C243.524 209.929 245.241 209.713 246.557 209.238L243.979 225.627V225.627ZM303.37 225.035C296.72 227.068 290.291 228.047 283.491 228.035C261.806 228.014 250.504 216.689 250.504 195.002C250.504 169.681 264.883 151.052 284.403 151.052C300.374 151.052 310.574 161.481 310.574 177.852C310.574 183.286 309.874 188.585 308.19 196.064H269.616C268.31 206.805 275.185 211.286 286.453 211.286C293.383 211.286 299.641 209.851 306.591 206.609L303.37 225.035V225.035ZM292.479 181.123C292.595 179.585 294.539 167.906 283.466 167.906C277.299 167.906 272.887 172.623 271.091 181.123H292.479ZM169.059 176.118C169.059 185.485 173.601 191.936 183.901 196.793C191.793 200.502 193.013 201.605 193.013 204.965C193.013 209.581 189.53 211.664 181.825 211.664C176.009 211.664 170.6 210.756 164.358 208.743C164.358 208.743 161.804 225.064 161.687 225.844C166.108 226.811 170.062 227.694 181.962 228.035C202.528 228.035 212.021 220.206 212.021 203.289C212.021 193.109 208.05 187.139 198.284 182.652C190.117 178.893 189.171 178.068 189.171 174.606C189.171 170.606 192.417 168.547 198.713 168.547C202.534 168.547 207.759 168.968 212.717 169.672L215.488 152.493C210.446 151.693 202.796 151.052 198.342 151.052C176.538 151.052 168.996 162.431 169.059 176.118V176.118ZM567.509 226.748H549.071L549.988 219.855C544.641 225.572 539.163 228.035 532.02 228.035C517.854 228.035 508.492 215.822 508.492 197.309C508.492 172.679 523.013 151.917 540.2 151.917C547.759 151.917 553.479 155.004 558.804 162.013L563.129 135.705H582.35L567.509 226.748V226.748ZM538.763 209.639C547.838 209.639 554.213 199.356 554.213 184.686C554.213 175.281 550.584 170.177 543.888 170.177C535.051 170.177 528.773 180.492 528.773 195.052C528.772 204.738 532.13 209.639 538.763 209.639ZM481.921 152.71C479.48 175.627 475.148 198.84 471.759 221.773L470.867 226.749H490.358C497.33 181.474 499.016 172.632 509.946 173.74C511.688 164.473 514.928 156.357 517.345 152.261C509.182 150.561 504.624 155.174 498.657 163.936C499.128 160.148 499.99 156.469 499.819 152.711L481.921 152.71V152.71ZM321.501 152.71C319.055 175.627 314.722 198.84 311.334 221.773L310.446 226.749H329.946C336.909 181.474 338.592 172.632 349.516 173.74C351.266 164.473 354.507 156.357 356.915 152.261C348.761 150.561 344.198 155.174 338.236 163.936C338.707 160.148 339.56 156.469 339.398 152.711L321.501 152.71V152.71ZM576.071 220.951C576.067 217.752 578.657 215.156 581.855 215.152H581.867C585.064 215.148 587.66 217.738 587.663 220.935V220.951C587.662 224.152 585.068 226.746 581.867 226.748C578.666 226.746 576.072 224.152 576.071 220.951V220.951ZM581.867 225.356C584.298 225.358 586.269 223.387 586.27 220.957V220.953C586.273 218.52 584.302 216.547 581.871 216.545H581.867C579.432 216.546 577.46 218.519 577.459 220.953C577.461 223.385 579.434 225.356 581.867 225.356ZM581.083 223.485H579.895V218.403H582.048C582.494 218.403 582.957 218.412 583.344 218.657C583.761 218.94 583.998 219.424 583.998 219.931C583.998 220.506 583.661 221.043 583.11 221.248L584.051 223.484H582.731L581.952 221.475H581.082L581.083 223.485ZM581.083 220.606H581.736C581.982 220.606 582.249 220.625 582.465 220.506C582.661 220.381 582.761 220.145 582.761 219.918C582.752 219.708 582.647 219.514 582.474 219.395C582.27 219.278 581.932 219.311 581.711 219.311H581.082L581.083 220.606V220.606Z" fill="white"/></svg>
  Pay with MasterCard
</button>

<button type="button" class="text-white  w-1/2 h-8 bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 mr-2 mb-2">
  <svg aria-hidden="true" class="w-10 h-3 mr-2 -ml-1" viewBox="0 0 256 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.812 0L0 63.76H34.492L38.768 53.594H48.542L52.818 63.76H90.784V56.001L94.167 63.76H113.806L117.189 55.837V63.76H196.148L205.749 53.858L214.739 63.76L255.294 63.842L226.391 32.058L255.294 0H215.368L206.022 9.71899L197.315 0H111.418L104.042 16.457L96.493 0H62.073V7.495L58.244 0C58.244 0 28.812 0 28.812 0ZM35.486 9.05399H52.299L71.41 52.29V9.05399H89.828L104.589 40.054L118.193 9.05399H136.519V54.806H125.368L125.277 18.955L109.02 54.806H99.045L82.697 18.955V54.806H59.757L55.408 44.549H31.912L27.572 54.797H15.281C15.281 54.797 35.486 9.05399 35.486 9.05399ZM146.721 9.05399H192.063L205.931 24.034L220.246 9.05399H234.114L213.043 32.049L234.114 54.779H219.617L205.749 39.625L191.361 54.779H146.721V9.05399ZM43.665 16.795L35.924 35.067H51.397L43.665 16.795ZM157.918 18.527V26.879H182.654V36.188H157.918V45.306H185.663L198.555 31.876L186.21 18.519H157.918V18.527Z" fill="white"/></svg>
  Pay with American Express
</button> 
 </div>   }
                  </div> */}
                  
                  
               
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
   ref={selectRef}
  onChange={(selectedOption) => handleInput({ target: { name: 'ItemDetail', value: selectedOption.value } }, index)}
  name='ItemDetail'
   placeholder={ itemDetail[4] || 'Select'}
                                                   
  options={item.map((item) => ({
    label: `${item.Barcode}-${item.ItemName} `,
    value: `${item.ItemId},${item.AddDesc},${item.UnitId},${item.ItemName},${item.Barcode}`,
  }))}
  
  
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
<div>
  {valid && (
  <Alert color="success" icon={HiInformationCircle}>
  <span className="font-medium relative">Info alert!</span> fill al the fields
</Alert>
)}
</div>
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

export default Invoiceform