import {database, ref, onValue, set, push, get} from '../../Firebase/firebaseConfig.js'

export default class DB {

    static async getProductsByCat(slug) {
        const resp = await DB.getAllProducts()
        console.log(resp)
    }

    static getAllProducts() {
        return new Promise((resolve, reject) => {
            try {
                const data = ref(database, 'categories');
                onValue(data, (snapshot) => {
                    const products = snapshot.val();
                    resolve(products);
                }, (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    static async getCartProducts() {
        return new Promise((resolve, reject) => {
            try {
                const data = ref(database, 'cart');
                onValue(data, (snapshot) => {
                    const products = snapshot.val() ? snapshot.val() : [];
                    resolve(products);
                }, (error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    static async getCategoriesById(id) {
      const resp = await DB.getAllProducts()
        if (id) {
            return resp.find((cat) => cat.id === id)
        } else {
            return resp
        }

    }

    static async setProductToCart(data) {
        try {
            const cartRef = ref(database, 'cart/');
            const snapshot = await get(cartRef);
            const currentCart = snapshot.exists() ? snapshot.val() : [];
            const objectToSet = {
                id: data.id,
                data
            };
            currentCart.push(objectToSet);
            await set(cartRef, currentCart);
            return currentCart;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw error;
        }
    }

    static async deleteProductFromCart(productId) {
        try {
            const cartRef = ref(database, 'cart/');
            const snapshot = await get(cartRef);
            if (!snapshot.exists()) {
                throw new Error("Корзина пуста");
            }
            const currentCart = snapshot.val();
            const index = currentCart.findIndex(item => item.id === productId);
            if (index === -1) {
                throw new Error("Товар не найден в корзине");
            }
            currentCart.splice(index, 1)
            await set(cartRef, currentCart);
            return currentCart
        } catch (error) {
            console.error("Ошибка при обновлении товара в корзине:", error);
            throw error;
        }
    }

    static async clearCart() {
        try {
            const cartRef = ref(database, 'cart/');
            await set(cartRef, []);
            console.log("Корзина очищена");
            return [];
        } catch (error) {
            console.error("Ошибка при очистке корзины:", error);
            throw error;
        }
    }

    static async updateProductInCart(productId, updatedData) {
        try {
            const cartRef = ref(database, 'cart/');
            const snapshot = await get(cartRef);
            if (!snapshot.exists()) {
                throw new Error("Корзина пуста");
            }
            const currentCart = snapshot.val();
            const index = currentCart.findIndex(item => item.id === productId);
            if (index === -1) {
                throw new Error("Товар не найден в корзине");
            }
            currentCart[index] = updatedData
            await set(cartRef, currentCart);
            return currentCart[index];
        } catch (error) {
            console.error("Ошибка при обновлении товара в корзине:", error);
            throw error;
        }
    }
}
