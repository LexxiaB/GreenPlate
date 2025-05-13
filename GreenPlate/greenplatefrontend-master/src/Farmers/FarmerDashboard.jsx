import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Farmer data
    const [farmer, setFarmer] = useState({
        name: "Smith Family Farm",
        id: "ef31615e-cf85-4b73-8bd2-c666481b80a1",
        farmName: "Smith Family Farm",
        acceptsCompost: true,
        email: "farmer@smith.com",
        contactNumber: "555-123-4567"
    });

    // Farmer products
    const [farmerProducts, setFarmerProducts] = useState([
        {
            listingId: 1,
            name: 'Organic Vegetable Box',
            basePrice: 2499,
            currentPrice: 2499,
            quantity: 15,
            description: 'Seasonal assortment of fresh vegetables.',
            category: 'Vegetables',
            expiryDate: '2025-06-01T20:00:00Z',
            minDiscount: 0,
            maxDiscount: 20,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'Farm pickup or local delivery',
            listingType: 'VEGETABLE',
            harvestDate: '2025-05-10T06:00:00Z'
        },
        {
            listingId: 2,
            name: 'Fresh Herbs Bundle',
            basePrice: 899,
            currentPrice: 899,
            quantity: 25,
            description: 'Bundle of fresh herbs.',
            category: 'Herbs',
            expiryDate: '2025-05-25T20:00:00Z',
            minDiscount: 0,
            maxDiscount: 15,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'Farm pickup or local delivery',
            listingType: 'HERB',
            harvestDate: '2025-05-12T06:00:00Z'
        },
        {
            listingId: 3,
            name: 'Heirloom Tomatoes',
            basePrice: 1250,
            currentPrice: 1250,
            quantity: 30,
            description: 'Mixed variety of heirloom tomatoes.',
            category: 'Vegetables',
            expiryDate: '2025-05-20T20:00:00Z',
            minDiscount: 0,
            maxDiscount: 25,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'Farm pickup only',
            listingType: 'VEGETABLE',
            harvestDate: '2025-05-11T06:00:00Z'
        },
        {
            listingId: 4,
            name: 'Free-Range Eggs',
            basePrice: 699,
            currentPrice: 699,
            quantity: 40,
            description: 'Eggs from pasture-raised chickens.',
            category: 'Dairy',
            expiryDate: '2025-06-05T20:00:00Z',
            minDiscount: 0,
            maxDiscount: 10,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'Farm pickup or local delivery',
            listingType: 'DAIRY',
            harvestDate: '2025-05-13T06:00:00Z'
        }
    ]);

    // Restaurant compost listings
    const [restaurantCompost, setRestaurantCompost] = useState([
        {
            id: 1,
            type: 'Vegetable Scraps',
            amount: '15 kg/week',
            restaurant: 'Green Garden Bistro',
            restaurantId: 'a1e56f2e-8d7d-47a8-b5e8-f32e3d9377ee',
            description: 'Cucumber peels, lettuce trimmings, carrot tops, etc.',
            compostDetails: 'Organic, pesticide-free vegetable scraps from locally sourced produce',
            createdAt: '2025-04-01T14:30:00Z',
            myBid: null, // Will store the user's bid if they've placed one
            allBids: [
                {
                    farmerId: 'abc123',
                    farmerName: 'Green Acres Farm',
                    bidAmount: 15.0,
                    productDescription: 'Discount on all vegetable produce'
                }
            ]
        },
        {
            id: 2,
            type: 'Coffee Grounds',
            amount: '10 kg/week',
            restaurant: 'Morning Brew Cafe',
            restaurantId: 'b2e56f2e-8d7d-47a8-b5e8-f32e3d9377ee',
            description: 'Used coffee grounds, excellent for soil acidity',
            compostDetails: 'Organic coffee grounds from our specialty coffee shop',
            createdAt: '2025-04-05T09:15:00Z',
            myBid: {
                farmerId: 'ef31615e-cf85-4b73-8bd2-c666481b80a1',
                farmerName: 'Smith Family Farm',
                bidAmount: 10.0,
                productDescription: 'Discount on berry selection and herbs'
            },
            allBids: [
                {
                    farmerId: 'ef31615e-cf85-4b73-8bd2-c666481b80a1',
                    farmerName: 'Smith Family Farm',
                    bidAmount: 10.0,
                    productDescription: 'Discount on berry selection and herbs'
                }
            ]
        },
        {
            id: 3,
            type: 'Fruit Scraps',
            amount: '12 kg/week',
            restaurant: 'Smoothie Heaven',
            restaurantId: 'c3e56f2e-8d7d-47a8-b5e8-f32e3d9377ee',
            description: 'Fruit peels and pulp from juice bar',
            compostDetails: 'All-organic fruit waste from our daily smoothie operations',
            createdAt: '2025-04-10T16:45:00Z',
            myBid: null,
            allBids: []
        }
    ]);

    // Customer orders/deliveries
    const [deliveries, setDeliveries] = useState([
        {
            id: 1,
            customer: 'John Doe',
            items: [
                { name: 'Organic Vegetable Box', quantity: 1, price: 2499 },
                { name: 'Free-Range Eggs', quantity: 2, price: 699 }
            ],
            totalAmount: 3897,
            orderDate: '2025-05-10T14:30:00Z',
            deliveryDate: '2025-05-14T10:00:00Z',
            address: '123 Main St, Kingston, Jamaica',
            status: 'Processing', // Processing, Prepared, Out for Delivery, Delivered, Cancelled
            notes: 'Please leave at the front door'
        },
        {
            id: 2,
            customer: 'Jane Smith',
            items: [
                { name: 'Heirloom Tomatoes', quantity: 3, price: 1250 }
            ],
            totalAmount: 3750,
            orderDate: '2025-05-11T09:15:00Z',
            deliveryDate: '2025-05-15T14:00:00Z',
            address: '456 Park Ave, Kingston, Jamaica',
            status: 'Prepared',
            notes: 'Call when arriving'
        },
        {
            id: 3,
            customer: 'Robert Johnson',
            items: [
                { name: 'Fresh Herbs Bundle', quantity: 2, price: 899 },
                { name: 'Heirloom Tomatoes', quantity: 1, price: 1250 }
            ],
            totalAmount: 3048,
            orderDate: '2025-05-12T16:45:00Z',
            deliveryDate: '2025-05-16T11:30:00Z',
            address: '789 Ocean Blvd, Kingston, Jamaica',
            status: 'Out for Delivery',
            notes: ''
        },
        {
            id: 4,
            customer: 'Maria Garcia',
            items: [
                { name: 'Organic Vegetable Box', quantity: 1, price: 2499 }
            ],
            totalAmount: 2499,
            orderDate: '2025-05-09T11:20:00Z',
            deliveryDate: '2025-05-13T13:00:00Z',
            address: '321 Mountain View, Kingston, Jamaica',
            status: 'Delivered',
            notes: 'Delivery confirmed at 1:45 PM'
        }
    ]);

    // Fetch auth token on component mount
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            // Redirect to login if no token
            navigate('/login');
        }
    }, [navigate]);

    // CRUD Functions for Products
    const addProduct = async (item) => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('Authentication required');
            }

            // Format data for API
            const apiData = {
                name: item.name,
                basePrice: parseFloat(item.basePrice || 0),
                currentPrice: parseFloat(item.currentPrice || item.basePrice || 0),
                quantity: parseInt(item.quantity || 0),
                description: item.description,
                expiryDate: item.expiryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                minDiscount: parseInt(item.minDiscount || 0),
                maxDiscount: parseInt(item.maxDiscount || 0),
                dateCreated: new Date().toISOString(),
                isDynamicPricing: item.isDynamicPricing || false,
                isDelivery: item.isDelivery || true,
                pickupOptions: item.pickupOptions || 'Farm pickup only',
                listingType: item.listingType || 'VEGETABLE',
                harvestDate: item.harvestDate || new Date().toISOString()
            };

            const response = await fetch('http://localhost:8080/api/produce-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(apiData)
            });

            if (!response.ok) {
                throw new Error('Failed to create product listing');
            }

            const data = await response.json();

            // Add to local state with returned ID
            const newItem = {
                ...item,
                listingId: data.listingId
            };
            setFarmerProducts([...farmerProducts, newItem]);
            setSuccessMessage('Product added successfully!');

        } catch (err) {
            setError(`Error adding product: ${err.message}`);
            console.error('Error adding product:', err);
        } finally {
            setLoading(false);
            setShowModal(false);
            setEditingItem(null);

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    const updateProduct = (item) => {
        setFarmerProducts(farmerProducts.map(product =>
            product.listingId === item.listingId ? item : product
        ));
        setShowModal(false);
        setEditingItem(null);
        setSuccessMessage('Product updated successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setLoading(true);
            setError('');

            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('Authentication required');
                }
                const listingId = localStorage.getItem('produceListingId');
                if (!listingId) throw new Error('No listing ID available');

                const response = await fetch(
                    `http://localhost:8080/api/produce-listings/${listingId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to delete product listing');
                }

                setFarmerProducts(farmerProducts.filter(item => item.listingId !== id));
                setSuccessMessage('Product deleted successfully!');

            } catch (err) {
                setError(`Error deleting product: ${err.message}`);
                console.error('Error deleting product:', err);
            } finally {
                setLoading(false);

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        }
    };

    // Bid on compost
    const placeBid = (compostId, bidAmount, productDescription) => {
        // In a real app, this would be an API call
        setRestaurantCompost(restaurantCompost.map(item => {
            if (item.id === compostId) {
                const newBid = {
                    farmerId: farmer.id,
                    farmerName: farmer.name,
                    bidAmount: parseFloat(bidAmount),
                    productDescription
                };

                return {
                    ...item,
                    myBid: newBid,
                    allBids: [...(item.allBids || []).filter(bid => bid.farmerId !== farmer.id), newBid]
                };
            }
            return item;
        }));

        setShowModal(false);
        setEditingItem(null);
        setSuccessMessage('Bid placed successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    // Update delivery status
    const updateDeliveryStatus = (id, newStatus) => {
        setDeliveries(deliveries.map(delivery =>
            delivery.id === id ? {...delivery, status: newStatus} : delivery
        ));
        setSuccessMessage(`Delivery status updated to ${newStatus}!`);

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    // Open modal for adding/editing products or placing bids
    const openModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        setShowModal(true);
        resetForm(type, item);
    };

    // Form data state for modal
    const [formData, setFormData] = useState({
        // Product fields
        name: '',
        basePrice: '',
        currentPrice: '',
        quantity: '',
        description: '',
        listingType: 'VEGETABLE',
        isDelivery: true,
        pickupOptions: '',
        expiryDate: '',
        minDiscount: 0,
        maxDiscount: 20,
        harvestDate: '',

        // Bid fields
        bidAmount: '',
        productDescription: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (modalType === 'product') {
            if (editingItem) {
                updateProduct({ ...editingItem, ...formData });
            } else {
                addProduct(formData);
            }
        } else if (modalType === 'bid') {
            placeBid(editingItem.id, formData.bidAmount, formData.productDescription);
        }
    };

    // Reset form when modal opens
    const resetForm = (type, item) => {
        if (type === 'product') {
            if (item) {
                setFormData({
                    name: item.name,
                    basePrice: item.basePrice,
                    currentPrice: item.currentPrice,
                    quantity: item.quantity,
                    description: item.description,
                    listingType: item.listingType,
                    isDelivery: item.isDelivery,
                    pickupOptions: item.pickupOptions,
                    expiryDate: item.expiryDate ? item.expiryDate.split('T')[0] : '',
                    minDiscount: item.minDiscount,
                    maxDiscount: item.maxDiscount,
                    harvestDate: item.harvestDate ? item.harvestDate.split('T')[0] : ''
                });
            } else {
                setFormData({
                    name: '',
                    basePrice: '',
                    currentPrice: '',
                    quantity: '',
                    description: '',
                    listingType: 'VEGETABLE',
                    isDelivery: true,
                    pickupOptions: 'Farm pickup only',
                    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    minDiscount: 0,
                    maxDiscount: 20,
                    harvestDate: new Date().toISOString().split('T')[0]
                });
            }
        } else if (type === 'bid') {
            const existingBid = item.myBid;
            setFormData({
                bidAmount: existingBid ? existingBid.bidAmount : '',
                productDescription: existingBid ? existingBid.productDescription : ''
            });
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    // Format price to display as currency
    const formatPrice = (cents) => {
        return `$${(cents / 100).toFixed(2)}`;
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-white text-green-700">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-green-600">{farmer.farmName}</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-green-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${
                                activeTab === 'products'
                                    ? 'text-green-600 border-green-500'
                                    : 'text-green-400 border-transparent hover:text-green-600'
                            }`}
                            onClick={() => setActiveTab('products')}
                        >
                            Products
                        </button>
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${
                                activeTab === 'compost'
                                    ? 'text-green-600 border-green-500'
                                    : 'text-green-400 border-transparent hover:text-green-600'
                            }`}
                            onClick={() => setActiveTab('compost')}
                        >
                            Compost
                        </button>
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${
                                activeTab === 'deliveries'
                                    ? 'text-green-600 border-green-500'
                                    : 'text-green-400 border-transparent hover:text-green-600'
                            }`}
                            onClick={() => setActiveTab('deliveries')}
                        >
                            Deliveries
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
                        <span>{successMessage}</span>
                        <button onClick={() => setSuccessMessage('')} className="text-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-green-700">Your Products</h2>
                            <button
                                onClick={() => openModal('product')}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
                                disabled={loading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Product
                            </button>
                        </div>

                        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-green-200 mb-6">
                            <table className="min-w-full divide-y divide-green-200">
                                <thead className="bg-green-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Product</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Quantity</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Expiry</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-green-200">
                                {farmerProducts.map((product) => (
                                    <tr key={product.listingId} className="hover:bg-green-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-green-900">{product.name}</div>
                                                    <div className="text-sm text-green-500 truncate max-w-xs">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.listingType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {formatPrice(product.currentPrice)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {formatDate(product.expiryDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => openModal('product', product)}
                                                className="text-green-600 hover:text-green-800 mr-4"
                                                disabled={loading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.listingId)}
                                                className="text-red-600 hover:text-red-800"
                                                disabled={loading}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Compost Tab */}
                {activeTab === 'compost' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-green-700">Restaurant Compost Listings</h2>
                            <div className="flex">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search compost..."
                                        className="pl-3 pr-10 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {restaurantCompost.map((item) => (
                                <div key={item.id} className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-green-700">{item.type}</h3>
                                                <p className="text-green-600">{item.restaurant}</p>
                                            </div>
                                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{item.amount}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                        <div className="mt-1 text-xs text-gray-500">Posted: {formatDate(item.createdAt)}</div>

                                        {item.myBid ? (
                                            <div className="mt-4 p-2 bg-green-50 rounded-md border border-green-100">
                                                <p className="text-sm font-medium text-green-700">Your current bid:</p>
                                                <div className="flex justify-between mt-1">
                                                    <p className="text-sm text-gray-600">
                                                        {item.myBid.bidAmount}% discount on {item.myBid.productDescription}
                                                    </p>
                                                    <button
                                                        onClick={() => openModal('bid', item)}
                                                        className="text-xs text-green-600 hover:text-green-800"
                                                    >
                                                        Edit Bid
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="text-sm text-gray-700">
                                                    {item.allBids.length > 0 ? `${item.allBids.length} bid(s) so far` : 'No bids yet'}
                                                </div>
                                                <button
                                                    onClick={() => openModal('bid', item)}
                                                    className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600"
                                                >
                                                    Place Bid
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Deliveries Tab */}
                {activeTab === 'deliveries' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-green-700">Manage Deliveries</h2>
                            <div className="flex">
                                <select className="bg-white border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="all">All Statuses</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Prepared">Prepared</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm rounded-lg border border-green-200">
                            <table className="min-w-full divide-y divide-green-200">
                                <thead className="bg-green-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Order</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Customer</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Delivery Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-green-200">
                                {deliveries.map((delivery) => (
                                    <tr key={delivery.id} className="hover:bg-green-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-green-900">#{delivery.id}</div>
                                            <div className="text-xs text-gray-500">{formatDate(delivery.orderDate)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{delivery.customer}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-xs">{delivery.address}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {formatDate(delivery.deliveryDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {formatPrice(delivery.totalAmount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            delivery.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                delivery.status === 'Prepared' ? 'bg-blue-100 text-blue-800' :
                                    delivery.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' :
                                        delivery.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                        }`}>
                          {delivery.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {delivery.status !== 'Delivered' && delivery.status !== 'Cancelled' && (
                                                <div className="flex justify-end">
                                                    <select
                                                        className="mr-2 bg-white border border-green-300 rounded text-sm p-1"
                                                        value=""
                                                        onChange={(e) => {
                                                            if (e.target.value) {
                                                                updateDeliveryStatus(delivery.id, e.target.value);
                                                                e.target.value = "";
                                                            }
                                                        }}
                                                    >
                                                        <option value="">Update Status</option>
                                                        {delivery.status !== 'Processing' && <option value="Processing">Processing</option>}
                                                        {delivery.status !== 'Prepared' && <option value="Prepared">Prepared</option>}
                                                        {delivery.status !== 'Out for Delivery' && <option value="Out for Delivery">Out for Delivery</option>}
                                                        {delivery.status !== 'Delivered' && <option value="Delivered">Delivered</option>}
                                                        {delivery.status !== 'Cancelled' && <option value="Cancelled">Cancelled</option>}
                                                    </select>
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800"
                                                        onClick={() => alert(`View details for order #${delivery.id}`)}
                                                    >
                                                        Details
                                                    </button>
                                                </div>
                                            )}
                                            {(delivery.status === 'Delivered' || delivery.status === 'Cancelled') && (
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => alert(`View details for order #${delivery.id}`)}
                                                >
                                                    Details
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal for adding/editing products or placing bids */}
            {showModal && (
                <div className="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div
                            className="fixed inset-0 bg-gray-800"
                            style={{ opacity: 0.75 }}
                            onClick={() => setShowModal(false)}
                        ></div>

                        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
                            <form onSubmit={handleFormSubmit}>
                                <div className="px-6 py-5">
                                    <h3 className="text-lg font-medium text-gray-900" id="modal-title">
                                        {modalType === 'product'
                                            ? (editingItem ? 'Edit Product' : 'Add Product')
                                            : (editingItem.myBid ? 'Edit Bid' : 'Place Bid')}
                                    </h3>

                                    <div className="mt-4 space-y-4">
                                        {modalType === 'product' ? (
                                            <>
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price ($)</label>
                                                        <input
                                                            type="number"
                                                            name="basePrice"
                                                            id="basePrice"
                                                            value={formData.basePrice}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                            required
                                                            placeholder="Price in dollars"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">Current Price ($)</label>
                                                        <input
                                                            type="number"
                                                            name="currentPrice"
                                                            id="currentPrice"
                                                            value={formData.currentPrice}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                            required
                                                            placeholder="Price in dollars"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity Available</label>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        id="quantity"
                                                        min="0"
                                                        value={formData.quantity}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label htmlFor="listingType" className="block text-sm font-medium text-gray-700">Product Type</label>
                                                    <select
                                                        id="listingType"
                                                        name="listingType"
                                                        value={formData.listingType}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                    >
                                                        <option value="VEGETABLE">Vegetable</option>
                                                        <option value="FRUIT">Fruit</option>
                                                        <option value="HERB">Herb</option>
                                                        <option value="DAIRY">Dairy</option>
                                                        <option value="MEAT">Meat</option>
                                                        <option value="GRAIN">Grain</option>
                                                        <option value="OTHER">Other</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        rows={3}
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">Harvest Date</label>
                                                        <input
                                                            type="date"
                                                            name="harvestDate"
                                                            id="harvestDate"
                                                            value={formData.harvestDate}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                                        <input
                                                            type="date"
                                                            name="expiryDate"
                                                            id="expiryDate"
                                                            value={formData.expiryDate}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="minDiscount" className="block text-sm font-medium text-gray-700">Min Discount (%)</label>
                                                        <input
                                                            type="number"
                                                            name="minDiscount"
                                                            id="minDiscount"
                                                            min="0"
                                                            max="100"
                                                            value={formData.minDiscount}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700">Max Discount (%)</label>
                                                        <input
                                                            type="number"
                                                            name="maxDiscount"
                                                            id="maxDiscount"
                                                            min="0"
                                                            max="100"
                                                            value={formData.maxDiscount}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="pickupOptions" className="block text-sm font-medium text-gray-700">Pickup Options</label>
                                                    <input
                                                        type="text"
                                                        name="pickupOptions"
                                                        id="pickupOptions"
                                                        value={formData.pickupOptions}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        placeholder="e.g. Farm pickup or local delivery"
                                                    />
                                                </div>

                                                <div className="flex items-center">
                                                    <input
                                                        id="isDelivery"
                                                        name="isDelivery"
                                                        type="checkbox"
                                                        checked={formData.isDelivery}
                                                        onChange={handleInputChange}
                                                        className="h-4 w-4 border-gray-300 rounded"
                                                    />
                                                    <label htmlFor="isDelivery" className="ml-2 block text-sm text-gray-700">Delivery Available</label>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="mb-2">
                                                    <h4 className="font-medium text-green-700">{editingItem.restaurant}</h4>
                                                    <p className="text-sm text-gray-700">{editingItem.type} - {editingItem.amount}</p>
                                                    <p className="text-sm text-gray-600 mt-1">{editingItem.description}</p>
                                                </div>

                                                <div>
                                                    <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">Bid Amount (%)</label>
                                                    <input
                                                        type="number"
                                                        name="bidAmount"
                                                        id="bidAmount"
                                                        step="0.01"
                                                        min="0"
                                                        value={formData.bidAmount}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        required
                                                        placeholder="Enter percentage of discount"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">Enter the percentage of discount you are willing to offer on your products</p>
                                                </div>

                                                <div>
                                                    <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Products Offered</label>
                                                    <textarea
                                                        id="productDescription"
                                                        name="productDescription"
                                                        rows={3}
                                                        value={formData.productDescription}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        required
                                                        placeholder="Describe which products you'll discount"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">List which of your products will be discounted in exchange for this compost</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        onClick={() => setShowModal(false)}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 ${loading ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : (
                                            modalType === 'product'
                                                ? (editingItem ? 'Update' : 'Add')
                                                : (editingItem.myBid ? 'Update Bid' : 'Place Bid')
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmerDashboard;