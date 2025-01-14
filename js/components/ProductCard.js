function ProductCard({ product, onAddToCart }) {
    try {
        return (
            <div data-name="product-card" className="product-card bg-white rounded-lg shadow-md p-4 flex flex-col">
                <img 
                    data-name="product-image"
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 data-name="product-name" className="text-lg font-semibold mb-2">{product.name}</h3>
                <p data-name="product-description" className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span data-name="product-price" className="text-xl font-bold">${product.price}</span>
                    <button
                        data-name="add-to-cart-button"
                        onClick={() => onAddToCart(product)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
