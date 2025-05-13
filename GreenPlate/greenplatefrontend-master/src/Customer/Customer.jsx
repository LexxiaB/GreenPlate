import { useState } from 'react'
import ItemsGrid from '../components/itemGrids'
import { useNavigate } from 'react-router-dom'

function Customer() {
  const [activeTab, setActiveTab] = useState('restaurants')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  
  // Sample data for restaurants
  const restaurantOrders = [
    { id: 1, name: 'Veggie Delight', restaurant: 'Green Garden', price: 14.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Farm Bowl', restaurant: 'Harvest Table', price: 12.50, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Organic Salad', restaurant: 'Fresh & Raw', price: 9.99, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Plant Power Plate', restaurant: 'Green Garden', price: 16.99, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Quinoa Bowl', restaurant: 'Harvest Table', price: 13.50, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Super Greens', restaurant: 'Fresh & Raw', price: 10.99, image: 'https://via.placeholder.com/150' }
  ]
  
  // Sample data for farmers
  const farmerOrders = [
    { id: 1, name: 'Organic Vegetables Box', farmer: 'Smith Family Farm', price: 24.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Fresh Fruit Selection', farmer: 'Berry Good Farms', price: 19.95, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Weekly Greens', farmer: 'Green Acres', price: 15.00, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Seasonal Harvest Box', farmer: 'Smith Family Farm', price: 29.99, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Heirloom Tomato Pack', farmer: 'Berry Good Farms', price: 12.50, image: 'https://via.placeholder.com/150' }
  ]
  
  // Filter orders based on search query
  const filteredOrders = activeTab === 'restaurants' 
    ? restaurantOrders.filter(order => 
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : farmerOrders.filter(order => 
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.farmer.toLowerCase().includes(searchQuery.toLowerCase())
      )
  
  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.type === activeTab)
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id && cartItem.type === activeTab
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { 
        ...item, 
        quantity: 1,
        type: activeTab 
      }])
    }
  }
  
  // Calculate total cart items
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)
  
  // Go to checkout
  const goToCheckout = () => {
    // In a real app you would use context or state management to pass cart data
    navigate('/checkout', { state: { cart } })
  }
  
  return (
    <div className="min-h-screen bg-white text-green-700">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-600">Green Plate</h1>
            
            {/* Cart Button */}
            <button 
              onClick={goToCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              Cart ({cartItemsCount})
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Tabs */}
        <div className="mb-8">
          {/* Search Box */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-green-200">
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'restaurants' 
                  ? 'text-green-600 border-b-2 border-green-500' 
                  : 'text-green-400 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('restaurants')}
            >
              Restaurants
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'farmers' 
                  ? 'text-green-600 border-b-2 border-green-500' 
                  : 'text-green-400 hover:text-green-600'
              }`}
              onClick={() => setActiveTab('farmers')}
            >
              Farmers
            </button>
          </div>
        </div>
        
        {/* Custom rendering for grid items with add to cart functionality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((item) => (
              <div key={item.id} className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-green-700">{item.name}</h3>
                  <p className="text-green-600">
                    {activeTab === 'restaurants' ? item.restaurant : item.farmer}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-green-700">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-green-600">
              No items found. Try a different search term.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Customer