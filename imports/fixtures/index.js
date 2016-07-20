import accounts from "./accounts";
import orders from "./orders";
import products from "./products";
import shops from "./shops";
import users from "./users";

export default function () {
  shops();
  users();
  accounts();
  products();
  orders();
}
