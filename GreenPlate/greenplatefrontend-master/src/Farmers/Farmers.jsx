import { useState } from 'react'

function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState('products')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  
  // Farmer name
  const farmerName = "Smith Family Farm"
  
  // Farmer products
  const [farmerProducts, setFarmerProducts] = useState([
    { 
      id: 1, 
      name: 'Organic Vegetable Box', 
      price: 24.99, 
      description: 'Seasonal assortment of fresh vegetables.',
      category: 'Vegetables'
    },
    { 
      id: 2, 
      name: 'Fresh Herbs Bundle', 
      price: 8.99, 
      description: 'Bundle of fresh herbs.',
      category: 'Herbs'
    },
    { 
      id: 3, 
      name: 'Heirloom Tomatoes', 
      price: 12.50, 
      description: 'Mixed variety of heirloom tomatoes.',
      category: 'Vegetables'
    },
    { 
      id: 4, 
      name: 'Free-Range Eggs', 
      price: 6.99, 
      description: 'Eggs from pasture-raised chickens.',
      category: 'Dairy'
    }
  ])
  
  // Restaurant compost listings that farmers can trade for
  const restaurantCompost = [
    { 
      id: 1,
      name: 'Vegetable Scraps',
      restaurant: 'Green Garden Bistro',
      description: 'Daily vegetable peelings and trimmings',
      amount: '15 kg/week',
      discount: 15
    },
    { 
      id: 2,
      name: 'Coffee Grounds',
      restaurant: 'Morning Brew Cafe',
      description: 'Used coffee grounds, excellent for soil acidity',
      amount: '10 kg/week',
      discount: 10
    },
    { 
      id: 3,
      name: 'Fruit Scraps',
      restaurant: 'Smoothie Heaven',
      description: 'Fruit peels and pulp from juice bar',
      amount: '12 kg/week',
      discount: 12
    },
    { 
      id: 4,
      name: 'Mixed Food Waste',
      restaurant: 'Farm Table Restaurant',
      description: 'General kitchen scraps and plate waste',
      amount: '20 kg/week',
      discount: 20
    },
    { 
      id: 5,
      name: 'Egg Shells',
      restaurant: 'Breakfast Club',
      description: 'Crushed egg shells, great for calcium',
      amount: '5 kg/week',
      discount: 8
    },
    { 
      id: 6,
      name: 'Bread Scraps',
      restaurant: 'Artisan Bakery',
      description: 'Day-old bread and baking leftovers',
      amount: '8 kg/week',
      discount: 10
    }
  ]
  
  // CRUD Functions for Products
  const addProduct = (item) => {
    const newItem = {
      ...item,
      id: farmerProducts.length + 1
    }
    setFarmerProducts([...farmerProducts, newItem])
    setShowModal(false)
    setEditingItem(null)
  }
  
  const updateProduct = (item) => {
    setFarmerProducts(farmerProducts.map(product => 
      product.id === item.id ? item : product
    ))
    setShowModal(false)
    setEditingItem(null)
  }
  
  const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setFarmerProducts(farmerProducts.filter(item => item.id !== id))
    }
  }
  
  // Open modal for adding/editing products
  const openProductModal = (item = null) => {
    setEditingItem(item)
    setShowModal(true)
  }
  
  // Form data state for modal
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Vegetables'
  })
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault()
    
    if (editingItem) {
      updateProduct({ ...editingItem, ...formData })
    } else {
      addProduct(formData)
    }
  }
  
  // Trade function for compost
  const handleTrade = (item) => {
    alert(`Trading with ${item.restaurant} for ${item.name}. You'll receive a ${item.discount}% discount on your products.`)
  }
  
  return (
    <div className="min-h-screen bg-white text-green-700">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-green-600">{farmerName}</h1>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex">
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
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-green-700">Your Products</h2>
              <button 
                onClick={() => openProductModal()}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Add Product
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerProducts.map((product) => (
                <div key={product.id} className="border border-green-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-green-700">{product.name}</h3>
                        <p className="text-green-600">{product.category}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-bold text-green-700">${product.price.toFixed(2)}</div>
                      <div>
                        <button 
                          onClick={() => openProductModal(product)}
                          className="text-green-600 hover:text-green-800 mr-2"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Compost Tab - Looks like a product browsing page */}
        {activeTab === 'compost' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-green-700">Available Compost from Restaurants</h2>
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
                        <h3 className="text-lg font-medium text-green-700">{item.name}</h3>
                        <p className="text-green-600">{item.restaurant}</p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">{item.amount}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-bold text-green-700">{item.discount}% discount</div>
                      <button 
                        onClick={() => handleTrade(item)}
                        className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600"
                      >
                        Trade
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* Modal for adding/editing products */}
      {showModal && (
  <div className="fixed inset-0 overflow-y-auto z-50">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
      <div 
        className="fixed inset-0" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        onClick={() => setShowModal(false)}
      ></div>
      
      <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl w-full max-w-lg mx-auto">
        <form onSubmit={handleFormSubmit}>
          <div className="px-4 pt-5 pb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingItem ? 'Edit Product' : 'Add Product'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Herbs</option>
                  <option>Dairy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 flex justify-end">
            <button
              type="button"
              className="bg-white px-4 py-2 rounded mr-2"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
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

export default FarmerDashboard