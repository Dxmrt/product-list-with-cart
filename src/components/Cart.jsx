export default function Cart({ cartItems, dispatch, onConfirmOrder }) {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart ({totalQuantity})</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img
            src="/assets/images/illustration-empty-cart.svg"
            alt="Empty cart illustration"
            className="empty-cart-illustration"
          />
          <p className="empty-cart-text">Your added items will appear here</p>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.name} className="cart-item">
              <div className="item-info">
                <img
                  src={item.image.mobile.replace(
                    './assets/images/',
                    '/assets/images/'
                  )}
                  alt={item.name}
                  className="item-thumbnail"
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity}x ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="remove-btn"
                onClick={() => dispatch({ type: 'REMOVE', payload: item })}
              >
                ×
              </button>
            </div>
          ))}

          <div className="cart-total">
            <span>Order Total</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>

          <div className="carbon-neutral">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
            <span>This is a carbon-neutral delivery</span>
          </div>

          <button className="confirm-order-btn" onClick={onConfirmOrder}>
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}