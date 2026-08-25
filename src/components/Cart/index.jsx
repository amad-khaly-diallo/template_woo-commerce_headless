import "./index.css";

import { useSelector, useDispatch } from "react-redux";
import { CartProduct } from "../CartProduct";
import { emptyCartThunk } from "../../thunkActionsCreator/cartThunks";
import Coupon from "../Coupon";
import StripeWrapper from "../StripeWrapper";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const totals = useSelector((state) => state.cart.totals);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <ul>
        {items.map((item) => (
          <CartProduct key={item.key} item={item} />
        ))}
      </ul>

      <Coupon />

      <div className="total">
        <p>
          Total:{" "}
          {totals &&
            (parseInt(totals.total_price) / 100).toFixed(2) +
              totals.currency_suffix}
        </p>
        <button onClick={() => dispatch(emptyCartThunk())}>Vider Panier</button>
      </div>
      <StripeWrapper></StripeWrapper>
    </div>
  );
}
