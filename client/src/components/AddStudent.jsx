import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import api from '../api/axios'
const AddStudent = () => {
  const navigate=useNavigate();
  const[form,setForm]=useState({
    name:"",
    email:"",
    age:"",
    city:"",
    course:"",
  })

  let handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  let handleSubmit= async(e)=>{
    e.preventDefault();
    console.log(form);

   try{
        const response = await api.post('/students',{...form,age: Number(form.age),})
        console.log(response.data)
          toast.success(
      response.data.message || "Student added successfully"
    );

    // Clear form after successful submission
    setForm({
      name: "",
      email: "",
      age: "",
      city: "",
      course: "",
    });

    navigate('/list')

   }catch (error) {
    console.error(error);

    if (error.response?.status === 401) return;

    toast.error(
      error.response?.data?.message ||
        "Unable to add student"
    );
  }

    
  }


  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-9 col-lg-7">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Header */}
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="mb-0 fw-bold">
                <i className="bi bi-person-plus-fill me-2"></i>
                Add Student
              </h2>
            </div>

            {/* Form */}
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    <i className="bi bi-person-fill text-primary me-2"></i>
                    Student Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control form-control-lg requird"
                    placeholder="Enter Student Name"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    <i className="bi bi-envelope-fill text-primary me-2"></i>
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter Student Email"
                  />
                </div>

                {/* Age */}
                <div className="mb-3">
                  <label htmlFor="age" className="form-label fw-semibold">
                    <i className="bi bi-calendar-event-fill text-primary me-2"></i>
                    Age
                  </label>

                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter Age"
                  />
                </div>

                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label fw-semibold">
                    <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                    City
                  </label>

                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter City"
                  />
                </div>

                {/* Course */}
                <div className="mb-4">
                  <label htmlFor="course" className="form-label fw-semibold">
                    <i className="bi bi-book-fill text-primary me-2"></i>
                    Course
                  </label>

                  <input
                    type="text"
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Enter Student Course"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-semibold"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Add Student
                </button>
              </form>
            </div>

            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddStudent
