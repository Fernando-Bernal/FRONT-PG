import { useSelector } from "react-redux";
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios';
import Swal from "sweetalert2";

function CreateSize() {

   const shoe = useSelector((state) => state.shoes);

  return (
    <div>
      <div className="min-h-screen bg-gray-800 flex justify-center items-center py-20">
        <Formik 
            initialValues={{
                size:'',
                q:''
            }}
            validate={(values)=>{
                let errorsActicon = {}

                //size
                if(!values.size){
                    errorsActicon.size = 'enter the size correctly'
                }else if(!/^[0-9]{1,40}$/.test(values.size)){
                    errorsActicon.size = 'The size can only contain number'
                }
                //q
                if(!values.q){
                    errorsActicon.q = 'enter the quantity correctly'
                }else if(!/^[0-9]{1,40}$/.test(values.q)){
                    errorsActicon.q = 'The quantity can only contain number'
                }

                return errorsActicon
            }}
            onSubmit={async(e, {resetForm})=>{
                //console.log(e)
                try{
                    console.log('enviado') 
                    const { data } = await axios.put(
                        `https://sneakers-back-end.herokuapp.com/shoes/addSize/${shoe[0]._id}`,
                        {
                            size: e.size,
                            q:e.q
                        })
                        Swal.fire({
                            position: 'top-center',
                            title: `${data}`,
                            showConfirmButton: false,
                            timer: 5000
                        })
                        resetForm();
                }catch(error){
                    console.log(error)
                    Swal.fire({
                        position: "top-center",
                        icon: "error",
                        title: "error in your size",
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
                        Create size
                        </h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                            add some new size to the shoe!
                        </p>
                    </div>
                    <div className="space-y-3">
                        <Field
                        type="number"
                        name="size"
                        placeholder="number the size"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage component={()=>(
                            <div className="text-xs px-1  text-red-500" name="size">{errors.size}</div>
                        )}/>
                        <Field
                        type="number"
                        name="q"
                        placeholder="quantity"
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        />
                        <ErrorMessage component={()=>(
                            <div className="text-xs px-1  text-red-500" name="q">{errors.q}</div>
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

export default CreateSize;