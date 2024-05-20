import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Validation from './SignupValidation'
import axios from "axios";

export function SignUp() {
  const [values,setValues]=useState({
    name:"",
    email:'',
    password:'',
    CompanyId:'',
  });
  const navigate = useNavigate();
  const [errors,setErrors]=useState({});
  const handleInput=(e)=>{
     setValues(prev => ({...prev,[e.target.name]:[e.target.value]}))
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const err= Validation(values);
    setErrors(err)
    if(err.name === "" && err.email === "" && err.password === "" && err.CompanyId === ""){
       axios.post('http://localhost:8081/api/sign-up', values)
       .then(res => {
        alert('Signup Successfully');
         navigate('/');
      })
       .catch(err => console.log(err))
    }

  }
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            
            className="mb-4 bg-gray-500 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input onChange={handleInput} name="name" label="Name" size="lg" />
            { errors.name && <span style={{color:"red"}}>{errors.name}</span>}
            <Input onChange={handleInput} name="email" type="email" label="Email" size="lg" />
            { errors.email && <span style={{color:"red"}}>{errors.email}</span>}
            <Input onChange={handleInput} name="password" type="password" label="Password" size="lg" />
            { errors.password && <span style={{color:"red"}}>{errors.password}</span>}
            <Input onChange={handleInput} name="CompanyId" type="text" label="CompanyCode" size="lg" required/>
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" required/>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button className=" cursor-pointer" type="submit" onClick={handleSubmit} color="gray" variant="gradient" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
