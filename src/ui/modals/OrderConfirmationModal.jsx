export default function OrderConfirmationModal({ orderItems, total, onStartNewOrder }) {
  return (
    <div className="modal-overlay" onClick={onStartNewOrder}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Order Confirmed</h2>
          <p>Your order has been successfully placed!</p>
        </div>

        <div className="order-summary">
          {orderItems.map((item) => (
            <div key={item.name} className="order-item">
              <div className="item-info">
                <img
                  src={item.image.mobile.replace('./assets/images/', '/assets/images/')}
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
            </div>
          ))}

          <div className="order-total">
            <span>Total</span>
            <span className="total-amount">${total.toFixed(2)}</span>
          </div>
        </div>

        <button className="start-new-order-btn" onClick={onStartNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
}