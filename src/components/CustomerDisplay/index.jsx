import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  updateCurrentCustomerThunk,
  fetchCurrentCustomerThunk,
} from "../../thunkActionsCreator/userThunks";
import Loader from "../Loader";

export function BillingDisplay() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.user.customer);
  const [billing, setBilling] = useState(customer?.billing || {});

  const handleBillingChange = (key, value) => {
    setBilling((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmitBilling = (e) => {
    e.preventDefault();
    dispatch(updateCurrentCustomerThunk({ billing }));
  };

  if (!customer) return <Loader size="lg" />;

  return (
    <div>
      <h2>Informations de facturation</h2>
      <form onSubmit={handleSubmitBilling}>
        {customer &&
          Object.entries(billing).map(([key, value]) => (
            <p key={key}>
              {key} :{" "}
              <input
                key={key}
                placeholder={key}
                value={billing[key] || ""}
                onChange={(e) => handleBillingChange(key, e.target.value)}
              />
            </p>
          ))}
        <button type="submit">Enregistrer informations</button>
      </form>
    </div>
  );
}

export function ShippingDisplay() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.user.customer);
  const [shipping, setShipping] = useState(customer?.shipping || {});

  const handleShippingChange = (key, value) => {
    setShipping((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmitShipping = (e) => {
    e.preventDefault();
    dispatch(updateCurrentCustomerThunk({ shipping }));
  };

  if (!customer) return <Loader size="lg" />;

  return (
    <div>
      <h2>Informations de livraison</h2>

      <form onSubmit={handleSubmitShipping}>
        {customer &&
          Object.entries(shipping).map(([key, value]) => (
            <p key={key}>
              {key} :{" "}
              <input
                key={key}
                placeholder={key}
                value={shipping[key] || ""}
                onChange={(e) => handleShippingChange(key, e.target.value)}
              />
            </p>
          ))}

        <button type="submit">Enregistrer informations</button>
      </form>
    </div>
  );
}
