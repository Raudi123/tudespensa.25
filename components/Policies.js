function Policies({ onClose }) {
    try {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Políticas</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h3 className="text-xl font-semibold mb-2">Política de Privacidad</h3>
                            <div className="space-y-2 text-gray-600">
                                <p>Nos comprometemos a proteger tu privacidad y datos personales:</p>
                                <ul className="list-disc pl-5">
                                    <li>Solo recolectamos información necesaria para procesar tu pedido</li>
                                    <li>Tus datos no serán compartidos con terceros</li>
                                    <li>La información de pago se maneja de forma segura</li>
                                    <li>Puedes solicitar la eliminación de tus datos en cualquier momento</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-2">Política de Devolución</h3>
                            <div className="space-y-2 text-gray-600">
                                <p>Nuestra política de devolución garantiza tu satisfacción:</p>
                                <ul className="list-disc pl-5">
                                    <li>Si el producto no cumple con tus expectativas, puedes devolverlo en las primeras 24 horas</li>
                                    <li>El producto debe estar en su estado original</li>
                                    <li>Reembolso completo o cambio por otro producto</li>
                                    <li>En caso de productos dañados, cubrimos los gastos de devolución</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold mb-2">Contacto</h3>
                            <p className="text-gray-600">
                                Para cualquier consulta sobre nuestras políticas, contáctanos a través de WhatsApp 
                                al número: {CONFIG.WHATSAPP_NUMBER}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
