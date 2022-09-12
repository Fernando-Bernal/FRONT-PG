import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Swal from "sweetalert2";
import Address from './Address';

function checkout() {

  const stripePromise = loadStripe('pk_test_51Lgvm7FNV3brqOrQwACULzmK8Gh8gtEI1Tu1atrISNC3OfZ78CaUs8SIUTnl9wRvxacqpxPeeiwtYQT8ifSSaS2d00gs1hTmxj')


  const CheckoutForm = () =>{

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) =>{
      e.preventDefault()
    
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name:e.target.name.value,
          //email:e.target.email.value,
          address:{
            city: e.target.city.value,
            //country: e.target.country.value,
            line1: e.target.line1.value,
            line2: e.target.line2.value,
            state: e.target.state.value,
            //postal_code: e.target.postal_code.value
          }
        }
      })

      if(!error){
        console.log(paymentMethod)
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'your payment has been successful',
          showConfirmButton: false,
          timer: 5000
        })
      }else{
        console.log(error)
        e.preventDefault()
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'error in your payment',
          showConfirmButton: false,
          timer: 3000
      })
      }
    }

    const cardElementOption = {
      style:{
        base:{
          fontSize: '14px',
          iconColor: '#00ff01',
          backgroundColor: '#1F2937',
          "::placeholder":{
            color:"#9CA3AF",
            backgroundColor: '#1F2937'
             
          },
          ":hover":{
            iconColor: '#ffff01',
            backgroundColor: '#1F2937'
          }
        },
        invalid:{
          
        }
      }
    }

    return (
      <form onSubmit={handleSubmit}>

            <Address/>

            <span className="text-xl font-medium text-gray-100 block py-3">
              Card Details
            </span>

            <span className="text-xs text-gray-400 ">Card Type</span>

            <div className="overflow-visible flex justify-between items-center mt-2">
              <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
                <span className="italic text-lg font-medium text-gray-200 underline">
                  VISA
                </span>

                <div className="flex justify-between items-center pt-4 ">
                  <span className="text-xs text-gray-200 font-medium">****</span>
                  <span className="text-xs text-gray-200 font-medium">****</span>
                  <span className="text-xs text-gray-200 font-medium">****</span>
                  <span className="text-xs text-gray-200 font-medium">****</span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs  text-gray-200">Giga Tamarashvili</span>
                  <span className="text-xs  text-gray-200">12/18</span>
                </div>
              </div>

              <div className="flex justify-center  items-center flex-col">
                <img
                  src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
                  width="40"
                  alt=""
                  className="relative right-5"
                />
                <span className="text-xs font-medium text-gray-200 bottom-2 relative right-5">
                  mastercard.
                </span>
              </div>
            </div>

            <div className="flex justify-center flex-col pt-3">
              <label className="text-xs text-gray-400 ">Name on Card</label>
              <input
                type="text"
                name="name"
                className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                placeholder="Giga Tamarashvili2"
              />
              
            </div>

            <div className='flex justify-center flex-col pt-3'>
              <CardElement className=' p-2 border bg-gray-800 border-gray-600 hover:border-blue-600' options={cardElementOption}/>
            </div>

            <button type="submit" className="h-12 w-full mt-3 bg-[#00ff01] rounded focus:outline-none text-white hover:bg-blue-600" disabled={!stripe}>
              Check Out
            </button>
      </form>
    )
  }
  

  return (
    <div>
      <Elements stripe={stripePromise}>
        <div>
          <div className=" p-5 bg-[#2f3436] rounded overflow-visible">
              <div className="flex justify-center flex-col pt-3">
                <CheckoutForm/>
              </div>
            </div>
        </div>
      </Elements>
    </div>
  );
}

export default checkout;
