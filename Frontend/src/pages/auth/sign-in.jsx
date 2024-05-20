import { Link, useNavigate } from "react-router-dom";

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
import { useEffect, useState } from "react";
import Validation from "./SignValidation.js"; 
import { useAuth } from '../../Authcontext/Authcontext.jsx'
import axios from "axios";

import { Avatar } from "@material-tailwind/react";

export function SignIn() {

  const navigate = useNavigate();
  const { isloggedIn, login } = useAuth();
  const [users,setUsers] = useState(null)
  const [values,setValues]=useState({
    email:'',
    password:'',
    rememberMe: false,
  });
  const [errors,setErrors]=useState({});
  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const rememberUser = () => {
    if (values.rememberMe) {
      localStorage.setItem("rememberedUser", JSON.stringify(values));
    } else {
      localStorage.removeItem("rememberedUser");
    }
  };
  
  const handleRememberMe = () => {
    setValues((prev) => ({ ...prev, rememberMe: !prev.rememberMe }), rememberUser);
  };
  axios.defaults.withCredentials = true;
  const handleSubmit=(e)=>{
    e.preventDefault();
    const err= Validation(values);
    setErrors(err)
    if(err.email === "" && err.password === ""){
       axios.post('http://localhost:8081/api/sign-in', values, {
        headers: {
          'access-token': localStorage.getItem('token') || '', 
        },
      })
       .then(res => {
        
        if(res.data.Login)
        {
          login();
          localStorage.setItem("token", res.data.token);
          if (res.data.user) {
            setUsers({
              name: res.data.user.name || '',
              email: res.data.user.email || '',
              role: res.data.user.role || ''
            });
          }
         
          localStorage.setItem("user", JSON.stringify(res.data.user));

          navigate('/dashboard/home');
         
        
        } else {
          alert("No record exist")
        }
      
       })
       .catch(err => console.log(err))
    }

  }
  useEffect(() => {
    const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));

    if (rememberedUser) {
      setValues(rememberedUser);
    }
  }, []);
  
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1612550761236-e813928f7271?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full" />
      <div className="container mx-auto p-4">
        <Card  className="absolute top-2/4 left-3/4 w-full max-w-[21rem] max-h-[26rem] text-white bg-gradient-to-tr shadow-xl  -translate-y-2/4 -translate-x-2/4">
        <Typography className="font-semibold mt-4 text-gray-800 text-2xl"> <Avatar className="ml-20 mr-2"  src="/img/a.png" size="sm"  />
           Biziferp</Typography>
     
          <CardBody className="flex text-white flex-col gap-4">
            <Input onChange={handleInput} className="text-gray-800"  name="email" label="Email" size="lg" required/>
            { errors.email && <span style={{color:"red"}}>{errors.email}</span>}
            <Input onChange={handleInput} className="text-gray-800"  name="password" label="Password" type="password" size="lg" required/>
          { errors.password && <span style={{color:"red"}}>{errors.password}</span>}
            <div className="-ml-2.5">
              <Checkbox className="text-white" label="Remember Me" onChange={handleRememberMe}
          checked={values.rememberMe} />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleSubmit} className="shadow-xl " type="submit" color="gray" variant="gradient" fullWidth>
              Sign In
            </Button>
          {users && users.role === 'admin' &&
          <Typography variant="small" className="mt-6 flex text-white justify-center">
            Don't have an account?
            <Link to="/auth/sign-up">
              <Typography
                as="span"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>}
        
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
