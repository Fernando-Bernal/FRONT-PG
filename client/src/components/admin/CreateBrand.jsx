import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'

function CreateBrand() {
    return (
    <div>
        <div className="min-h-screen flex justify-center items-center py-20">
        <Formik 
            initialValues={{
                name:''
            }}
            validate={(values)=>{
                let errorsActicon = {}

                //name
                if(!values.name){
                    errorsActicon.name = 'Enter a valid brand name'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                    errorsActicon.name = 'The name can only contain letters and spaces'
                }

                return errorsActicon
            }}
            onSubmit={async(e, {resetForm})=>{
                try{
                    resetForm();
                    
                    const { data } = await axios.post(
                        "https://sneakers-back-end.herokuapp.com/brands",
                        {
                            name: e.name    
                        })
                        Swal.fire({
                            title: `${data}`,
                            showConfirmButton: false,
                            timer: 3000
                        })
                }catch(error){
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong creating your brand",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }
                
            }}
        >
            {({errors})=>(
                <Form className="py-12 px-12 bg-white rounded-2xl z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4">
                        Create Brand
                        </h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold tracking-wide">
                            Add some new brand to the store!
                        </p>
                    </div>
                    <div className="space-y-3">
                        <Field
                        type="text"
                        name="name"
                        placeholder="name of brand"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage component={()=>(
                            <div className="text-xs px-1  text-red-500" name="name">{errors.name}</div>
                        )}/>
                    </div>
                    <div className="text-center mt-6">
                        <button className="py-3 w-64 text-xl rounded-2xl" typeof='submit'>
                        Create
                        </button>
                    </div>
                    <div className="text-center mt-6">
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

export default CreateBrand;