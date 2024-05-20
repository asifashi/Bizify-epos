import React, { useContext,useState } from 'react'
import { StepperContext } from '../context/StepperContext'
import { Checkbox,Typography } from '@material-tailwind/react';
import { FormControlLabel, Grid, TextField } from '@mui/material';
import { Button } from 'flowbite-react';


const Details = () => {
  const {userData,setUserData} = useContext(StepperContext);
  const [activeTab, setActiveTab] = useState('billing');
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'saveAddress' && value === 'yes') {
      setUserData({
        ...userData,
        shippingAttention: userData.billingAttention,
        shippingCountry: userData.billingCountry,
        shippingAddress: userData.billingAddress,
        shippingCity: userData.billingCity,
        shippingState: userData.billingState,
        shippingZipCode: userData.billingZipCode,
        shippingPhone: userData.billingPhone,
        shippingFax: userData.billingFax,
        shippingEmail: userData.billingEmail,
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };
  const switchToBillingTab = () => {
    setActiveTab('billing');
  };

  const switchToShippingTab = () => {
    setActiveTab('shipping');
  };


  return (
    <div>
       <React.Fragment>
       <div style={{ marginBottom: '20px',marginTop:'20px' }}>
       <Button.Group>
          <Button  onClick={switchToBillingTab}>Billing Address</Button>
          <Button color="gray"  onClick={switchToShippingTab}>Shipping Address</Button>
        </Button.Group>
        </div>
  
  {activeTab === 'billing' && (
          <React.Fragment>
            
  <div className='p-4 bg-white rounded-lg '>
  <Typography variant="h6" gutterBottom>
    Billing Address
  </Typography>
  <Grid container  spacing={3}>
    <Grid item xs={12} sm={4} >
      <TextField
         mb={3}
        required
        id="billingAttention"
        name="billingAttention"
        label="Billing Attention"
        fullWidth
        autoComplete="billing attention"
        variant="standard"
        value={userData["billingAttention"] || ""}
        onChange={handleChange}
        
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="billingCountry"
        name="billingCountry"
        label="Billing Country"
        fullWidth
        autoComplete="billing country"
        variant="standard"
        value={userData["billingCountry"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="billingAddress"
        name="billingAddress"
        label="Billing Address"
        fullWidth
        autoComplete="billing address"
        variant="standard"
        value={userData["billingAddress"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="billingCity"
        name="billingCity"
        label="Billing City"
        fullWidth
        autoComplete="billing city"
        variant="standard"
        value={userData["billingCity"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        id="billingState"
        name="billingState"
        label="Billing State/Province/Region"
        fullWidth
        variant="standard"
        value={userData["billingState"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="billingZipCode"
        name="billingZipCode"
        label="Billing Zip / Postal code"
        fullWidth
        autoComplete="billing postal-code"
        variant="standard"
        value={userData["billingZipCode"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="billingPhone"
        name="billingPhone"
        label="Billing Phone"
        fullWidth
        autoComplete="billing phone"
        variant="standard"
        value={userData["billingPhone"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        id="billingFax"
        name="billingFax"
        label="Billing Fax"
        fullWidth
        autoComplete="billing fax"
        variant="standard"
        value={userData["billingFax"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="billingEmail"
        name="billingEmail"
        label="Billing Email"
        fullWidth
        autoComplete="billing email"
        variant="standard"
        value={userData["billingEmail"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        id="remarks"
        name="remarks"
        label="Remarks"
        fullWidth
        variant="standard"
        value={userData["remarks"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
          label="Use this address for Shipping Address"
          onChange={handleChange}
        />
      </Grid>
    
  </Grid></div>
  </React.Fragment>
        )}
         {activeTab === 'shipping' && (
          <React.Fragment>
            <div className='p-4 bg-white rounded-lg '>
  <Typography variant="h6" gutterBottom>
    Shipping Address
  </Typography>
  <Grid container marginBottom={5} spacing={3}>
    <Grid item xs={12} sm={4} >
      <TextField
        required
        id="shippingAttention"
        name="shippingAttention"
        label="Shipping Attention"
        fullWidth
        autoComplete="shipping attention"
        variant="standard"
        value={userData["shippingAttention"] || ""}
        onChange={handleChange}
        readOnly={userData.saveAddress === 'yes'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="shippingCountry"
        name="shippingCountry"
        label="Shipping Country"
        fullWidth
        autoComplete="shipping country"
        variant="standard"
        value={userData["shippingCountry"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="shippingAddress"
        name="shippingAddress"
        label="Shipping Address"
        fullWidth
        autoComplete="shipping address"
        variant="standard"
        value={userData["shippingAddress"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="shippingCity"
        name="shippingCity"
        label="Shipping City"
        fullWidth
        autoComplete="shipping city"
        variant="standard"
        value={userData["shippingCity"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        id="shippingState"
        name="shippingState"
        label="Shipping State/Province/Region"
        fullWidth
        variant="standard"
        value={userData["shippingState"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="shippingZipCode"
        name="shippingZipCode"
        label="Shipping Zip / Postal code"
        fullWidth
        autoComplete="shipping postal-code"
        variant="standard"
        value={userData["shippingZipCode"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="shippingPhone"
        name="shippingPhone"
        label="Shipping Phone"
        fullWidth
        autoComplete="shipping phone"
        variant="standard"
        value={userData["shippingPhone"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        id="shippingFax"
        name="shippingFax"
        label="Shipping Fax"
        fullWidth
        autoComplete="shipping fax"
        variant="standard"
        value={userData["shippingFax"] || ""}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        required
        id="shippingEmail"
        name="shippingEmail"
        label="Shipping Email"
        fullWidth
        autoComplete="shipping email"
        variant="standard"
        value={userData["shippingEmail"] || ""}
        onChange={handleChange}
      />
    </Grid>
    
  </Grid>
  </div>
  </React.Fragment>
        )}
</React.Fragment>

    </div>
  )
}

export default Details