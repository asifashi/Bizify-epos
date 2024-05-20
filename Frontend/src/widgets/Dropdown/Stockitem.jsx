import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToggleSwitch } from 'flowbite-react';
import { HiSave, HiSaveAs } from 'react-icons/hi';

const Stockitem = ({edit,stockId,setEdit,setOkModal,setOkModalStock,setinvenShow}) => {
  const [formData, setFormData] = useState({
    ItemId: '',
    ItemType: 'Inventory',
    ItemName: '',
    Region: '',
    MaterialCode: '',
    CategoryId: '',
    AddDesc: '',
    UnitPrice: '',
    Barcode: '',
    UnitId: '',
    BaseValue:'',
    MinimumQty: '',
    Image: null,
   
  })


  const [itemCategory,setItemCategory] = useState([])
  const [unit,setUnit] = useState([])
  const [onlineToggle, setOnlineToggle] = useState(true);
  console.log('stocktId at rendering:', stockId);
  const stockSelectRef = useRef(null);

  const toggleModal = () => {
    const modal = document.getElementById('authentication-m');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
    
  };
  useEffect(() => {
    // Focus on the customer select field when the component mounts
    stockSelectRef.current.focus();
  }, []);
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        try {
          const ItemId=stockId;
          console.log('ItemId:', ItemId);
          const response = await axios.get(`http://localhost:8081/api/editstock/${ItemId}`);
          const data = response.data[0];
          setFormData(data);
          setOnlineToggle(data.ItemType === 'Inventory');
          console.log(formData)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
       }
       else {
        
        const fetchDefaultStockId = async () => {
          try {
            const response = await axios.get('http://localhost:8081/api/defaultstockid');
            const defaultStockId = response.data.defaultStockId;
            setFormData((prevData) => ({
              ...prevData,
              ItemType: 'Inventory',
              ItemId: defaultStockId,
            }));
              
            
          } catch (error) {
            console.error('Error fetching default customerId:', error);
          }
        };
  
        fetchDefaultStockId();
        // Set default values when not in edit mode
       
      }
      setOnlineToggle(true);
  }, [edit, stockId, setFormData]);
  const handleEdit = (e) => {
    e.preventDefault();
    const ItemId = stockId;
    axios
    .put(`http://localhost:8081/api/updatestock/${ItemId}`, formData) 
    .then((res) => {
     setEdit(false)
     setOkModal(true);
     setTimeout(() => {
       setOkModal(false);
     }, 2000);
      console.log(res);
      setFormData({
        ItemId: '',
        ItemType: '',
        ItemName: '',
        Region: '',
        MaterialCode: '',
        CategoryId: '',
        AddDesc: '',
        UnitPrice: '',
        Barcode: '',
        UnitId: '',
        BaseValue:'',
        MinimumQty: '',
        Image: null,
       
        
      });
      
      
  
    })
    .catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
   
      axios.get('http://localhost:8081/api/getItemCategorys')
      .then((response) => {
        setItemCategory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching item Category: ', error);
      });
     

  }, []); 
  useEffect(()=>{
    axios.get('http://localhost:8081/api/getUnits')
    .then((response) => {
      setUnit(response.data);
    })
    .catch((error) => {
      console.error('Error fetching item Unit: ', error);
    });
  },[])

  const saveData = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === 'Image') {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }
    
    axios
      .post('http://localhost:8081/api/saveData', data)
      .then((response) => {
        console.log(response.data);
        setinvenShow(false)
        setOkModalStock(true);
        setTimeout(() => {
          setOkModalStock(false);
        }, 2000);
        setFormData({
          ItemId: '',
          ItemType: 'Inventory',
          ItemName: '',
          Region: '',
          MaterialCode: '',
          CategoryId: '',
          AddDesc: '',
          UnitPrice: '',
          Barcode: '',
          UnitId: '',
          BaseValue:'',
          MinimumQty: '',
          Image: null,
         
          
        });
    
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
      });
  };
  const handleToggleChange = (toggle) => {
    if (toggle === "Inventory") {
      setOnlineToggle(!onlineToggle);
      setFormData({
        ...formData,
        ItemType: onlineToggle ? "Service" : "Inventory",
      });
    }
  };
  const handleInput = (e) => {
    if (e.target.name === 'Image') {
      setFormData((prev) => ({ ...prev, Image: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <div>
     
      <div
        id="authentication-m"
       
      >
        <div className="relative  w-full max-h-full">
          <div className="relative rounded-lg shadow dark:bg-gray-700">
      
            <div className="px-0 py-4 bg-white lg:px-8">
              <div className='flex border-b border-spacing-1 border-gray-300 '>
              <h6 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Create Stock item</h6>
              </div>
              <form className="space-y-3" method="post" onSubmit={edit ? handleEdit : saveData}>
                <div className="flex justify-start">
                <div className="flex pt-4">
            <ToggleSwitch
              checked={onlineToggle}
              label={onlineToggle ? "Inventory" : "Service"}
              onChange={() => handleToggleChange("Inventory")}
            />
          </div>
                 
                
                </div>
                <div className='grid grid-cols-4 gap-3 '>
                  <div >
                    <label
                      htmlFor="ItemId"
                      className="block mt-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Id
                    </label>
                    <input
                      type="text"
                      name="ItemId"
                      value={formData && formData.ItemId}
                      onChange={handleInput}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                      placeholder="Item Id"
                      required
                    />
                  </div>
               
                  <div>
                    <label
                      htmlFor="ItemName"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Name
                    </label>
                    <input
                      type="text"
                      name="ItemName"
                      ref={stockSelectRef}
                      value={formData.ItemName}
                      onChange={handleInput}
                      autoComplete='offline'
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                      placeholder="Item Name"
                      required
                    />
                  </div>
               
                  <div>
                    <label
                      htmlFor="Region"
                      className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Region
                    </label>
                    <input
                      type="text"
                      name="Region"
                      value={formData.Region}
                      onChange={handleInput}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                      placeholder="Region"
                      
                    />
                  </div>
                   
                <div>
                  <label
                    htmlFor="CategoryId"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                   
                    value={formData.CategoryId}
                    onChange={handleInput}
                    name="CategoryId"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                  >
                    <option hidden>Select Category</option>
                    {itemCategory.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.itemcategory}
                      </option>
                    ))}
                  </select>
                </div>
               
              
                </div>
                <div className=" grid grid-cols-2 gap-4 ">
              
                </div>
                <div>
                  <label
                    htmlFor="AddDesc"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    name="AddDesc"
                    value={formData.AddDesc}
                    onChange={handleInput}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                    
                  />
                </div>
                <div className='grid grid-cols-4 gap-3'>
                <div>
                  <label
                    htmlFor="CategoryId"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Unit
                  </label>
                  <select
                   
                    value={formData.UnitId}
                    onChange={handleInput}
                    name="UnitId"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
                  >
                    <option hidden>Select Unit</option>
                    {unit.map((unit) => (
                      <option key={unit.id} value={unit.shortname}>
                        {unit.shortname}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
 
 <label htmlFor="UnitPrice" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
 Unit Price
 </label>
 <input
   type="text"
   name="UnitPrice"
   value={formData.UnitPrice}
   onChange={handleInput}
   className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
   placeholder="Unit Price"
 required/>
 


</div>
<div >
    <label htmlFor="Barcode" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
      Barcode
    </label>
    <input
      type="text"
      name="Barcode"
      value={formData.Barcode}
      onChange={handleInput}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
      placeholder="Barcode"
   required />
  </div>
  <div>
    <label htmlFor="BaseValue" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
    Base Value
    </label>
    <input
      type="text"
      name="BaseValue"
      value={formData.BaseValue}
      onChange={handleInput}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
       placeholder="Base Value"
    />
    </div>
</div>

<div className="grid grid-cols-4 gap-3" >

<div >
    <label htmlFor="Color" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
      Quantity
    </label>
    <input
      type="text"
      name="MinimumQty"
      value={formData.MinimumQty}
      onChange={handleInput}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 pl-2 p-1 text-sm h-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400" 
      placeholder="Quantity"
    />
  </div>

 
 
</div>
<div className="flex space-x-2 items-center">
  <div className="flex-1">
    <label htmlFor="Image" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
      Stock Image
    </label>
   <input
      type="file"
      name="Image"
      onChange={handleInput}
      className="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      placeholder="Stock Image"
    /> 
  </div>

</div>
<div className='flex justify-end mr-10'>
                   <button
                  type="submit"
                  className='h-10 px-20 text-white shadow-lg bg-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-white hover:text-gray-900'
                >
                 {edit ? (<div className='flex -mt-1 items-center justify-center gap-1'><HiSaveAs className='w-6 h-6'></HiSaveAs>Update </div>) : (<div className='flex -mt-1 items-center justify-center gap-1'><HiSave className='w-6 h-6'></HiSave>Save </div>) }
                </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stockitem;