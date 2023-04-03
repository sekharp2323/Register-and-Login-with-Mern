import * as yup  from 'yup'
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const baseSchema=yup.object().shape({
    email:yup.string().email("Enter a valid email").required("Required"),
    password:yup.string().min(5).matches(passwordRules,{message:"Please Enter a strong password"}).required("Required"),
    password2:yup.string().oneOf([yup.ref('password'),null],"Passwords must match").required("Required"),
});

export default baseSchema;