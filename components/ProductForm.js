function ProductForm({ onSave, initialProduct = null }) {
    const [product, setProduct] = React.useState(
        initialProduct || {
            name: '',
            description: '',
            price: '',
            image: ''
        }
    );

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if (!product.name || !product.price) {
                alert('Por favor complete los campos requeridos');
                return;
            }
            onSave(product);
            if (!initialProduct) {
                setProduct({
                    name: '',
                    description: '',
                    price: '',
                    image: ''
                });
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setProduct(prev => ({
                ...prev,
                [name]: value
            }));
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <form data-name="product-form" onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Nombre del Producto *
                </label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Descripción
                </label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    rows="3"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Precio *
                </label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    URL de la Imagen
                </label>
                <input
                    type="url"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    placeholder="https://ejemplo.com/imagen.jpg"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
                {initialProduct ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
        </form>
    );
}
