import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'

function CreateShoes() {
    return (
    <div>
        <div className="min-h-screen flex justify-center items-center py-20">
        <Formik 
            initialValues={{
                brand:'',
                name:'',
                description:'',
                image:'',
                color:'',
                price:'',
                size:'',
                q:''
            }}
            validate={(values)=>{
                let errorsActicon = {}

                //brand
                if(!values.brand){
                    errorsActicon.brand = 'Enter a valid brand'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.brand)){
                    errorsActicon.brand = 'The name can only contain letters and spaces'
                }

                //name
                if(!values.name){
                    errorsActicon.name = 'Enter a valid name'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                    errorsActicon.name = 'The name can only contain letters and spaces'
                }

                //color
                if(!values.color){
                    errorsActicon.color = 'Enter a valid color'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.color)){
                    errorsActicon.color = 'The name can only contain letters and spaces'
                }

                //price
                if(!values.price){
                    errorsActicon.price = 'Enter a valid price'
                }else if(!/^[0-9]{1,40}$/.test(values.price)){
                    errorsActicon.price = 'Only numbers'
                }

                //size
                if(!values.size){
                    errorsActicon.size = 'Enter a valid size'
                }else if(!/^[0-9]{1,40}$/.test(values.size)){
                    errorsActicon.size = 'only numbers'
                }

                //q
                if(!values.q){
                    errorsActicon.q = 'Enter a valid quantity'
                }else if(!/^[0-9]{1,40}$/.test(values.q)){
                    errorsActicon.q = 'only numbers'
                }

                //description
                if(!values.description){
                    errorsActicon.description = 'Enter a valid description'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.description)){
                    errorsActicon.description = 'The name can only contain letters and spaces'
                }

                return errorsActicon
            }}
            onSubmit={async(e, {resetForm})=>{
                
                try{
                    const { data } = await axios.post(
                        "https://sneakers-back-end.herokuapp.com/shoes",
                        {
                        brand: e.brand,
                        name: e.name,
                        description: e.description,
                        image: e.image,
                        color: e.color,
                        price: e.price,
                        size:e.size,
                        q:e.q
                        }, {
                            "headers":
                            {
                                "Content-Type": "multipart/form-data",
                            }
                        })
                        resetForm();
                        Swal.fire({
                            icon: 'success',
                            title: 'Your shoe was added to store',
                            showConfirmButton: false,
                            timer: 3000
                        })
                }catch(error){
                    console.log(error)
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong creating your shoes",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }
                
            }}
        >
            {({errors, setFieldValue})=>(
                <Form className="py-12 px-12 bg-white rounded-2xl z-20">
                    <div>
                        <h1 className="text-4xl font-bold text-center mb-4">
                        Create Shoes
                        </h1>
                        <p className="text-center mb-8 font-semibold tracking-wide">
                            Add some new shoes to the store!
                        </p>
                    </div>
                    <div className="space-y-3">
                        <Field
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage component={()=>(
                            <div className="text-xs px-1  text-red-500" name="brand">{errors.brand}</div>
                        )}/>
                        <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="name" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.name}</div>
                        )}/>
                        <Field
                        type="text"
                        name="color"
                        placeholder="Color"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="color" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.color}</div>
                        )}/>
                        <Field
                        type="number"
                        name="price"
                        placeholder="Price"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="price" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.price}</div>
                        )}/>
                        <Field
                        type="number"
                        name="size"
                        placeholder="Size"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="size" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.size}</div>
                        )}/>
                        <Field
                        type="number"
                        name="q"
                        placeholder="Quantity"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="q" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.q}</div>
                        )}/>
                        <Field
                        name="description" 
                        as="textarea"                       
                        placeholder="Description"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="description" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.description}</div>
                        )}/>
                        <input
                        type="file"
                        name="image"
                        placeholder="Image"
                        onChange={e => setFieldValue("image", e.target.files[0])}
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="image" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.image}</div>
                        )}/>
                    </div>
                    <div className="text-center mt-6">
                        <button className="py-3 w-64 text-xl rounded-2xl mx-1" typeof='submit'>
                        Create
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

export default CreateShoes;
