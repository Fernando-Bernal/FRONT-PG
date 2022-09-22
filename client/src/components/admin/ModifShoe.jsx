import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'

function ModifShoe() {
  const shoe = useSelector((state) => state.shoes);
  const navigate = useNavigate();
    console.log(shoe)
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center py-20">
        <Formik
          initialValues={{
            brand: `${shoe[0].brand}`,
            name: `${shoe[0].name}`,
            description: `${shoe[0].description}`,
            image: "",
            color: `${shoe[0].color}`,
            price: `${shoe[0].price}`,
            size: "",
            q: ""
          }}
          validate={(values) => {
            let errorsActicon = {};

           //brand
            if (!values.brand) {
              errorsActicon.brand = "enter the brand correctly";
            }

            //name
            if (!values.name) {
              errorsActicon.name = "enter the name correctly";
            }

            //image
                if(!values.image){
                    errorsActicon.image = 'add the image'
                }

            //color
            if (!values.color) {
              errorsActicon.color = "enter the color correctly";
            }

            //price
            if (!values.price) {
              errorsActicon.price = "enter the price correctly";
            }

            //size
            if (!values.size) {
              errorsActicon.size = "enter the size correctly";
            }

            //q
            if (!values.q) {
              errorsActicon.q = "enter the quantity correctly";
            }

            //description
            if (!values.description) {
              errorsActicon.description = "enter the description correctly";
            }

            return errorsActicon;
          }}
          onSubmit={async (e, { resetForm }) => {
            try {
              const { data } = await axios.put(
                `https://sneakers-back-end.herokuapp.com/shoes/${shoe[0]._id}`,
                {
                  brand: e.brand,
                  name: e.name,
                  description: e.description,
                  image: e.image,
                  color: e.color,
                  price: e.price,
                  size: e.size,
                  q: e.q,
                  onSale: false
                },{
                  "headers":{
                    "Content-Type": "multipart/form-data"
                  }
                }
              );
              navigate("/admin");
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your modif shoe add to store",
                showConfirmButton: false,
                timer: 5000,
              });
              resetForm();
            } catch (error) {
              console.log(error);
              Swal.fire({
                position: "top-center",
                icon: "error",
                title: "error in your modif shoes",
                showConfirmButton: false,
                timer: 5000,
              });
            }
          }}
        >
          {({ errors, setFieldValue }) => (
            <Form className="py-12 px-12 bg-white rounded-2xl z-20">
              <div>
                <h1 className="text-3xl font-bold text-center mb-4">
                  Modify Shoes
                </h1>
                <p className="text-center text-sm mb-8 font-semibold tracking-wide">
                  Add some modif shoes to the store!
                </p>
              </div>
              <div className="">
                <label>Brand</label>
                <Field
                  type="text"
                  name="brand"
                  placeholder={shoe[0].brand}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none uppercase mb-4"
                />
                <ErrorMessage
                  component={() => (
                    <div className="text-xs px-1  text-red-500" name="brand">
                      {errors.brand}
                    </div>
                  )}
                />
                <label>Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder={shoe[0].name}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none capitalize mb-4"
                  />
                <ErrorMessage
                  name="name"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.name}
                    </div>
                  )}
                />
                <label>Color</label>
                <Field
                  type="text"
                  name="color"
                  placeholder={shoe[0].color}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4"
                />
                <ErrorMessage
                  name="color"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.color}
                    </div>
                  )}
                />
                <label>Price</label>
                <Field
                  type="number"
                  name="price"
                  placeholder={shoe[0].price}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4"
                />
                <ErrorMessage
                  name="price"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.price}
                    </div>
                  )}
                />
                <label>Size</label>
                <Field
                  as="select"
                  name="size"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4">
                  {shoe[0].stock.map(e=> <option value={e.size}>{e.size}</option>)}
                  </Field>
                <ErrorMessage
                  name="size"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.size}
                    </div>
                  )}
                />
                <label>Quantity</label>
                <Field
                  type="number"
                  name="q"
                  placeholder="quantity"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4"
                />
                <ErrorMessage
                  name="q"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">{errors.q}</div>
                  )}
                />
                <label>Description</label>
                <Field
                  name="description"
                  as="textarea"
                  placeholder={shoe[0].description}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4"
                />
                <ErrorMessage
                  name="description"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.description}
                    </div>
                  )}
                />
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={e => setFieldValue("image", e.target.files[0])}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                />
                <ErrorMessage
                  name="image"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.image}
                    </div>
                  )}
                />
              </div>
              <div className="text-center mt-6">
                <button
                  className="py-3 w-64 text-xl rounded-2xl mx-1"
                  typeof="submit"
                >
                  Modify
                </button>
                <Link to='/admin'><button className="py-3 w-64 text-xl rounded-2xl mx-1">
                        Back to Admin
                        </button></Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ModifShoe;
