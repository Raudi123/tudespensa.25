function StoreMenu({ stores, selectedStore, onSelectStore }) {
    try {
        const [isOpen, setIsOpen] = React.useState(false);

        return (
            <div data-name="store-menu" className="bg-white shadow-lg mb-6 relative">
                <div className="container mx-auto px-4">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full py-4 px-6 flex items-center justify-between bg-white hover:bg-gray-50"
                    >
                        <span className="text-lg font-medium">
                            {selectedStore ? selectedStore.name : 'Selecciona una tienda'}
                        </span>
                        <svg 
                            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 max-h-96 overflow-y-auto">
                            {stores.map(store => (
                                <button
                                    key={store.id}
                                    onClick={() => {
                                        onSelectStore(store);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-6 py-4 text-left hover:bg-gray-50 flex items-center justify-between ${
                                        selectedStore?.id === store.id ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <div>
                                        <div className="font-medium text-gray-900">{store.name}</div>
                                        <div className="text-sm text-gray-500">{store.description}</div>
                                    </div>
                                    {selectedStore?.id === store.id && (
                                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
