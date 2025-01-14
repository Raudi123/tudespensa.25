function StoreSelector({ stores, selectedStore, onSelectStore }) {
    try {
        return (
            <div data-name="store-selector" className="bg-white shadow-md p-4 mb-6">
                <div className="container mx-auto">
                    <select
                        value={selectedStore?.id || ''}
                        onChange={(e) => onSelectStore(stores.find(s => s.id === e.target.value))}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Selecciona una tienda</option>
                        {stores.map(store => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
