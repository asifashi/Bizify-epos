function Validation(values) {
    let error = {};  
    const emailPattern =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     

    if(values.name === "") {
        error.name = "Name should not be empty";
    }
        else {
            error.name = "";
        }   
        if(values.CompanyId === "") {
            error.CompanyId = " should not be empty";
        }
            else {
                error.CompanyId = "";
            }    

    if(values.email === "") {
        error.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        error.email = "Email didn't match the pattern";
    } else {
        error.email = "";
    }
  
    if(values.password === "") {
       error.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        error.password = "Password didn't match the pattern";
    } else {
        error.password = "";
    }
    return error;
  }

  export default Validation;