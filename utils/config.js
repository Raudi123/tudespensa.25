// Configuración global disponible para todos los componentes
const CONFIG = {
    WHATSAPP_NUMBER: '5354066204',
    PAYMENT_METHODS: {
        ZELLE: 'Zelle',
        TRANSFER_CUP: 'Transferencia CUP',
        TRANSFER_MLC: 'Transferencia MLC',
        CASH: 'Efectivo'
    },
    CONVERSION_RATES: {
        CUP: 320,
        MLC: 1.15
    },
    STORES: [
        {
            id: 'store1',
            name: 'Restaurante El Sabor',
            description: 'Comida tradicional cubana y platos internacionales',
            address: 'Calle 23, La Habana',
            phone: '+53 5555-1234',
            whatsappNumber: '5355551234',
            products: [
                {
                    id: 1,
                    name: "Ropa Vieja",
                    description: "Plato tradicional cubano de carne deshebrada",
                    price: 12.99,
                    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                    id: 2,
                    name: "Arroz con Pollo",
                    description: "Arroz amarillo con pollo y vegetales",
                    price: 10.99,
                    image: "https://images.unsplash.com/photo-1512058556646-c4da40fba323?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
                }
            ]
        },
        {
            id: 'store2',
            name: 'Cafetería Dulce',
            description: 'Postres, dulces y bebidas calientes',
            address: 'Avenida 5ta, Miramar',
            phone: '+53 5555-5678',
            whatsappNumber: '5355555678',
            products: [
                {
                    id: 1,
                    name: "Flan de Caramelo",
                    description: "Flan casero con salsa de caramelo",
                    price: 5.99,
                    image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
                },
                {
                    id: 2,
                    name: "Café Cubano",
                    description: "Café expreso tradicional cubano",
                    price: 2.99,
                    image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80"
                }
            ]
        }
    ]
};

// Variables y funciones globales
window.APP = {
    config: CONFIG
};
