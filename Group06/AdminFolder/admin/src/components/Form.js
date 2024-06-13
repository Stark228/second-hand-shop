import React, { Fragment, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'
import Admin from './sidepage';

const Button = styled.button`
  outline: 0;
  background: green;
  width: 50%;
  border: 0;
  border-radius: 3px;
  padding: 10px;
  color: #ffffff;
  font-size: 15px;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background: green;
    color: green;
    border: 1px solid green;
  }
}`;

const categoryOption = [
  { value: 'vehicle', label: 'Vehicle' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'cloth', label: 'Cloth' },
  { value: 'electronic', label: 'Electronic' },
];

const Form = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [used, setUsed] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState('');
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    }

    // if (!price.trim()) {
    //   errors.price = "Price is required";
    // }
    if (!price.trim()) {
      errors.price = "Price is required";
    } else if (isNaN(price)) {
      errors.price = "Price must be a valid number";
    }

    if (!location.trim()) {
      errors.location = "Location is required";
    }

    if (!number.trim()) {
      errors.number = "Phone Number is required";
    } else if (number.length !== 8) {
      errors.number = "Phone Number must be 8 characters long";
    } else if (!number.startsWith("17") && !number.startsWith("77")) {
      errors.number = "Phone Number must start with 17 or 77";
    }

    if (!used.trim()) {
      errors.used = "Used is required";
    }

    if (!category.trim()) {
      errors.category = "Category is required";
    }

    if (!image) {
      errors.image = "Image is required";
    }

    if (!reason.trim()) {
      errors.reason = "Reason for Sale is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('number', number);
      formData.append('location', location);
      formData.append('used', used);
      formData.append('category', category);
      formData.append('image', image);
      formData.append('reason', reason);

      const response = await fetch('http://localhost:5000/furnitures', {
        method: 'POST',
        body: formData
      });

      setLoading(false);
      toast.success('Successfully Saved!')
      setTimeout(() => {
        window.location.reload('/');
        
       
      }, 2000)
   
  
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Admin/>
      <ToastContainer
       position="top-center"/>
      <form className="mt-1" onSubmit={onSubmitForm}>
        <table
          className="table table-bordered"
          style={{ width: '85%', tableLayout: 'auto', marginLeft: '14rem'}}
        >
          <tr>
            <th colspan="2" style={{ textAlign: 'center', fontWeight: '300',
             fontSize: '24px', fontFamily: 'fantasy',color:'#989898' }}>
              Add Product
            </th>
          </tr>
          <tbody>
            <tr>
              <td style={{ color:'#989898',fontSize:'19px'}}>Title</td>
              <td>
                <input
                  style={{ fontSize: '19px' }}
                  type="text"
                  className={`form-control ${errors.title && 'is-invalid'}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="invalid-feedback"  style={{fontSize:'18px'}}>{errors.title}</div>}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: '19px',color:'#989898'  }}>Price</td>
              <td>
                <input
                  style={{ fontSize: '19px' }}
                  type="text"
                  className={`form-control ${errors.price && 'is-invalid'}`}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && <div className="invalid-feedback"  style={{fontSize:'18px'}}>{errors.price}</div>}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: '19px',color:'#989898' }}>PhoneNumber</td>
              <td>
                <input
                  style={{ fontSize: '19px' }}
                  type="text"
                  className={`form-control ${errors.number && 'is-invalid'}`}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                {errors.number && <div className="invalid-feedback"  style={{fontSize:'18px'}}>{errors.number}</div>}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: '19px',color:'#989898'  }}>Location</td>
              <td>
                <input
                  style={{ fontSize: '19px' }}
                  type="text"
                  className={`form-control ${errors.location && 'is-invalid'}`}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <div className="invalid-feedback"  style={{fontSize:'18px'}}>{errors.location}</div>}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: '19px',color:'#989898'  }}>Used</td>
              <td>
                <input
                  style={{ fontSize: '19px' }}
                  type="text"
                  className={`form-control ${errors.used && 'is-invalid'}`}
                  value={used}
                  onChange={(e) => setUsed(e.target.value)}
                />
                {errors.used && <div className="invalid-feedback"  style={{fontSize:'18px'}}>{errors.used}</div>}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: '19px',color:'#989898'  }}>Category</td>
              <td>
                <select
                 
                  name="Select Category"
                  id="category"
                  className={`form-control ${errors.category && 'is-invalid'}`}
                  style={{
                    fontSize:'19px',
                    width: '100%',
                    height: '35px',
                    borderRadius: '3px',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    color: 'rgb(99, 102, 102)',
                  }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categoryOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.category && <div className="invalid-feedback"  style={{fontSize:'18px'}}>{errors.category}</div>}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: '19px',color:'#989898' }}>Image</td>
              <td>
                <input
                  style={{ height: '42px' }}
                  className={`form-control ${errors.image && 'is-invalid'}`}
                  rows="3"
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
                {errors.image && <div className="invalid-feedback"  style={{fontSize:'18px'}}>{errors.image}</div>}
              </td>
            </tr>
            <tr>
              <td style={{ fontSize: '19px',color:'#989898'  }}>Reason For Sale</td>
              <td>
                <textarea
                  style={{ fontSize: '19px' }}
                  className={`form-control ${errors.reason && 'is-invalid'}`}
                  rows="3"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                {errors.reason && <div className="invalid-feedback" style={{fontSize:'18px'}}>{errors.reason}</div>}
              </td>
            </tr>
            <button type="submit" className="btn btn-success"
          style={{ width:'50%',padding:'10px'}}>
            Submit
          </button>
          </tbody>
        
        </table>
      </form>
    </div>
  );
};

export default Form;
