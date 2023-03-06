import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik, formik } from 'formik'
import * as  yup from 'yup'
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Input } from "@material-ui/core";

// import React from 'react'
// import React, { useRef } from "react";
let baseUrl = ""
if (window.location.href.split(':')[0] === "http") {
  baseUrl = "http://localhost:5002"
}



function App() {
  const [products, setProducts] = useState([])
  const getAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5002/products')
      console.log("rall products", res.data);
      setProducts(res.data.data)
      console.log("sdaasdsa", products);
    } catch (error) {
      console.log(error, "Error")
    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])


  const validationSchema = yup.object({
    productName: yup
      .string().required()
      .min(3, 'PLease Enter more that 3 characters')
      .max(20, 'PLease Enter more that 20 characters'),

    productDescription: yup
      .string().required()
      .min(3, 'PLease Enter more that 3 characters')
      .max(100, 'PLease Enter more that 20 characters'),

    productPrice: yup
      .number('please enter  your product price').required()

  })
  const formik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      productDescription: ''
    },
    validationSchema:
      yup.object({
        productName: yup
          .string().required()
          .min(3, 'PLease Enter more that 3 characters')
          .max(20, 'PLease Enter more that 20 characters'),

        productDescription: yup
          .string().required()
          .min(3, 'PLease Enter more that 3 characters')
          .max(100, 'PLease Enter more that 20 characters'),

        productPrice: yup
          .number('please enter  your product price').required()
      }),
    onSubmit: (values) => {
      console.log('values', values);
      axios.post('http://localhost:5002/product', {
        name: values.productName,
        price: values.productPrice,
        description: values.productDescription,

      })
        .then(function (response) {
          console.log("res", response);
          getAllProducts()
        })
        .catch(function (error) {
          console.log(error);
        })
    },
  })


  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="productName"
          name="productName"
          label=""
          value={formik.values.productName}
          onChange={formik.handleChange}
          error={formik.touched.productName && Boolean(formik.errors.productName)}
          helperText={formik.touched.productName && formik.errors.productName}
        />
        <TextField
          fullWidth
          id="productPrice"
          name="productPrice"
          label="productPrice"
          type="productPrice"
          value={formik.values.productPrice}
          onChange={formik.handleChange}
          error={formik.touched.productPrice && Boolean(formik.errors.productPrice)}
          helperText={formik.touched.productPrice && formik.errors.productPrice}
        />      <TextField
          fullWidth
          id="productName"
          name="productDescription"
          label="Password"
          type="productDescription"
          value={formik.values.productDescription}
          onChange={formik.handleChange}
          error={formik.touched.productDescription && Boolean(formik.errors.productDescription)}
          helperText={formik.touched.productDescription && formik.errors.productDescription}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
  
      {products.map((eachProduct, i) => (
        <div className="user" key={i}>
          <p>
          {eachProduct.name}
          </p>
          <p>
          {eachProduct.price}
          </p>
          <p>
          {eachProduct.description}
          </p>
          <button>Delete Products</button>
        </div>
        // <div className="user">{user.desciption}</div>
      ))}

      {/* <div>
        {products.map((eachProduct, i) => {
          <div key={i}>
            <span>
              {eachProduct.name}
            </span>
            sdsd
          </div>
        })}
      </div> */}
    </div>
  );
}
export default App;
{/* <form onSubmit={submitHandler}>
        <label htmlFor="">get weatherData</label>
        <input type='text' placeholder="enter city" onChange={(e) => setCityName(e.target.value)} />
        <button type='submit'>get weatherData</button>
      </form>
      {
        (weatherData === null) ? null : 
        <div>
          City {weatherData?.city} <br/>
          Temperature {weatherData?.temp} <br/>
          Time {weatherData?.serverTime}  <br/>
          Humidity {weatherData?.humidity}  <br/>
          Min {weatherData?.min}  <br/>
           Max {weatherData?.max}  <br/>
        </div> 
      } */}
