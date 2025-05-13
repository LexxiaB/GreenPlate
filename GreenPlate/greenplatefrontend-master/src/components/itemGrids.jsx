

// ItemsGrid.jsx - Reusable grid component
function ItemsGrid({ items, activeTab, emptyMessage = "No items found." }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.length > 0 ? (
        items.map((item) => (
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
                <span className="font-bold text-green-700">{item.price}</span>
                <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm hover:bg-green-600">
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-green-600">
          {emptyMessage}
        </div>
      )}
    </div>
  )
}

export default ItemsGrid