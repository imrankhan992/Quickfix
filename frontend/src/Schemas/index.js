import * as Yup from "yup";
export const registration = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        checked: Yup.boolean().oneOf([true], "You must accept terms and conditions")
})



export const submitProfileSchema = Yup.object().shape({
    avatar: Yup.mixed().required('Avatar is required').test('fileType', 'Unsupported file format', (value) => {
        if (!value) return true; // No file selected, let the required validation handle it
        return value && ['image/jpeg', 'image/png', 'image/gif','image/webp'].includes(value.type);
    }),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    experience: Yup.string().required('Experience is required'),
    city: Yup.string().required('City is required'),
    job: Yup.string().required('Job is required'),
    zipcode: Yup.string().required('Zipcode is required'),
});

export const loginSchema = Yup.object({
    
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  
})



