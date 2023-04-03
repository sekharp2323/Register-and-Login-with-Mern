import React from 'react'
import axios from 'axios';
import {useFormik} from 'formik';
import baseSchema from '../Schemas/Reg';
import './Reg.css'
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate=useNavigate();
 const onSubmit=async(values,actions)=>{
  await axios.post("http://localhost:4000/auth/reg",values).then((Response)=>{
    localStorage.setItem('token',JSON.stringify(Response.data.token));
}).catch((err)=>{console.error(err)}
 );
await navigate('/main');
await new Promise((resolve)=>setTimeout(resolve,1000));
actions.resetForm();
}
 

const {values,handleChange,handleSubmit,handleBlur,isSubmitting, errors,touched}=useFormik({
  initialValues:{
    email:'',
    password:'',
    password2:'',
  },
  validationSchema:baseSchema,onSubmit
}
)

  return (
    <div>
      <div><h3>Registration Form</h3></div>
      <div>
        <form autoComplete='off' onSubmit={handleSubmit} className="finputs" >
          <div>
          <label htmlFor='email'>Email</label>
          <input type="email" 
          id="email" name="email" placeholder='Enter your name'
          value={values.email} onChange={handleChange} 
          onBlur={handleBlur}
          className={errors.email && touched.email ? 'input-error':''} />
          {errors.email && touched.email &&<p className='error'>{errors.email}</p>}
          </div>
          <div>
          <label htmlFor='password'>Password</label>
          <input type="password" 
          id="password" name="password" 
          value={values.password} onChange={handleChange} 
          onBlur={handleBlur}
          className={errors.password && touched.password ? 'input-error':''} />
          {errors.password && touched.password &&<p className='error'>{errors.password}</p>}
          </div>
          <div>
          <label htmlFor='password2'>Confirm Password</label>
          <input type="password" 
          id="password2" name="password2" placeholder='Confirm Password'
          value={values.password2} onChange={handleChange} 
          onBlur={handleBlur}
          className={errors.password2 && touched.password2 ? 'input-error':''} />
          {errors.password2 && touched.password2 &&<p className='error'>{errors.password2}</p>}
          </div>
          <div>
          <button type='submit' disabled={isSubmitting}>Submit</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register