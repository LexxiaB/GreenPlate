import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RestaurantDashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('menu')
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [editingItem, setEditingItem] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    // Restaurant data
    const [restaurant, setRestaurant] = useState({
        name: "Green Garden Bistro",
        offersCompost: true,
        id: "a1e56f2e-8d7d-47a8-b5e8-f32e3d9377ee", // Using the ID from the API example
        isVerified: true, // Flag for restaurants that have signed the food safety waiver
        verificationDate: "2025-01-15T10:30:00Z"
    })

    // Menu items
    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            name: 'Garden Fresh Salad',
            basePrice: 1299,
            currentPrice: 1299,
            quantity: 15,
            description: 'Mixed greens, heirloom tomatoes, cucumbers, and house dressing.',
            category: 'Starters',
            isAvailable: true,
            expiryDate: '2025-06-01T20:00:00Z',
            minDiscount: 5,
            maxDiscount: 20,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'In-store pickup only',
            listingType: 'MEAL',
            dietaryTag: 'VEGETARIAN',
            isOvernightFood: false,
            nutritionalFacts: {
                calories: 320,
                fat: 12,
                protein: 8,
                carbs: 25,
                fiber: 6,
                lactoseFree: true,
                glutenFree: true,
                vegetarian: true,
                vegan: true,
                nutFree: true,
                shellfishFree: true,
                halal: true,
                kosher: true,
                lowCholesterol: true,
                lowSugar: true
            }
        },
        {
            id: 2,
            name: 'Farm-to-Table Burger',
            basePrice: 1650,
            currentPrice: 1450,
            quantity: 10,
            description: 'Local grass-fed beef, artisan cheese, greens, and special sauce on brioche.',
            category: 'Mains',
            isAvailable: true,
            expiryDate: '2025-06-01T20:00:00Z',
            minDiscount: 0,
            maxDiscount: 15,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'In-store pickup or local delivery',
            listingType: 'MEAL',
            dietaryTag: 'REGULAR',
            isOvernightFood: false,
            nutritionalFacts: {
                calories: 780,
                fat: 42,
                protein: 38,
                carbs: 48,
                fiber: 3,
                lactoseFree: false,
                glutenFree: false,
                vegetarian: false,
                vegan: false,
                nutFree: true,
                shellfishFree: true,
                halal: false,
                kosher: false,
                lowCholesterol: false,
                lowSugar: true
            }
        },
        {
            id: 3,
            name: 'Seasonal Vegetable Risotto',
            basePrice: 1899,
            currentPrice: 1699,
            quantity: 8,
            description: 'Creamy arborio rice with local seasonal vegetables and herbs.',
            category: 'Mains',
            isAvailable: true,
            expiryDate: '2025-06-01T20:00:00Z',
            minDiscount: 5,
            maxDiscount: 25,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'In-store pickup or local delivery',
            listingType: 'MEAL',
            dietaryTag: 'VEGETARIAN',
            isOvernightFood: false,
            nutritionalFacts: {
                calories: 520,
                fat: 18,
                protein: 12,
                carbs: 72,
                fiber: 5,
                lactoseFree: false,
                glutenFree: true,
                vegetarian: true,
                vegan: false,
                nutFree: true,
                shellfishFree: true,
                halal: true,
                kosher: true,
                lowCholesterol: true,
                lowSugar: true
            }
        },
        {
            id: 4,
            name: 'Jerk Chicken Tacos',
            basePrice: 800,
            currentPrice: 650,
            quantity: 20,
            description: 'Spicy Jamaican jerk chicken folded in soft tortillas, served with mango salsa.',
            category: 'Mains',
            isAvailable: false,
            expiryDate: '2025-06-01T20:00:00Z',
            minDiscount: 5,
            maxDiscount: 30,
            isDynamicPricing: false,
            isDelivery: true,
            pickupOptions: 'In-store pickup or local delivery',
            listingType: 'MEAL',
            dietaryTag: 'SPICY',
            isOvernightFood: false,
            nutritionalFacts: {
                calories: 520,
                fat: 18,
                protein: 32,
                carbs: 48,
                fiber: 4,
                lactoseFree: true,
                glutenFree: false,
                vegetarian: false,
                vegan: false,
                nutFree: true,
                shellfishFree: true,
                halal: false,
                kosher: false,
                lowCholesterol: false,
                lowSugar: false
            }
        }
    ])

    // Compost items
    const [compostItems, setCompostItems] = useState([
        {
            id: 1,
            type: 'Vegetable Scraps',
            amount: '15 kg/week',
            description: 'Cucumber peels, lettuce trimmings, carrot tops, etc.',
            compostDetails: 'Organic, pesticide-free vegetable scraps from locally sourced produce',
            createdAt: '2025-04-01T14:30:00Z',
            offeringDiscount: 15,
            farmerBids: [
                {
                    farmerId: 1,
                    farmerName: 'Smith Family Farm',
                    bidAmount: 15.0,
                    productDescription: 'Discount on organic vegetables and herb bundles'
                },
                {
                    farmerId: 3,
                    farmerName: 'Berry Good Farms',
                    bidAmount: 18.0,
                    productDescription: 'Discount on all berry varieties and organic jams'
                }
            ]
        },
        {
            id: 2,
            type: 'Fruit Scraps',
            amount: '10 kg/week',
            description: 'Apple cores, citrus peels, berry stems, etc.',
            compostDetails: 'Mixed fruit waste suitable for composting, minimal citrus content',
            createdAt: '2025-04-05T09:15:00Z',
            offeringDiscount: 10,
            farmerBids: [
                {
                    farmerId: 1,
                    farmerName: 'Smith Family Farm',
                    bidAmount: 10.0,
                    productDescription: 'Discount on seasonal fruit baskets and apple varieties'
                },
                {
                    farmerId: 3,
                    farmerName: 'Berry Good Farms',
                    bidAmount: 12.5,
                    productDescription: 'Discount on premium berry samplers and fruit preserves'
                }
            ]
        },
        {
            id: 3,
            type: 'Coffee Grounds',
            amount: '8 kg/week',
            description: 'Used coffee grounds, good for acid-loving plants.',
            compostDetails: 'Organic coffee grounds from our in-house brewing operation',
            createdAt: '2025-04-10T16:45:00Z',
            offeringDiscount: 5,
            farmerBids: [
                {
                    farmerId: 2,
                    farmerName: 'Green Acres',
                    bidAmount: 5.0,
                    productDescription: 'Discount on honey products and specialty jams'
                }
            ]
        }
    ])

    // Farmer partners
    const [farmerPartners, setFarmerPartners] = useState([
        {
            id: 1,
            name: 'Smith Family Farm',
            collectsCompostTypes: ['Vegetable Scraps', 'Fruit Scraps'],
            discountOffered: 15,
            products: ['Organic Vegetables', 'Fresh Herbs']
        },
        {
            id: 2,
            name: 'Green Acres',
            collectsCompostTypes: ['Coffee Grounds'],
            discountOffered: 10,
            products: ['Seasonal Fruits', 'Honey']
        },
        {
            id: 3,
            name: 'Berry Good Farms',
            collectsCompostTypes: ['Vegetable Scraps', 'Fruit Scraps', 'Coffee Grounds'],
            discountOffered: 20,
            products: ['Berries', 'Jams', 'Fresh Eggs']
        }
    ])

    // Fetch auth token on component mount
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            // Redirect to login if no token
            navigate('/login')
        }
    }, [navigate])

    // CRUD Functions for Menu Items
    const addMenuItem = async (item) => {
        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('accessToken')
            if (!token) {
                throw new Error('Authentication required')
            }

            // Format data for API
            const apiData = {
                restaurantId: restaurant.id,
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
                isDelivery: item.isDelivery || false,
                pickupOptions: item.pickupOptions || 'In-store pickup only',
                listingType: item.listingType || 'MEAL',
                nutritionalFacts: item.nutritionalFacts || {
                    calories: 0,
                    fat: 0,
                    protein: 0,
                    carbs: 0,
                    fiber: 0,
                    lactoseFree: false,
                    glutenFree: false,
                    vegetarian: false,
                    vegan: false,
                    nutFree: false,
                    shellfishFree: false,
                    halal: false,
                    kosher: false,
                    lowCholesterol: false,
                    lowSugar: false
                },
                dietaryTag: item.dietaryTag || 'REGULAR',
                isOvernightFood: item.isOvernightFood || false
            }

            const response = await fetch('http://localhost:8080/api/restaurant-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(apiData)
            })

            if (!response.ok) {
                throw new Error('Failed to create menu item')
            }

            const data = await response.json()

            // Add to local state with returned ID
            const newItem = {
                ...item,
                id: data.id || menuItems.length + 1
            }
            setMenuItems([...menuItems, newItem])
            setSuccessMessage('Menu item added successfully!')

        } catch (err) {
            setError(`Error adding menu item: ${err.message}`)
            console.error('Error adding menu item:', err)
        } finally {
            setLoading(false)
            setShowModal(false)
            setEditingItem(null)

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)
        }
    }

    const updateMenuItem = (item) => {
        setMenuItems(menuItems.map(menuItem =>
            menuItem.id === item.id ? item : menuItem
        ))
        setShowModal(false)
        setEditingItem(null)
        setSuccessMessage('Menu item updated successfully!')

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('')
        }, 3000)
    }

    const deleteMenuItem = (id) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            setMenuItems(menuItems.filter(item => item.id !== id))
            setSuccessMessage('Menu item deleted successfully!')

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)
        }
    }

    // CRUD Functions for Compost Items
    const addCompostItem = (item) => {
        const newItem = {
            ...item,
            id: compostItems.length + 1,
            createdAt: new Date().toISOString(),
            farmerBids: [] // Initialize with no bids
        }
        setCompostItems([...compostItems, newItem])
        setShowModal(false)
        setEditingItem(null)
        setSuccessMessage('Compost item added successfully!')

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('')
        }, 3000)
    }

    const updateCompostItem = (item) => {
        setCompostItems(compostItems.map(compostItem =>
            compostItem.id === item.id ? item : compostItem
        ))
        setShowModal(false)
        setEditingItem(null)
        setSuccessMessage('Compost item updated successfully!')

        // Clear success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('')
        }, 3000)
    }

    const deleteCompostItem = (id) => {
        if (window.confirm('Are you sure you want to delete this compost item?')) {
            setCompostItems(compostItems.filter(item => item.id !== id))
            setSuccessMessage('Compost item deleted successfully!')

            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('')
            }, 3000)
        }
    }

    // Open modal for adding/editing items
    const openItemModal = (type, item = null) => {
        setModalType(type)
        setEditingItem(item)
        setShowModal(true)
        resetForm(item)
    }

    // Form data state for modal
    const [formData, setFormData] = useState({
        name: '',
        basePrice: '',
        currentPrice: '',
        quantity: '',
        description: '',
        category: 'Starters',
        isAvailable: true,
        expiryDate: '',
        minDiscount: 0,
        maxDiscount: 0,
        isDynamicPricing: false,
        isDelivery: true,
        pickupOptions: 'In-store pickup only',
        listingType: 'MEAL',
        dietaryTag: 'REGULAR',
        isOvernightFood: false,

        // Nutritional facts
        nutritionalFacts: {
            calories: 0,
            fat: 0,
            protein: 0,
            carbs: 0,
            fiber: 0,
            lactoseFree: false,
            glutenFree: false,
            vegetarian: false,
            vegan: false,
            nutFree: false,
            shellfishFree: false,
            halal: false,
            kosher: false,
            lowCholesterol: false,
            lowSugar: false
        },

        // Compost form fields
        type: '',
        amount: '',
        compostDetails: '',
        offeringDiscount: 0
    })

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target

        if (name.includes('nutritionalFacts.')) {
            // Handle nutritional facts fields
            const factName = name.split('.')[1]
            setFormData({
                ...formData,
                nutritionalFacts: {
                    ...formData.nutritionalFacts,
                    [factName]: type === 'checkbox' ? checked : value
                }
            })
        } else {
            // Handle regular fields
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            })
        }
    }

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (modalType === 'menu') {
            if (editingItem) {
                updateMenuItem({ ...editingItem, ...formData })
            } else {
                addMenuItem(formData)
            }
        } else if (modalType === 'compost') {
            if (editingItem) {
                updateCompostItem({ ...editingItem, ...formData })
            } else {
                addCompostItem(formData)
            }
        }
    }

    // Reset form when modal opens
    const resetForm = (item) => {
        if (item) {
            setFormData({
                ...item,
                nutritionalFacts: item.nutritionalFacts || {
                    calories: 0,
                    fat: 0,
                    protein: 0,
                    carbs: 0,
                    fiber: 0,
                    lactoseFree: false,
                    glutenFree: false,
                    vegetarian: false,
                    vegan: false,
                    nutFree: false,
                    shellfishFree: false,
                    halal: false,
                    kosher: false,
                    lowCholesterol: false,
                    lowSugar: false
                }
            })
        } else {
            setFormData({
                name: '',
                basePrice: '',
                currentPrice: '',
                quantity: '',
                description: '',
                category: 'Starters',
                isAvailable: true,
                expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                minDiscount: 0,
                maxDiscount: 0,
                isDynamicPricing: false,
                isDelivery: true,
                pickupOptions: 'In-store pickup only',
                listingType: 'MEAL',
                dietaryTag: 'REGULAR',
                isOvernightFood: false,

                // Nutritional facts
                nutritionalFacts: {
                    calories: 0,
                    fat: 0,
                    protein: 0,
                    carbs: 0,
                    fiber: 0,
                    lactoseFree: false,
                    glutenFree: false,
                    vegetarian: false,
                    vegan: false,
                    nutFree: false,
                    shellfishFree: false,
                    halal: false,
                    kosher: false,
                    lowCholesterol: false,
                    lowSugar: false
                },

                // Compost form fields
                type: '',
                amount: '',
                compostDetails: '',
                offeringDiscount: 0
            })
        }
    }

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-white text-green-700">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-green-600">{restaurant.name}</h1>
                        {restaurant.isVerified && (
                            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
                        )}
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
                                activeTab === 'menu'
                                    ? 'text-green-600 border-green-500'
                                    : 'text-green-400 border-transparent hover:text-green-600'
                            }`}
                            onClick={() => setActiveTab('menu')}
                        >
                            Menu Management
                        </button>
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${
                                activeTab === 'compost'
                                    ? 'text-green-600 border-green-500'
                                    : 'text-green-400 border-transparent hover:text-green-600'
                            }`}
                            onClick={() => setActiveTab('compost')}
                        >
                            Compost Management
                        </button>
                        <button
                            className={`py-4 px-6 font-medium border-b-2 ${
                                activeTab === 'farmers'
                                    ? 'text-green-600 border-green-500'
                                    : 'text-green-400 border-transparent hover:text-green-600'
                            }`}
                            onClick={() => setActiveTab('farmers')}
                        >
                            Farmer Partners
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

                {/* Menu Management Tab */}
                {activeTab === 'menu' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-green-700">Menu Items</h2>
                            <button
                                onClick={() => openItemModal('menu')}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
                                disabled={loading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Menu Item
                            </button>
                        </div>

                        <div className="overflow-x-auto bg-white shadow-sm rounded-lg border border-green-200">
                            <table className="min-w-full divide-y divide-green-200">
                                <thead className="bg-green-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Item</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Qty</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Dietary</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Available</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-green-200">
                                {menuItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-green-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-green-900">{item.name}</div>
                                                    <div className="text-sm text-green-500 truncate max-w-xs">{item.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            ${(item.currentPrice / 100).toFixed(2)}
                                            {item.currentPrice !== item.basePrice && (
                                                <span className="text-xs ml-1 text-gray-500 line-through">${(item.basePrice / 100).toFixed(2)}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div className="flex flex-wrap gap-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                              item.dietaryTag === 'VEGETARIAN' ? 'bg-green-100 text-green-800' :
                                  item.dietaryTag === 'VEGAN' ? 'bg-green-100 text-green-800' :
                                      item.dietaryTag === 'SPICY' ? 'bg-red-100 text-red-800' :
                                          'bg-gray-100 text-gray-800'
                          }`}>
                            {item.dietaryTag}
                          </span>
                                                {item.isOvernightFood && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                              Overnight
                            </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            item.isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => openItemModal('menu', item)}
                                                className="text-green-600 hover:text-green-800 mr-4"
                                                disabled={loading}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteMenuItem(item.id)}
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

                {/* Compost Management Tab */}
                {activeTab === 'compost' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-green-700">Compost Offerings</h2>
                            <button
                                onClick={() => openItemModal('compost')}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
                                disabled={loading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Add Compost Type
                            </button>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm rounded-lg border border-green-200 mb-8">
                            <table className="min-w-full divide-y divide-green-200">
                                <thead className="bg-green-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Description</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Discount Offered</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-green-200">
                                {compostItems.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">{item.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.amount}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{item.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.offeringDiscount}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => openItemModal('compost', item)}
                                                className="text-green-600 hover:text-green-800 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteCompostItem(item.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                            <h3 className="font-medium text-green-700 mb-4">Partnered Farmers That Collect Compost</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {farmerPartners.map(farmer => (
                                    <div key={farmer.id} className="border border-green-200 rounded-lg p-4 bg-white">
                                        <h4 className="font-medium text-green-700">{farmer.name}</h4>
                                        <p className="text-sm text-green-600 mt-1">Discount: Up to {farmer.discountOffered}% on their products</p>
                                        <div className="mt-2">
                                            <p className="text-xs font-medium text-gray-500 uppercase">Collects:</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {farmer.collectsCompostTypes.map((type, index) => (
                                                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {type}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-xs font-medium text-gray-500 uppercase">Products:</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {farmer.products.map((product, index) => (
                                                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {product}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Farmer Products Tab */}
                {activeTab === 'farmers' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-green-700">Farmer Products</h2>
                            <div className="flex items-center">
                                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Cart (3)
                                </button>
                            </div>
                        </div>

                        {/* Search and Filters */}
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Search farmer products..."
                                        className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <select className="w-full md:w-auto p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                                        <option>All Farmers</option>
                                        <option>Smith Family Farm</option>
                                        <option>Green Acres</option>
                                        <option>Berry Good Farms</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="w-full md:w-auto p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                                        <option>All Categories</option>
                                        <option>Vegetables</option>
                                        <option>Fruits</option>
                                        <option>Dairy</option>
                                        <option>Preserves</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Product cards */}
                            <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-200">
                                    <img
                                        src="/api/placeholder/400/300"
                                        alt="Organic Vegetable Box"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-green-700">Organic Vegetable Box</h3>
                                            <p className="text-green-600">Smith Family Farm</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Organic</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">Seasonal assortment of fresh vegetables, locally grown.</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="font-bold text-green-700">$24.99</div>
                                        <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-200">
                                    <img
                                        src="/api/placeholder/400/300"
                                        alt="Mixed Berry Box"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-green-700">Mixed Berry Box</h3>
                                            <p className="text-green-600">Berry Good Farms</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Seasonal</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">Strawberries, blueberries, and blackberries freshly picked.</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="font-bold text-green-700">$15.99</div>
                                        <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-200">
                                    <img
                                        src="/api/placeholder/400/300"
                                        alt="Fresh Eggs"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-green-700">Farm Fresh Eggs</h3>
                                            <p className="text-green-600">Berry Good Farms</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Free-Range</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">Eggs from free-range, pasture-raised chickens. 1 dozen.</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="font-bold text-green-700">$6.99</div>
                                        <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gray-200">
                                    <img
                                        src="/api/placeholder/400/300"
                                        alt="Raw Honey"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-green-700">Raw Wildflower Honey</h3>
                                            <p className="text-green-600">Green Acres</p>
                                        </div>
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Unfiltered</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600">16 oz jar of raw, unfiltered local wildflower honey.</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="font-bold text-green-700">$12.00</div>
                                        <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal for adding/editing items */}
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
                                        {modalType === 'menu' ?
                                            (editingItem ? 'Edit Menu Item' : 'Add Menu Item') :
                                            (editingItem ? 'Edit Compost Item' : 'Add Compost Item')
                                        }
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        {modalType === 'menu' ? (
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
                                                        <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">Base Price (¢)</label>
                                                        <input
                                                            type="number"
                                                            name="basePrice"
                                                            id="basePrice"
                                                            value={formData.basePrice}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                            required
                                                            placeholder="Price in cents"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">Current Price (¢)</label>
                                                        <input
                                                            type="number"
                                                            name="currentPrice"
                                                            id="currentPrice"
                                                            value={formData.currentPrice}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                            required
                                                            placeholder="Price in cents"
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
                                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                    >
                                                        <option value="Starters">Starters</option>
                                                        <option value="Mains">Mains</option>
                                                        <option value="Desserts">Desserts</option>
                                                        <option value="Drinks">Drinks</option>
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
                                                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                                        <input
                                                            type="date"
                                                            name="expiryDate"
                                                            id="expiryDate"
                                                            value={formData.expiryDate ? formData.expiryDate.split('T')[0] : ''}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="dietaryTag" className="block text-sm font-medium text-gray-700">Dietary Tag</label>
                                                        <select
                                                            id="dietaryTag"
                                                            name="dietaryTag"
                                                            value={formData.dietaryTag}
                                                            onChange={handleInputChange}
                                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        >
                                                            <option value="REGULAR">Regular</option>
                                                            <option value="VEGETARIAN">Vegetarian</option>
                                                            <option value="VEGAN">Vegan</option>
                                                            <option value="GLUTEN_FREE">Gluten Free</option>
                                                            <option value="KETO">Keto</option>
                                                            <option value="LOW_CARB">Low Carb</option>
                                                            <option value="SPICY">Spicy</option>
                                                        </select>
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
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="isAvailable"
                                                            name="isAvailable"
                                                            type="checkbox"
                                                            checked={formData.isAvailable}
                                                            onChange={handleInputChange}
                                                            className="h-4 w-4 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-700">Available on Menu</label>
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
                                                    <div className="flex items-center mt-2">
                                                        <input
                                                            id="isOvernightFood"
                                                            name="isOvernightFood"
                                                            type="checkbox"
                                                            checked={formData.isOvernightFood}
                                                            onChange={handleInputChange}
                                                            className="h-4 w-4 border-gray-300 rounded"
                                                        />
                                                        <label htmlFor="isOvernightFood" className="ml-2 block text-sm text-gray-700">Overnight Food</label>
                                                    </div>
                                                </div>

                                                {/* Nutritional Facts Accordion */}
                                                <div className="border border-gray-200 rounded-md">
                                                    <details>
                                                        <summary className="p-2 cursor-pointer font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-t-md">
                                                            Nutritional Facts
                                                        </summary>
                                                        <div className="p-3 space-y-3">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label htmlFor="nutritionalFacts.calories" className="block text-sm font-medium text-gray-700">Calories</label>
                                                                    <input
                                                                        type="number"
                                                                        name="nutritionalFacts.calories"
                                                                        id="nutritionalFacts.calories"
                                                                        min="0"
                                                                        value={formData.nutritionalFacts.calories}
                                                                        onChange={handleInputChange}
                                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="nutritionalFacts.protein" className="block text-sm font-medium text-gray-700">Protein (g)</label>
                                                                    <input
                                                                        type="number"
                                                                        name="nutritionalFacts.protein"
                                                                        id="nutritionalFacts.protein"
                                                                        min="0"
                                                                        value={formData.nutritionalFacts.protein}
                                                                        onChange={handleInputChange}
                                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <div>
                                                                    <label htmlFor="nutritionalFacts.fat" className="block text-sm font-medium text-gray-700">Fat (g)</label>
                                                                    <input
                                                                        type="number"
                                                                        name="nutritionalFacts.fat"
                                                                        id="nutritionalFacts.fat"
                                                                        min="0"
                                                                        value={formData.nutritionalFacts.fat}
                                                                        onChange={handleInputChange}
                                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="nutritionalFacts.carbs" className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                                                                    <input
                                                                        type="number"
                                                                        name="nutritionalFacts.carbs"
                                                                        id="nutritionalFacts.carbs"
                                                                        min="0"
                                                                        value={formData.nutritionalFacts.carbs}
                                                                        onChange={handleInputChange}
                                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="nutritionalFacts.fiber" className="block text-sm font-medium text-gray-700">Fiber (g)</label>
                                                                    <input
                                                                        type="number"
                                                                        name="nutritionalFacts.fiber"
                                                                        id="nutritionalFacts.fiber"
                                                                        min="0"
                                                                        value={formData.nutritionalFacts.fiber}
                                                                        onChange={handleInputChange}
                                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            id="nutritionalFacts.lactoseFree"
                                                                            name="nutritionalFacts.lactoseFree"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.lactoseFree}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.lactoseFree" className="ml-2 block text-sm text-gray-700">Lactose Free</label>
                                                                    </div>
                                                                    <div className="flex items-center mt-2">
                                                                        <input
                                                                            id="nutritionalFacts.glutenFree"
                                                                            name="nutritionalFacts.glutenFree"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.glutenFree}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.glutenFree" className="ml-2 block text-sm text-gray-700">Gluten Free</label>
                                                                    </div>
                                                                    <div className="flex items-center mt-2">
                                                                        <input
                                                                            id="nutritionalFacts.vegetarian"
                                                                            name="nutritionalFacts.vegetarian"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.vegetarian}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.vegetarian" className="ml-2 block text-sm text-gray-700">Vegetarian</label>
                                                                    </div>
                                                                    <div className="flex items-center mt-2">
                                                                        <input
                                                                            id="nutritionalFacts.vegan"
                                                                            name="nutritionalFacts.vegan"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.vegan}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.vegan" className="ml-2 block text-sm text-gray-700">Vegan</label>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center">
                                                                        <input
                                                                            id="nutritionalFacts.nutFree"
                                                                            name="nutritionalFacts.nutFree"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.nutFree}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.nutFree" className="ml-2 block text-sm text-gray-700">Nut Free</label>
                                                                    </div>
                                                                    <div className="flex items-center mt-2">
                                                                        <input
                                                                            id="nutritionalFacts.shellfishFree"
                                                                            name="nutritionalFacts.shellfishFree"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.shellfishFree}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.shellfishFree" className="ml-2 block text-sm text-gray-700">Shellfish Free</label>
                                                                    </div>
                                                                    <div className="flex items-center mt-2">
                                                                        <input
                                                                            id="nutritionalFacts.halal"
                                                                            name="nutritionalFacts.halal"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.halal}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.halal" className="ml-2 block text-sm text-gray-700">Halal</label>
                                                                    </div>
                                                                    <div className="flex items-center mt-2">
                                                                        <input
                                                                            id="nutritionalFacts.kosher"
                                                                            name="nutritionalFacts.kosher"
                                                                            type="checkbox"
                                                                            checked={formData.nutritionalFacts.kosher}
                                                                            onChange={handleInputChange}
                                                                            className="h-4 w-4 border-gray-300 rounded"
                                                                        />
                                                                        <label htmlFor="nutritionalFacts.kosher" className="ml-2 block text-sm text-gray-700">Kosher</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </details>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Compost Type</label>
                                                    <input
                                                        type="text"
                                                        name="type"
                                                        id="type"
                                                        value={formData.type}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                                    <input
                                                        type="text"
                                                        name="amount"
                                                        id="amount"
                                                        value={formData.amount}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                        required
                                                        placeholder="e.g. 10 kg/week"
                                                    />
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
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="compostDetails" className="block text-sm font-medium text-gray-700">Additional Details</label>
                                                    <textarea
                                                        id="compostDetails"
                                                        name="compostDetails"
                                                        rows={3}
                                                        value={formData.compostDetails}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="offeringDiscount" className="block text-sm font-medium text-gray-700">Discount Offered (%)</label>
                                                    <input
                                                        type="number"
                                                        name="offeringDiscount"
                                                        id="offeringDiscount"
                                                        min="0"
                                                        max="100"
                                                        value={formData.offeringDiscount}
                                                        onChange={handleInputChange}
                                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RestaurantDashboard