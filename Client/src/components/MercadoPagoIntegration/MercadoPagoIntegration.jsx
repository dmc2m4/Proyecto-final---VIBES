import axios from "axios";
import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
const FORM_ID = "payment-form";
import {API_URL} from "../../config"


const MercadoPagoIntegration = ({ items }) => {
  const carrito = useSelector((state) => state.Cart);
  const [preferenceId, setPreferenceId] = useState(null);
  items.Cart = carrito;

  async function getPreference() {
    const response = await axios
      .post(`${API_URL}/product/pay`, items)
      .then((res) => {
        setPreferenceId(res.data.global);
      })
      .catch((e) => e.error);
    return response;
  }
  if (preferenceId) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttribute("data-preference-id", preferenceId);
    const form = document.getElementById(FORM_ID);
    form.appendChild(script);
  }

  useEffect(() => {
    getPreference();
  }, []);

  return <form id={FORM_ID} method='GET' className='pay-button' />;
};

export default MercadoPagoIntegration;
