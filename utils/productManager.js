function loadProducts() {
    try {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
        reportError(error);
        return [];
    }
}

function saveProducts(products) {
    try {
        localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
        reportError(error);
    }
}

function addProduct(product) {
    try {
        const products = loadProducts();
        const newProduct = {
            ...product,
            id: Date.now(),
            image: product.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
        };
        products.push(newProduct);
        saveProducts(products);
        return products;
    } catch (error) {
        reportError(error);
        return [];
    }
}

function updateProduct(productId, updatedProduct) {
    try {
        const products = loadProducts();
        const updatedProducts = products.map(product => 
            product.id === productId ? { ...product, ...updatedProduct } : product
        );
        saveProducts(updatedProducts);
        return updatedProducts;
    } catch (error) {
        reportError(error);
        return [];
    }
}

function deleteProduct(productId) {
    try {
        const products = loadProducts();
        const updatedProducts = products.filter(product => product.id !== productId);
        saveProducts(updatedProducts);
        return updatedProducts;
    } catch (error) {
        reportError(error);
        return [];
    }
}
