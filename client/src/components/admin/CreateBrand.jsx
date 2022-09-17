import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Swal from "sweetalert2";

function CreateBrand() {
  return (
    <div>
      <div className="min-h-screen bg-gray-800 flex justify-center items-center py-20">
        <Formik 
            initialValues={{
                name:''
            }}
            validate={(values)=>{
                let errorsActicon = {}

                //name
                if(!values.name){
                    errorsActicon.name = 'enter the brand correctly'
                }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                    errorsActicon.name = 'The name can only contain letters and spaces'
                }

                return errorsActicon
            }}
            onSubmit={async(e, {resetForm})=>{
                //console.log(e)
                
                try{
                    console.log('enviado')
                    resetForm();
                    
                    const { data } = await axios.post(
                        "https://sneakers-back-end.herokuapp.com/brands",
                        {
                          name: e.name    
                        })
                        Swal.fire({
                            position: 'top-center',
                            title: `${data}`,
                            showConfirmButton: false,
                            timer: 5000
                          })
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
                        Create Brand
                        </h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                            add some new brand to the store!
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
                </Form>
            )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateBrand;