import { UpdateForm } from "../../components/Profile/UpdateUser";
import DeleteAccountButton from "../../components/DeleteAccountButton";
import {
  UserDisplay,
  CustomerDisplay,
} from "../../components/Profile/UserDisplay";
import { OrderAll } from "../../components/OrderAll";

export default function Profile() {
  return (
    <main>
      <UserDisplay />
      <UpdateForm />
      <CustomerDisplay />
      <OrderAll />
      <DeleteAccountButton />
    </main>
  );
}
