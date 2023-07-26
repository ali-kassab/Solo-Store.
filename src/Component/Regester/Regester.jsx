import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import '../Regester/Regester.css'
export default function Regester() {


  const navigate = useNavigate();

  async function getapi(obj) {
    console.log(obj);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', obj)
      console.log(data);
      if (data.message === 'success') {
        $('.goodclass').fadeIn(500, function () {
          navigate('/Login');
        })
      }
    }
    catch (err) {
      // console.log(err.response.data.errors.msg);
      console.log(err);
      $('.errorclass').fadeIn(500, function () {
        setTimeout(() => {
          $('.errorclass').fadeOut(500)
        }, 500)
      }

      )
    }

  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: function (values) {
      getapi(values)
    },


    validate: function (values) {
      let errors = {};
      if (values.name.length < 3 || values.name.length > 18) {
        errors.name = 'name must be between 3 to 6 charcter..'
      }

      if (!values.email.match(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)) {
        errors.email = 'email must be valid...'
      }

      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = 'phone must be valid...'
      }
      if (values.password.length < 6 || values.password.length > 8) {
        errors.password = 'password must be 6-8 charcter'
      }
      if (!values.password === values.repassword) {
        errors.repassword = ' password and repassword must be match '
      }
      return errors   // <= <= <= <=  <= <= <= <= <= <= <= <= <= <= <= <=  <= <= <= <= <= <= <= <= <= <= <= <=  <= <= <= <= <= <= <= <=
    }

  })



  return <>

    <div className='background '>
      <div className='layer'>
        <div className="container regesterbackground ">

          <div style={{ "display": "none" }} className='alert alert-danger text-center errorclass'>already in use </div>
          <div style={{ "display": "none" }} className='alert alert-success text-center goodclass'> congratulation </div>
          <form onSubmit={formik.handleSubmit} className='my-3' action="">



            <label htmlFor="name">name : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id='name' placeholder='name' className='form-control mb-3' type="text" />
            {formik.errors.name && formik.touched.name ? <div className='alert  alert-danger text-center'>{formik.errors.name}</div> : ""}

            <label htmlFor="email">E-mail : </label>
            <input name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' placeholder='e-mail' className='form-control mb-3' type="email" />
            {formik.errors.email && formik.touched.Email ? <div className='alert  alert-danger text-center'>{formik.errors.email}</div> : ""}

            <label htmlFor="phone">Phone : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id='phone' placeholder='phone' className='form-control mb-3' type="text" />
            {formik.errors.phone && formik.touched.phone ? <div className='alert  alert-danger text-center'>{formik.errors.phone}</div> : ""}

            <label htmlFor="password">Password : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' placeholder='password' className='form-control mb-3' type="password" />
            {formik.errors.password && formik.touched.password ? <div className='alert  alert-danger text-center'>{formik.errors.password}</div> : ""}

            <label htmlFor="rePassword">Repassword : </label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id='rePassword' placeholder='rePassword' className='form-control mb-3' type="password" />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert  alert-danger text-center'>{formik.errors.rePassword}</div> : ""}

            <button type='submit'className='btn '>Regester</button>

          </form>
        </div>
      </div>
    </div>
  </>
}
