import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Swal from "sweetalert2";

function CreateShoes() {
  return (
    <div>
      <div className="min-h-screen bg-gray-800 flex justify-center items-center py-20">
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
                    errorsActicon.brand = 'enter the brand correctly'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.brand)){
                    errorsActicon.brand = 'El nombre solo puede contener letras y espacios'
                }

                //name
                if(!values.name){
                    errorsActicon.name = 'enter the name correctly'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                    errorsActicon.name = 'El nombre solo puede contener letras y espacios'
                }

                //image
                if(!values.image){
                    errorsActicon.image = 'enter the link correctly'
                }else if(!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(values.image)){
                    errorsActicon.image = 'El nombre solo puede contener letras y espacios'
                }

                //color
                if(!values.color){
                    errorsActicon.color = 'enter the color correctly'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.color)){
                    errorsActicon.color = 'El nombre solo puede contener letras y espacios'
                }

                //price
                if(!values.price){
                    errorsActicon.price = 'enter the price correctly'
                }else if(!/^[0-9]{1,40}$/.test(values.price)){
                    errorsActicon.price = 'El nombre solo puede contener letras y espacios'
                }

                //size
                if(!values.size){
                    errorsActicon.size = 'enter the size correctly'
                }else if(!/^[0-9]{1,40}$/.test(values.size)){
                    errorsActicon.size = 'El nombre solo puede contener letras y espacios'
                }

                //q
                if(!values.q){
                    errorsActicon.q = 'enter the quantity correctly'
                }else if(!/^[0-9]{1,40}$/.test(values.q)){
                    errorsActicon.q = 'El nombre solo puede contener letras y espacios'
                }

                //description
                if(!values.description){
                    errorsActicon.description = 'enter the description correctly'
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
                        "https://sneakers-back-end.herokuapp.com/shoes",
                        {
                          brand: e.brand,
                          name: e.name,
                          description: e.description,
                          image: e.image,
                          color: e.color,
                          price: e.price,
                          stock: [{
                            size:e.size,
                            q:e.q
                          }]
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
                        name="image"
                        placeholder="Image"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="image" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.image}</div>
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
                        placeholder="size"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage name="size" component={()=>(
                            <div className="text-xs px-1  text-red-500">{errors.size}</div>
                        )}/>
                        <Field
                        type="number"
                        name="q"
                        placeholder="quantity"
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
