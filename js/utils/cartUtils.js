// Funciones de utilidad para el carrito
function addToCart(cartItems, product) {
    try {
        const existingItemIndex = cartItems.findIndex(
            item => item.id === product.id && item.storeId === product.storeId
        );
        
        if (existingItemIndex >= 0) {
            return cartItems.map((item, index) =>
                index === existingItemIndex
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        
        return [...cartItems, { ...product, quantity: 1 }];
    } catch (error) {
        reportError(error);
        return cartItems;
    }
}

function updateCartItemQuantity(cartItems, storeId, productId, quantity) {
    try {
        if (quantity === 0) {
            return cartItems.filter(
                item => !(item.storeId === storeId && item.id === productId)
            );
        }
        
        return cartItems.map(item =>
            item.storeId === storeId && item.id === productId
                ? { ...item, quantity }
                : item
        );
    } catch (error) {
        reportError(error);
        return cartItems;
    }
}

function removeCartItem(cartItems, storeId, productId) {
    try {
        return cartItems.filter(
            item => !(item.storeId === storeId && item.id === productId)
        );
    } catch (error) {
        reportError(error);
        return cartItems;
    }
}

function persistCart(cartItems) {
    try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
        reportError(error);
    }
}

function loadCart() {
    try {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        reportError(error);
        return [];
    }
}
