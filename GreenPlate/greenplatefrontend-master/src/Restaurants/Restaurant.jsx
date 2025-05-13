import { useState } from 'react'

function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState('menu')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  
  // Restaurant data
  const restaurant = {
    name: "Green Garden Bistro",
    offersCompost: true,
  }
  
  // Menu items
  const [menuItems, setMenuItems] = useState([
    { 
      id: 1, 
      name: 'Garden Fresh Salad', 
      price: 12.99, 
      description: 'Mixed greens, heirloom tomatoes, cucumbers, and house dressing.',
      category: 'Starters',
      isAvailable: true
    },
    { 
      id: 2, 
      name: 'Farm-to-Table Burger', 
      price: 16.50, 
      description: 'Local grass-fed beef, artisan cheese, greens, and special sauce on brioche.',
      category: 'Mains',
      isAvailable: true
    },
    { 
      id: 3, 
      name: 'Seasonal Vegetable Risotto', 
      price: 18.99, 
      description: 'Creamy arborio rice with local seasonal vegetables and herbs.',
      category: 'Mains',
      isAvailable: true
    },
    { 
      id: 4, 
      name: 'Berry Crumble', 
      price: 9.50, 
      description: 'Seasonal berries with oat crumble topping and vanilla ice cream.',
      category: 'Desserts',
      isAvailable: false
    }
  ])
  
  // Compost items
  const [compostItems, setCompostItems] = useState([
    { 
      id: 1,
      type: 'Vegetable Scraps',
      amount: '15 kg/week',
      description: 'Cucumber peels, lettuce trimmings, carrot tops, etc.',
      offeringDiscount: 15
    },
    { 
      id: 2,
      type: 'Fruit Scraps',
      amount: '10 kg/week',
      description: 'Apple cores, citrus peels, berry stems, etc.',
      offeringDiscount: 10
    },
    { 
      id: 3,
      type: 'Coffee Grounds',
      amount: '8 kg/week',
      description: 'Used coffee grounds, good for acid-loving plants.',
      offeringDiscount: 5
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
  
  // CRUD Functions for Menu Items
  const addMenuItem = (item) => {
    const newItem = {
      ...item,
      id: menuItems.length + 1
    }
    setMenuItems([...menuItems, newItem])
    setShowModal(false)
    setEditingItem(null)
  }
  
  const updateMenuItem = (item) => {
    setMenuItems(menuItems.map(menuItem => 
      menuItem.id === item.id ? item : menuItem
    ))
    setShowModal(false)
    setEditingItem(null)
  }
  
  const deleteMenuItem = (id) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id))
    }
  }
  
  // CRUD Functions for Compost Items
  const addCompostItem = (item) => {
    const newItem = {
      ...item,
      id: compostItems.length + 1
    }
    setCompostItems([...compostItems, newItem])
    setShowModal(false)
    setEditingItem(null)
  }
  
  const updateCompostItem = (item) => {
    setCompostItems(compostItems.map(compostItem => 
      compostItem.id === item.id ? item : compostItem
    ))
    setShowModal(false)
    setEditingItem(null)
  }
  
  const deleteCompostItem = (id) => {
    if (confirm('Are you sure you want to delete this compost item?')) {
      setCompostItems(compostItems.filter(item => item.id !== id))
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
    price: '',
    description: '',
    category: 'Starters',
    isAvailable: true,
    
    // Compost form fields
    type: '',
    amount: '',
    offeringDiscount: 10
  })
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
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
      setFormData(item)
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        category: 'Starters',
        isAvailable: true,
        
        // Compost form fields
        type: '',
        amount: '',
        offeringDiscount: 10
      })
    }
  }
  
  return (
    <div className="min-h-screen bg-white text-green-700">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-green-600">{restaurant.name}</h1>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
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
        {/* Menu Management Tab */}
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-green-700">Menu Items</h2>
              <button 
                onClick={() => openItemModal('menu')}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Menu Item
              </button>
            </div>
            
            <div className="overflow-hidden bg-white shadow-sm rounded-lg border border-green-200">
              <table className="min-w-full divide-y divide-green-200">
                <thead className="bg-green-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Item</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-700 uppercase tracking-wider">Available</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-green-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-200">
                  {menuItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-green-900">{item.name}</div>
                            <div className="text-sm text-green-500 truncate max-w-xs">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.price.toFixed(2)}</td>
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
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item.id)}
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
              {/* Product 1 */}
              <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src="https://via.placeholder.com/400x300" 
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
              
              {/* Product 2 */}
              <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src="https://via.placeholder.com/400x300" 
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
              
              {/* Product 3 */}
              <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src="https://via.placeholder.com/400x300" 
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
              
              {/* Product 4 */}
              <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src="https://via.placeholder.com/400x300" 
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
              
              {/* Product 5 */}
              <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src="https://via.placeholder.com/400x300" 
                    alt="Fresh Herbs" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-green-700">Fresh Herbs Bundle</h3>
                      <p className="text-green-600">Smith Family Farm</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Organic</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Bundle of fresh basil, cilantro, parsley, and mint.</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="font-bold text-green-700">$8.99</div>
                    <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Product 6 */}
              <div className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src="https://via.placeholder.com/400x300" 
                    alt="Strawberry Jam" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-green-700">Artisan Strawberry Jam</h3>
                      <p className="text-green-600">Berry Good Farms</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Small-Batch</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Small-batch strawberry jam made with organic berries, 8 oz.</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="font-bold text-green-700">$9.50</div>
                    <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center">
                <button className="p-2 mr-1 border border-green-300 rounded hover:bg-green-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="px-3 py-1 mx-1 border border-green-500 bg-green-500 text-white rounded">1</button>
                <button className="px-3 py-1 mx-1 border border-green-300 rounded hover:bg-green-50 text-green-700">2</button>
                <button className="px-3 py-1 mx-1 border border-green-300 rounded hover:bg-green-50 text-green-700">3</button>
                <button className="p-2 ml-1 border border-green-300 rounded hover:bg-green-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
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
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      id="price"
                      value={formData.price}
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
                      required
                    />
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {editingItem ? 'Update' : 'Add'}
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