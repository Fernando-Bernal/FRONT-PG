import { useSelector } from "react-redux";

function Orders() {

  const order = useSelector((state)=> state.order)

  return (
    <div>
      <div className="bg-opacity-50 py-40">
        <div className="container mx-auto max-w-2xl shadow-md md:w-3/4 border bg-green-800 rounded-lg">
            <p className="flex items-center text-2xl font-bold justify-center text-black">Order</p>
            <p className="flex items-center text-xs font-semibold justify-center text-black">Stripe: {order[0].idPayment}</p>
            <p className="flex items-center text-xs font-semibold justify-center text-black">Client: {order[0].email}</p>
          <div className="relative flex items-center">
            <div>
              {order[0]?.shoe.map((e) => {
                return (
                  <div>
                    <section key={e._id}>
                      <ul>
                        <li>
                          <article className="inline-block p-2 cursos-pointer hover:scale-105 ease-in-out duration-200 hover:bg-[#00ff01]">
                            <img
                              src={e.image}
                              alt=""
                              className="w-16 h-16 object-contain"
                            />
                            <div>
                              <h3 className="text-sm font-semibold capitalize">
                                {e.name}
                              </h3>
                              <p className="text-s text-black">${e.price}</p>
                              <p className="text-s text-black">size: {e.size}</p>
                              <p className="text-s text-black">quantity: {e.quantity}</p>
                            </div>
                          </article>
                        </li>
                      </ul>
                    </section>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
