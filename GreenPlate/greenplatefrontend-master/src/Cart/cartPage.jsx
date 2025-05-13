import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CartPage() {
  const navigate = useNavigate()
  
  // In a real app, you would get cart from context or state management
  const [cart, setCart] = useState([
    { 
      id: 1, 
      name: 'Veggie Delight', 
      restaurant: 'Green Garden', 
      price: 14.99, 
      image: 'https://via.placeholder.com/80',
      quantity: 2,
      type: 'restaurants'
    },
    { 
      id: 3, 
      name: 'Organic Salad', 
      restaurant: 'Fresh & Raw', 
      price: 9.99, 
      image: 'https://via.placeholder.com/80',
      quantity: 1,
      type: 'restaurants'
    },
    { 
      id: 2, 
      name: 'Fresh Fruit Selection', 
      farmer: 'Berry Good Farms', 
      price: 19.95, 
      image: 'https://via.placeholder.com/80',
      quantity: 1,
      type: 'farmers'
    }
  ])
  
  // Update quantity
  const updateQuantity = (id, type, newQuantity) => {
    if (newQuantity < 1) return
    
    setCart(cart.map(item => 
      item.id === id && item.type === type 
        ? { ...item, quantity: newQuantity } 
        : item
    ))
  }
  
  // Remove item
  const removeItem = (id, type) => {
    setCart(cart.filter(item => !(item.id === id && item.type === type)))
  }
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08 // 8% tax
  const deliveryFee = 3.99
  const total = subtotal + tax + deliveryFee
  
  // Proceed to checkout
  const goToCheckout = () => {
    navigate('/checkout', { state: { cart } })
  }
  
  // Continue shopping
  const continueShopping = () => {
    navigate('/customer')
  }
  
  return (
    <div className="min-h-screen bg-white text-green-700">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={continueShopping}
              className="mr-4 text-green-600 hover:text-green-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-green-600">Your Cart</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})</h2>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <ul className="divide-y divide-green-100">
                  {cart.map((item) => (
                    <li key={`${item.type}-${item.id}`} className="p-4 flex">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="font-medium text-green-700">{item.name}</h3>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-green-600">
                            {item.type === 'restaurants' ? item.restaurant : item.farmer}
                          </p>
                        </div>
                        
                        <div className="flex-1 flex items-end justify-between">
                          <div className="flex items-center border border-green-200 rounded">
                            <button 
                              onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                              className="px-2 py-1 text-green-500 hover:bg-green-50"
                            >
                              -
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                              className="px-2 py-1 text-green-500 hover:bg-green-50"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id, item.type)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="sr-only">Remove</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={continueShopping}
                  className="text-green-600 hover:text-green-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-green-50 rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax (8%)</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery Fee</p>
                    <p>${deliveryFee.toFixed(2)}</p>
                  </div>
                  <div className="border-t border-green-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={goToCheckout}
                  className="w-full bg-green-500 text-white py-3 px-4 rounded-md font-medium hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 mt-6"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-green-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-bold text-green-700 mb-2">Your cart is empty</h2>
            <p className="text-green-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={continueShopping}
              className="bg-green-500 text-white py-2 px-6 rounded-md font-medium hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Start Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default CartPage