import { useEffect, useRef } from 'react'

export default function Paypal() {
    const paypal = useRef();
let id_cart = localStorage.getItem("id_cart")
    useEffect(() => {
      window.paypal.Buttons({
            createOrder: async function () {
              return fetch(`http://localhost:3001/paypal/create-payment/${id_cart}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                }
              })
                .then(res => {
                  if (res.ok) return res.json()

                  return res.json().then(json => Promise.reject(json))
                })
                .then(({ id }) => {
                  // localStorage.removeItem("id_cart")
                  return id
                })
                .catch(e => {
                  console.error(e.error)
                })
            },
            onApprove: function (data, actions) {
              return actions.order.capture()
            },
          })
        .render(paypal.current);
    }, []);
  
    return (
      <div>
        <div ref={paypal}></div>
      </div>
    );
}
