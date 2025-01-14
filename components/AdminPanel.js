function AdminPanel({ onClose }) {
    const [products, setProducts] = React.useState([]);
    const [editingProduct, setEditingProduct] = React.useState(null);

    React.useEffect(() => {
        try {
            setProducts(loadProducts());
        } catch (error) {
            reportError(error);
        }
    }, []);

    const handleSaveProduct = (productData) => {
        try {
            if (editingProduct) {
                const updatedProducts = updateProduct(editingProduct.id, productData);
                setProducts(updatedProducts);
                setEditingProduct(null);
            } else {
                const updatedProducts = addProduct(productData);
                setProducts(updatedProducts);
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleDeleteProduct = (productId) => {
        try {
            if (confirm('¿Está seguro de que desea eliminar este producto?')) {
                const updatedProducts = deleteProduct(productId);
                setProducts(updatedProducts);
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div data-name="admin-panel" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-y-auto py-8">
            <div className="bg-gray-100 w-full max-w-4xl mx-4 rounded-lg shadow-xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Administrar Productos</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                            </h3>
                            <ProductForm 
                                onSave={handleSaveProduct}
                                initialProduct={editingProduct}
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Productos Existentes</h3>
                            <div className="space-y-4">
                                {products.map(product => (
                                    <div 
                                        key={product.id}
                                        className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                                    >
                                        <div>
                                            <h4 className="font-semibold">{product.name}</h4>
                                            <p className="text-gray-600">${product.price}</p>
                                        </div>
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
