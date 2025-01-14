function StoreInfo({ store }) {
    try {
        if (!store) return null;

        return (
            <div data-name="store-info" className="bg-gray-100 p-6 mb-6 rounded-lg">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
                    <p className="text-gray-600">{store.description}</p>
                    {store.address && (
                        <p className="text-gray-600 mt-2">
                            <span className="font-semibold">Dirección:</span> {store.address}
                        </p>
                    )}
                    {store.phone && (
                        <p className="text-gray-600">
                            <span className="font-semibold">Teléfono:</span> {store.phone}
                        </p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
