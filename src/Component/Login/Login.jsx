import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css'





export default function Regester({ GetuserData }) {

  const navigate = useNavigate();
  async function loginuser(obj) {

    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', obj)
      console.log(data);

      if (data.message === 'success') {
        $('.goodclass').fadeIn(500, function () {
          localStorage.setItem('token', data.token)                //1
          GetuserData()                                            //2



          // console.log(data.token);
          navigate('/home');                                       //3
        })
      }
    }
    catch (err) {
      // console.log(err.response.data.errors.msg);
      console.log(err);



      $('.errorclass').fadeIn(500, function () {
        setTimeout(() => {
          $('.errorclass').fadeOut(1000)
        }, 500)
      }

      )
    }

  }

  const formik = useFormik({
    initialValues: {

      email: '',
      password: '',

    },

    onSubmit: function (values) {
      loginuser(values)
      // console.log("submit", values.email);
    },


    validate: function (values) {
      let errors = {};


      if (!values.email.match(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/)) {
        errors.email = 'email must be valid...'
      }


      if (values.password.length < 6 || values.password.length > 8) {
        errors.password = 'password must be between 6-8 charcter'
      }

      return errors   // <= <= <= <=  <= <= <= <= <= <= <= <= <= <= <= <=  <= <= <= <= <= <= <= <= <= <= <= <=  <= <= <= <= <= <= <= <=
    }

  })



  return <>

    <div className='bigLoginDiv'>
      <div className=' '>


        <div className=' container loginpage'>
          <div style={{ "display": "none" }} className='alert alert-danger text-center errorclass'>Incorrect email or password </div>
          <div style={{ "display": "none" }} className='alert alert-success text-center goodclass'> congratulation </div>
          <form onSubmit={formik.handleSubmit} className='formdiv my-3' action="">




            <div className='emaildiv'>
              <label htmlFor="email">E-mail : </label>
              <input name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' placeholder='e-mail' className='form-control mb-3' type="email" />
              {formik.errors.email && formik.touched.Email ? <div className='alert alert-danger text-center'>{formik.errors.email}</div> : ""}
            </div>

            <div className='passdiv'>
              <label htmlFor="password">Password : </label>
              <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id='password' placeholder='password' className='form-control mb-3' type="password" />
              {formik.errors.password && formik.touched.password ? <div className='alert alert-danger text-center'>{formik.errors.password}</div> : ""}
            </div>

            <button type='submit' className='btn btn-dark' >Login</button>
            <div className='regnow'>   </div>

          </form>
          <Link to={'/regester'}> Regester now ?</Link>
        </div>
      </div>
    </div>

  </>
}
