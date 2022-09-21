import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

function ModifShoe() {
  const shoe = useSelector((state) => state.shoes);
  const navigate = useNavigate();
    console.log(shoe)
  return (
    <div>
      <div className="min-h-screen bg-gray-800 flex justify-center items-center py-20">
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
                // if(!values.image){
                //     errorsActicon.image = 'add the image'
                // }

            //color
            if (!values.color) {
              errorsActicon.color = "enter the color correctly";
            }

            //price
            if (!values.price) {
              errorsActicon.price = "enter the price correctly";
            }

            // //size
            // if (!values.size) {
            //   errorsActicon.size = "enter the size correctly";
            // }

            // //q
            if (values.size !== "" && !values.q) {
              errorsActicon.q = "enter the quantity correctly";
            }

            //description
            if (!values.description) {
              errorsActicon.description = "enter the description correctly";
            }

            return errorsActicon;
          }}
          onSubmit={async (e, { resetForm }) => {
            //console.log(e)
                console.log(e.name)
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
            <Form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
              <div>
                <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                 Modif Shoes
                </h1>
                <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                  add some modif shoes to the store!
                </p>
              </div>
              <div className="space-y-3">
                <label>brand</label>
                <Field
                  type="text"
                  name="brand"

                  placeholder={shoe[0].brand}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                />
                <ErrorMessage
                  component={() => (
                    <div className="text-xs px-1  text-red-500" name="brand">
                      {errors.brand}
                    </div>
                  )}
                />
                <label>name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder={shoe[0].name}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                  />
                <ErrorMessage
                  name="name"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.name}
                    </div>
                  )}
                />
                <label>color</label>
                <Field
                  type="text"
                  name="color"
                  placeholder={shoe[0].color}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                />
                <ErrorMessage
                  name="color"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.color}
                    </div>
                  )}
                />
                <label>price</label>
                <Field
                  type="number"
                  name="price"
                  placeholder={shoe[0].price}
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                />
                <ErrorMessage
                  name="price"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.price}
                    </div>
                  )}
                />
                <label>size</label>
                <Field
                  as="select"
                  name="size"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none">
                    <option value="">Size</option>
                  {shoe[0].stock.map(e=> <option value={e._id}>{e.size}</option>)}
                  </Field>
                <ErrorMessage
                  name="size"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.size}
                    </div>
                  )}
                />
                <label>quantity</label>
                <Field
                  type="number"
                  name="q"
                  placeholder="quantity"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
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
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                />
                <ErrorMessage
                  name="description"
                  component={() => (
                    <div className="text-xs px-1  text-red-500">
                      {errors.description}
                    </div>
                  )}
                />
                <label>image</label>
                <input
                  type="file"
                  name="image"
                  placeholder="Image"
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
                  className="py-3 w-64 text-xl rounded-2xl"
                  typeof="submit"
                >
                  MODIF
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ModifShoe;
