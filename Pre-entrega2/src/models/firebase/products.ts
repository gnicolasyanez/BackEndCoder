import { db } from "../../config/firebase";
import { IProduct } from "../../utils/types/products";
import { v4 as uuidv4 } from "uuid";

const prodCollection = db.collection("products");

async function findAll() {
  const products = await prodCollection.get();
  return products.docs.map((doc: any) => doc.data());
}
async function findById(id: string) {
  const product = await prodCollection.doc(id).get();
  return product.data();
}
async function createProduct(product: IProduct) {
  const newProduct = {
    ...product,
    sku: uuidv4(),
  };
  await prodCollection
    .add(newProduct)
    .then((docRef: any) => {
      newProduct.id = docRef.id;
    })
    .catch((error: any) => {
      console.error("Error adding document: ", error);
    });
  return newProduct;
}
async function updateProduct(id: string, product: IProduct) {
  await prodCollection
    .doc(id)
    .update(product)
    .catch((error: any) => {
      console.error("Error updating document: ", error);
    });
  return product;
}
async function deleteProduct(id: string) {
  await prodCollection
    .doc(id)
    .delete()
    .catch((error: any) => {
      console.error("Error deleting document: ", error);
    });
}

const Products = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};

module.exports = Products;