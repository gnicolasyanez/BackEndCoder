import { db } from "../../config/firebase";
import { IProduct } from "../../utils/types/products";
import { ICart } from "../../utils/types/cart";

const cartsCollection = db.collection("carts");

async function getProductsFromCart(id: string) {
  const product = await cartsCollection.doc(id).get();
  return product.data().products;
}
async function createNewCart(products: IProduct[]) {
  const newCart: ICart = {
    products,
  };
  await cartsCollection
    .add(newCart)
    .then((docRef: any) => {
      newCart.id = docRef.id;
    })
    .catch((error: any) => {
      console.error("Error adding document: ", error);
    });
  return newCart;
}
async function addProductsToCart(id: string, product: IProduct[]) {
  const cart = await cartsCollection.doc(id).get();
  const cartProducts = cart.data().products;
  if (!cartProducts) throw new Error("Cart not found");
  const newProducts = cartProducts.concat(product);
  const key = "id";

  const arrayUniqueByKey = [
    ...new Map(newProducts.map((item: IProduct) => [item[key], item])).values(),
  ];
  await cartsCollection
    .doc(id)
    .update({ products: arrayUniqueByKey })
    .catch((error: any) => {
      console.error("Error updating document: ", error);
    });
  return arrayUniqueByKey;
}

async function deleteCart(id: string) {
  await cartsCollection
    .doc(id)
    .delete()
    .catch((error: any) => {
      console.error("Error deleting document: ", error);
    });
}

async function deteleProductsFromCart(id: string, products: IProduct[]) {
  const cart = await cartsCollection.doc(id).get();
  const cartProducts = cart.data().products;

  if (!cartProducts) throw new Error("Cart not found");

  const newProducts = cartProducts.filter((product: IProduct) => {
    return !products.some((p: IProduct) => p.id === product.id);
  });

  await cartsCollection
    .doc(id)
    .update({ products: newProducts })
    .catch((error: any) => {
      console.error("Error updating document: ", error);
    });
  return newProducts;
}

const Products = {
  getProductsFromCart,
  createNewCart,
  addProductsToCart,
  deleteCart,
  deteleProductsFromCart,
};

module.exports = Products;