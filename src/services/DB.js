export default class DB {
  static async getAllProducts() {
    try {
      const resp = await fetch("http://localhost:3001/products");
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }
  static async getCartProducts() {
    try {
      const resp = await fetch("http://localhost:3001/cart");
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }
  static async setProductToCart(data) {
    try {
      const resp = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteProductFromCart(productId) {
    try {
      const resp = await fetch(`http://localhost:3001/cart/${productId}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        throw new Error("Ошибка при удалении товара");
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async updateProductInCart(productId, updatedData) {
    try {
      const resp = await fetch(`http://localhost:3001/cart/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!resp.ok) {
        throw new Error("Ошибка при обновлении товара");
      }

      return await resp.json();
    } catch (error) {
      console.error(error);
    }
  }
}
