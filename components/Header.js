function Header({ cartCount, onCartClick, user, onAuthClick, onLogout, onPoliciesClick }) {
    try {
        return (
            <header data-name="header" className="bg-gray-800 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <h1 data-name="header-title" className="text-2xl font-bold">Tu Tienda de Alimentos</h1>
                        <button
                            onClick={onPoliciesClick}
                            className="text-sm hover:text-gray-300"
                        >
                            Políticas
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span>Hola, {user.name}</span>
                                <button
                                    onClick={onLogout}
                                    className="text-sm hover:text-gray-300"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={onAuthClick}
                                className="hover:text-gray-300"
                            >
                                Iniciar Sesión
                            </button>
                        )}
                        <button 
                            data-name="cart-button"
                            onClick={onCartClick}
                            className="relative p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span data-name="cart-count" className="cart-badge bg-red-500 text-white text-xs flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
