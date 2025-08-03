export default function ProductCard({ product, dispatch, cartItems }) {
  const { name, category, price, image } = product;
  
  // Get the current quantity from cart state
  const cartItem = cartItems.find(item => item.name === name);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleIncrement = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch({ type: 'DECREMENT', payload: product });
    }
  };

  return (
    <div className="product-card">
      <picture>
        <source media="(min-width: 1024px)" srcSet={image.desktop.replace('./assets/images/', '/assets/images/')} />
        <source media="(min-width: 768px)" srcSet={image.tablet.replace('./assets/images/', '/assets/images/')} />
        <img 
          src={image.mobile.replace('./assets/images/', '/assets/images/')} 
          alt={name}
          loading="lazy"
        />
      </picture>
      
      <div className="product-info">
        <p className="category">{category}</p>
        <h2>{name}</h2>
        <p className="price">${price.toFixed(2)}</p>
      </div>

      <div className="action-overlay">
        {quantity === 0 ? (
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h9m-9 0a2 2 0 100 4 2 2 0 000-4zm9 0a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add to Cart
          </button>
        ) : (
          <div className="quantity-selector">
            <button onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}