import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Swal from "sweetalert2";

function CreateShoes() {
  return (
    <div>
      <div className="min-h-screen bg-gray-800 flex justify-center items-center">
        <Formik 
            initialValues={{
                brand:'',
                name:'',
                description:'',
                image:'',
                color:'',
                price:'',
                stock:''
            }}
            validate={(values)=>{
                let errorsActicon = {}

                //brand
                if(!values.brand){
                    errorsActicon.brand = 'ingrese bien el nombre'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.brand)){
                    errorsActicon.brand = 'El nombre solo puede contener letras y espacios'
                }

                //name
                if(!values.name){
                    errorsActicon.name = 'ingrese bien el nombre'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                    errorsActicon.name = 'El nombre solo puede contener letras y espacios'
                }

                //image
                if(!values.image){
                    errorsActicon.image = 'ingrese bien la image'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.image)){
                    errorsActicon.image = 'El nombre solo puede contener letras y espacios'
                }

                //color
                if(!values.color){
                    errorsActicon.color = 'ingrese bien el color'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.color)){
                    errorsActicon.color = 'El nombre solo puede contener letras y espacios'
                }

                //price
                if(!values.price){
                    errorsActicon.price = 'ingrese bien el price'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.price)){
                    errorsActicon.price = 'El nombre solo puede contener letras y espacios'
                }

                //stock
                if(!values.stock){
                    errorsActicon.stock = 'ingrese bien el stock'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.stock)){
                    errorsActicon.stock = 'El nombre solo puede contener letras y espacios'
                }

                //description
                if(!values.description){
                    errorsActicon.description = 'ingrese bien la description'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.description)){
                    errorsActicon.description = 'El nombre solo puede contener letras y espacios'
                }

                return errorsActicon
            }}
            onSubmit={async(e, {resetForm})=>{
                //console.log(e)
                
                try{
                    console.log('enviado')
                    resetForm();
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Your shoe add to store',
                        showConfirmButton: false,
                        timer: 5000
                      })
                    const { data } = await axios.post(
                        "https://sneakers-api-pg.herokuapp.com/shoes",
                        {
                          brand: e.brand,
                          name: e.name,
                          description: e.description,
                          image: e.image,
                          color: e.color,
                          price: e.price,
                          stock: e.stock
                        })
                        console.log(JSON.stringify(data))
                }catch(error){
                    console.log(error)
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: "error in your shoes",
                        showConfirmButton: false,
                        timer: 5000,
                      });
                }
                
            }}
        >
            {({errors})=>(
                <Form className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                        Create Shoes
                        </h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                            add some new shoes to the store!
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Field
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="brand" component={()=>(
                            <div>{errors.brand}</div>
                        )}/>
                        <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="name" component={()=>(
                            <div>{errors.name}</div>
                        )}/>
                        <Field
                        type="text"
                        name="image"
                        placeholder="Image"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="image" component={()=>(
                            <div>{errors.image}</div>
                        )}/>
                        <Field
                        type="text"
                        name="color"
                        placeholder="Color"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="color" component={()=>(
                            <div>{errors.color}</div>
                        )}/>
                        <Field
                        type="text"
                        name="price"
                        placeholder="Price"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="price" component={()=>(
                            <div>{errors.price}</div>
                        )}/>
                        <Field
                        type="text"
                        name="stock"
                        placeholder="Stock"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="stock" component={()=>(
                            <div>{errors.stock}</div>
                        )}/>
                        <Field
                        name="description" 
                        as="textarea"                       
                        placeholder="Description"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="description" component={()=>(
                            <div>{errors.description}</div>
                        )}/>
                    </div>
                    <div className="text-center mt-6">
                        <button className="py-3 w-64 text-xl rounded-2xl" typeof='submit'>
                        Create
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateShoes;
