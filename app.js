function App() {
    const [user, setUser] = React.useState(null);
    const [showAuthModal, setShowAuthModal] = React.useState(false);
    const [showPolicies, setShowPolicies] = React.useState(false);
    const [cartItems, setCartItems] = React.useState([]);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const [selectedStore, setSelectedStore] = React.useState(null);

    // Cargar carrito guardado al iniciar
    React.useEffect(() => {
        try {
            const savedCart = loadCart();
            if (savedCart.length > 0) {
                setCartItems(savedCart);
            }

            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            reportError(error);
        }
    }, []);

    // Persistir carrito cuando cambie
    React.useEffect(() => {
        try {
            persistCart(cartItems);
        } catch (error) {
            reportError(error);
        }
    }, [cartItems]);

    const handleAddToCart = (product) => {
        try {
            const enrichedProduct = {
                ...product,
                storeId: selectedStore.id,
                storeName: selectedStore.name
            };
            setCartItems(prevItems => addToCart(prevItems, enrichedProduct));
        } catch (error) {
            reportError(error);
        }
    };

    const handleUpdateQuantity = (storeId, productId, quantity) => {
        try {
            setCartItems(prevItems => {
                const updatedItems = updateCartItemQuantity(prevItems, storeId, productId, quantity);
                return updatedItems;
            });
        } catch (error) {
            reportError(error);
        }
    };

    const handleRemoveItem = (storeId, productId) => {
        try {
            setCartItems(prevItems => removeCartItem(prevItems, storeId, productId));
        } catch (error) {
            reportError(error);
        }
    };

    const handleClearCart = () => {
        try {
            setCartItems([]);
            localStorage.removeItem('cartItems');
        } catch (error) {
            reportError(error);
        }
    };

    const handleLogin = (userData) => {
        setUser(userData);
        setShowAuthModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    const handleStoreSelect = (store) => {
        setSelectedStore(store);
    };

    const handleAuthClick = () => {
        setShowAuthModal(true);
    };

    const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div data-name="app" className="min-h-screen bg-gray-100">
            <Header 
                cartCount={cartItemsCount}
                onCartClick={() => setIsCartOpen(true)}
                user={user}
                onAuthClick={handleAuthClick}
                onLogout={handleLogout}
                onPoliciesClick={() => setShowPolicies(true)}
            />
            
            <main className="container mx-auto py-8 px-4">
                <StoreMenu 
                    stores={CONFIG.STORES}
                    selectedStore={selectedStore}
                    onSelectStore={handleStoreSelect}
                />

                {selectedStore && (
                    <div>
                        <StoreInfo store={selectedStore} />
                        <ProductList 
                            products={selectedStore.products}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                )}
            </main>

            {isCartOpen && (
                <Cart
                    items={cartItems}
                    onClose={() => setIsCartOpen(false)}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onClearCart={handleClearCart}
                    user={user}
                    onAuthClick={handleAuthClick}
                />
            )}

            {showAuthModal && (
                <AuthModal
                    onClose={() => setShowAuthModal(false)}
                    onLogin={handleLogin}
                />
            )}

            {showPolicies && (
                <Policies
                    onClose={() => setShowPolicies(false)}
                />
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
