function AuthModal({ onClose, onLogin }) {
    try {
        const [isLogin, setIsLogin] = React.useState(true);
        const [userData, setUserData] = React.useState({
            name: '',
            email: '',
            phone: '',
            password: '',
            address: ''
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setUserData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            try {
                e.preventDefault();
                const users = JSON.parse(localStorage.getItem('users') || '[]');

                if (isLogin) {
                    const user = users.find(u => u.email === userData.email && u.password === userData.password);
                    if (user) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        onLogin(user);
                        onClose();
                    } else {
                        alert('Credenciales incorrectas');
                    }
                } else {
                    if (users.some(u => u.email === userData.email)) {
                        alert('El email ya está registrado');
                        return;
                    }

                    const newUser = {
                        ...userData,
                        id: Date.now()
                    };
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    onLogin(newUser);
                    onClose();
                }
            } catch (error) {
                reportError(error);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">
                            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            />
                        </div>

                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Dirección
                                    </label>
                                    <textarea
                                        name="address"
                                        value={userData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows="2"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        >
                            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                        </button>
                    </form>

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="mt-4 text-blue-500 hover:text-blue-700 text-sm"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
