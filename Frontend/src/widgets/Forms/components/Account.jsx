import { useContext,useState,useEffect, useRef } from 'react'
import { StepperContext } from '../context/StepperContext'
import { Checkbox, Input, Radio } from '@material-tailwind/react';
import { FormControlLabel, Grid, MenuItem, TextField } from '@mui/material';
import { Alert, ToggleSwitch } from 'flowbite-react';

import axios from 'axios';
import { HiInformationCircle } from 'react-icons/hi';

const Account = ({plus,edit,custId}) => {
  const {userData,setUserData} = useContext(StepperContext);
  const relativeNo = "ASB5111"; // Hardcoded value for Accgroup
  const [accNo, setAccNo] = useState('');
  const [id, setId] = useState([]);
  const [onlineToggle, setOnlineToggle] = useState(true);
  const [businessToggle, setBusinessToggle] = useState(true);
  const customerSelectRef = useRef(null);
  const [duplicateIdAlert, setDuplicateIdAlert] = useState(false);

 
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = () => {
   
    axios
      .get('http://localhost:8081/api/customerid')
      .then((response) => {
       setId(response.data) 
       console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
       
      })
    
  };
  useEffect(() => {
      customerSelectRef.current.focus();
    
  }, []);
  useEffect(() => {
    const fetchMaxAccNo = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/getMaxAccNo');
        const { nextAccNo } = response.data;
        setAccNo(nextAccNo);
      } catch (error) {
        console.error('Error fetching max accno:', error);
      }
    };

    fetchMaxAccNo();
  }, [relativeNo]);
 
  
  useEffect(() => {
    if (edit) {
      const fetchData = async () => {
        try {
          const customerId = custId;
          const response = await axios.get(`http://localhost:8081/api/editcustomer/${customerId}`);
          const data = response.data[0];
          setUserData(data);
          setOnlineToggle(data.types === 'online');
          setBusinessToggle(data.type === 'Business');
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      }  else {
        const fetchDefaultCustomerId = async () => {
          try {
            const response = await axios.get('http://localhost:8081/api/defaultcustomerid');
            const defaultCustomerId = response.data.defaultCustomerId;
            setUserData({
              ...userData,
              types: 'online',
              type: 'Business',
              customerId: defaultCustomerId,
            });
          } catch (error) {
            console.error('Error fetching default customerId:', error);
          }
        };
  
        fetchDefaultCustomerId();
      }  
     

        setOnlineToggle(true);
        setBusinessToggle(true);
      
  }, [edit, custId, setUserData]);

  const handleToggleChange = (toggle) => {
    if (toggle === "online") {
      setOnlineToggle(!onlineToggle);
      setUserData({
        ...userData,
        types: onlineToggle ? "offline" : "online",
      });
    } else if (toggle === "business") {
      setBusinessToggle(!businessToggle);
      setUserData({
        ...userData,
        type: businessToggle ? "Individual" : "Business",
      });
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    
    if (edit) {
      setUserData({ ...userData, [name]: value });
    } else {
      
      if (name === "accno" || name === "relativeno") {
        setUserData({ ...userData, [name]: value });
      } else {
        setUserData({ ...userData, [name]: value, accno: accNo, relativeno: relativeNo });
      }
    }
  
    const isDuplicate = id.some(item => item.customerId == value);

  console.log('Entered Customer ID:', value);
  console.log('Customer IDs in the array:', id.map(item => item.customerId));
  console.log('Is Duplicate:', isDuplicate);

  if (isDuplicate) {
    console.log('Duplicate customer ID detected!');
    // Handle duplicate ID as needed (show an alert, set a state, etc.)
  }
  
    setDuplicateIdAlert(isDuplicate);

  };
 useEffect(() => {
  console.log('DuplicateIdAlert state:', duplicateIdAlert);
}, [duplicateIdAlert]);

  return (
    <div className={ plus ? 'relative text-xs  bg-white rounded-lg  flex-col' : 'flex text-xs  bg-white rounded-lg  flex-col'}>
    
       <div className='text-xs flex-1'>
       <div className={plus ? 'font-bold -mt-10  text-gray-800 text-xs leading-8' : 'font-bold -mt-10 mb-4 text-gray-800 text-xs leading-8'}>
       <div className={ plus ? "flex justify-end gap-5 pt-8 pr-2" : "flex justify-end gap-5"}>
            <ToggleSwitch
              checked={onlineToggle}
              label={onlineToggle ? "Online" : "Offline"}
              onChange={() => handleToggleChange("online")}
            />
       
            <ToggleSwitch
              checked={businessToggle}
              label={businessToggle ? "Business" : "Individual"}
              onChange={() => handleToggleChange("business")}
            />
          </div>

</div>
 { duplicateIdAlert &&  <Alert color="White" icon={HiInformationCircle}>
      <span className="font-medium text-red-600">Info alert!</span> Customer code already exist 
      </Alert> }
<div className='p-4'>
<Grid container spacing={3}>
<Grid item xs={12} sm={3}>
          <TextField
            mb={3}
            required
            id="customerId"
            name="customerId"
            label="Code"
            fullWidth
            variant="standard"
            value={userData["customerId"] || ""}
            onChange={handleChange}
            aria-aria-readonly={edit}
          />
        </Grid>
<Grid item xs={12} sm={3}>
          <TextField
            mb={4}
            required
            id="companyName"
            inputRef={customerSelectRef}
            name="companyName"
            label="Company Name"
            fullWidth
            variant="standard"
            value={userData["companyName"] || ""}
            onChange={handleChange}
            autoComplete='offline'
          />
        </Grid>
<Grid item xs={12} sm={3}>
    <TextField
      required
      id="customerDisplayName"
      name="customerDisplayName"
      label="Company Display Name"
      fullWidth
      autoComplete="customer display name"
      variant="standard"
      value={userData["customerDisplayName"] || ""}
      onChange={handleChange}
    />
  </Grid>

  
  <Grid item xs={12} sm={3}>
    <TextField
      required
      id="primaryContact"
      name="primaryContact"
      label="Primary Contact"
      fullWidth
      autoComplete="primary contact"
      variant="standard"
      value={userData["primaryContact"] || ""}
      onChange={handleChange}
    />
  </Grid>
 
        <Grid item xs={12} sm={3}>
          <TextField
            mb={3}
            select
            id="currency"
            name="currency"
            label="Currency"
            fullWidth
            variant="standard"
            value={userData["currency"] || ""}
            onChange={handleChange}
          >  
          <MenuItem value="Qatar Rial">Qatar Rial</MenuItem>
          <MenuItem value="Dubai Dirham">Dubai Dirham</MenuItem>
          <MenuItem value="US Dollar">US Dollar</MenuItem>
        </TextField>
        </Grid>
      
         
   
        <Grid item xs={12} sm={3}>
          <TextField
            mb={3}
            id="customerEmail"
            name="customerEmail"
            label="Customer Email"
            fullWidth
            variant="standard"
            value={userData["customerEmail"] || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            mb={3}
            id="customerPhone"
            name="customerPhone"
            label="Customer Phone"
            fullWidth
            variant="standard"
            value={userData["customerPhone"] || ""}
            onChange={handleChange}
          />
        </Grid>
       
        <Grid item xs={12} sm={3}>
          <TextField
            mb={3}
            id="workPhone"
            name="workPhone"
            label="Work Phone"
            fullWidth
            variant="standard"
            value={userData["workPhone"] || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            mb={3}
            id="mobile"
            name="mobile"
            label="Mobile"
            fullWidth
            variant="standard"
            value={userData["mobile"] || ""}
            onChange={handleChange}
          />
        </Grid>
    
        <Grid item xs={12} sm={3}>
          <TextField
            mb={3}
            required
            type='number'
            id="dueOnReceipt"
            name="dueOnReceipt"
            label="Credit Days"
            fullWidth
            variant="standard"
            value={userData["dueOnReceipt"] || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      </div>
 <div className='pt-3 pl-4 pb-4'>
 <FormControlLabel
            control={<Checkbox onChange={handleChange} checked={userData["paymentTerms"] || ""}  color="secondary" name="paymentTerms"  />}
            label="Payment Terms and Conditions"
          />
          </div>
 <input
        onChange={handleChange}
        value={accNo}
        name="accno"
        style={{ display: 'none' }}
        hidden
      />

      {/* Accgroup */}
      <input
        onChange={handleChange}
        value={relativeNo}
        name="relativeno"
        style={{ display: 'none' }}
        hidden
      />
        </div>
       
       
    </div>
    
  )
}

export default Account