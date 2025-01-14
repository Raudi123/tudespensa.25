function Cart({ items, onClose, onUpdateQuantity, onRemoveItem, onClearCart, user, onAuthClick }) {
    try {
        const [customerData, setCustomerData] = React.useState({
            name: user ? user.name : '',
            phone: user ? user.phone : '',
            address: user ? user.address : '',
            paymentMethod: 'Zelle',
            zelleInfo: '',
            zellePayerName: '',
            notes: ''
        });
        const [showForm, setShowForm] = React.useState(false);

        React.useEffect(() => {
            if (user) {
                setCustomerData(prev => ({
                    ...prev,
                    name: user.name,
                    phone: user.phone,
                    address: user.address
                }));
            }
        }, [user]);

        // Group items by store for display
        const itemsByStore = items.reduce((acc, item) => {
            if (!acc[item.storeId]) {
                acc[item.storeId] = {
                    storeName: item.storeName,
                    items: []
                };
            }
            acc[item.storeId].items.push(item);
            return acc;
        }, {});

        const baseTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const calculateTotal = () => {
            switch (customerData.paymentMethod) {
                case 'Transferencia CUP':
                    return baseTotal * CONFIG.CONVERSION_RATES.CUP;
                case 'Transferencia MLC':
                    return baseTotal * CONFIG.CONVERSION_RATES.MLC;
                default:
                    return baseTotal;
            }
        };

        const formatTotal = (total, paymentMethod) => {
            switch (paymentMethod) {
                case 'Transferencia CUP':
                    return `${total.toFixed(2)} CUP`;
                case 'Transferencia MLC':
                    return `${total.toFixed(2)} MLC`;
                default:
                    return `$${total.toFixed(2)}`;
            }
        };

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setCustomerData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleProceedToPayment = () => {
            if (!user) {
                onAuthClick();
                return;
            }
            setShowForm(true);
        };

        const handleClearCartClick = () => {
            if (window.confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
                onClearCart();
            }
        };

        const handleCheckout = () => {
            try {
                if (!isFormValid()) {
                    alert('Por favor complete todos los campos requeridos');
                    return;
                }

                const total = calculateTotal();
                const formattedTotal = formatTotal(total, customerData.paymentMethod);

                // Create a single message with all items grouped by store
                let allItemsList = '';
                Object.entries(itemsByStore).forEach(([_, store]) => {
                    allItemsList += `\n*${store.storeName}:*\n`;
                    allItemsList += store.items
                        .map(item => `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
                        .join('\n');
                    allItemsList += '\n';
                });

                let paymentInfo = '';
                if (customerData.paymentMethod === 'Zelle') {
                    paymentInfo = `• Email/Teléfono de Zelle: ${customerData.zelleInfo}
• Nombre del Pagador: ${customerData.zellePayerName}

💳 *Información de Pago:*
Por favor realice el pago vía Zelle y envíe el comprobante por este medio.`;
                } else if (customerData.paymentMethod === 'Transferencia CUP') {
                    paymentInfo = `💳 *Información de Pago:*
Monto en USD: $${baseTotal.toFixed(2)}
Tasa de cambio: ${CONFIG.CONVERSION_RATES.CUP} CUP
Total a pagar: ${formattedTotal}
Por favor realice la transferencia y envíe el comprobante por este medio.`;
                } else if (customerData.paymentMethod === 'Transferencia MLC') {
                    paymentInfo = `💳 *Información de Pago:*
Monto en USD: $${baseTotal.toFixed(2)}
Tasa de cambio: ${CONFIG.CONVERSION_RATES.MLC} MLC
Total a pagar: ${formattedTotal}
Por favor realice la transferencia y envíe el comprobante por este medio.`;
                } else {
                    paymentInfo = `💳 *Información de Pago:*
Pago en efectivo al recibir el pedido.`;
                }

                const message = `🛒 *Nuevo Pedido*\n
👤 *Datos del Cliente:*
• Nombre: ${customerData.name}
• Teléfono: ${customerData.phone}
• Dirección: ${customerData.address}
• Método de Pago: ${customerData.paymentMethod}
${paymentInfo}
${customerData.notes ? `\n📝 *Notas:*\n${customerData.notes}` : ''}
\n🛍️ *Productos:*${allItemsList}
\n💰 *Total a Pagar: ${formattedTotal}*`;

                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
                onClearCart();
                onClose();
            } catch (error) {
                reportError(error);
            }
        };

        const isFormValid = () => {
            const baseValidation = customerData.name && 
                                 customerData.phone && 
                                 customerData.address;

            if (customerData.paymentMethod === 'Zelle') {
                return baseValidation && 
                       customerData.zelleInfo && 
                       customerData.zellePayerName;
            }
            
            return baseValidation;
        };

        const renderPaymentFields = () => {
            if (customerData.paymentMethod === 'Zelle') {
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email o Teléfono de Zelle *
                            </label>
                            <input
                                type="text"
                                name="zelleInfo"
                                value={customerData.zelleInfo}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                                placeholder="Email o número de teléfono para Zelle"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del Pagador Zelle *
                            </label>
                            <input
                                type="text"
                                name="zellePayerName"
                                value={customerData.zellePayerName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                                required
                                placeholder="Nombre completo del titular de Zelle"
                            />
                        </div>
                    </div>
                );
            }
            return null;
        };

        const total = calculateTotal();
        const formattedTotal = formatTotal(total, customerData.paymentMethod);

        return (
            <div data-name="cart-modal" className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
                <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 data-name="cart-title" className="text-2xl font-bold">Carrito</h2>
                        <button 
                            data-name="close-cart-button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {items.length === 0 ? (
                        <p data-name="empty-cart-message" className="text-gray-500 text-center">El carrito está vacío</p>
                    ) : (
                        <div>
                            {Object.entries(itemsByStore).map(([storeId, store]) => (
                                <div key={storeId} className="mb-6">
                                    <h3 className="font-semibold text-lg mb-2">{store.storeName}</h3>
                                    {store.items.map(item => (
                                        <div 
                                            key={`${item.storeId}-${item.id}`} 
                                            data-name="cart-item"
                                            className="flex items-center gap-4 border-b py-4"
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-grow">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-gray-600">${item.price}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.storeId, item.id, Math.max(0, item.quantity - 1))}
                                                        className="bg-gray-200 px-2 rounded"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.storeId, item.id, item.quantity + 1)}
                                                        className="bg-gray-200 px-2 rounded"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => onRemoveItem(item.storeId, item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}

                            <div className="mt-6">
                                <div data-name="cart-total" className="text-xl font-bold mb-4">
                                    Total: {formattedTotal}
                                </div>

                                <div className="space-y-4">
                                    {!showForm && (
                                        <div className="space-y-4">
                                            <button 
                                                onClick={handleProceedToPayment}
                                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                                            >
                                                {user ? "Proceder con el Pago" : "Iniciar Sesión para Comprar"}
                                            </button>
                                            <button 
                                                onClick={handleClearCartClick}
                                                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
                                            >
                                                Vaciar Carrito
                                            </button>
                                        </div>
                                    )}

                                    {showForm && user && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Método de Pago *
                                                </label>
                                                <select
                                                    name="paymentMethod"
                                                    value={customerData.paymentMethod}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded"
                                                    required
                                                >
                                                    <option value="Zelle">Zelle</option>
                                                    <option value="Transferencia CUP">Transferencia CUP</option>
                                                    <option value="Transferencia MLC">Transferencia MLC</option>
                                                    <option value="Efectivo">Efectivo al recibir</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nombre Completo *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={customerData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded"
                                                    required
                                                    placeholder="Ej: Juan Pérez"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Teléfono *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={customerData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded"
                                                    required
                                                    placeholder="Ej: +53 5555-5555"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Dirección de Entrega *
                                                </label>
                                                <textarea
                                                    name="address"
                                                    value={customerData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded"
                                                    rows="2"
                                                    required
                                                    placeholder="Calle, Número, Ciudad, Referencia"
                                                />
                                            </div>
                                            {renderPaymentFields()}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Notas Adicionales
                                                </label>
                                                <textarea
                                                    name="notes"
                                                    value={customerData.notes}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border rounded"
                                                    rows="2"
                                                    placeholder="Instrucciones especiales de entrega, etc."
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={() => setShowForm(false)}
                                                    className="w-1/2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
                                                >
                                                    Volver
                                                </button>
                                                <button 
                                                    onClick={handleCheckout}
                                                    disabled={!isFormValid()}
                                                    className="w-1/2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                >
                                                    Confirmar Pedido
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
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
