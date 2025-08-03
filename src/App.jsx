import { useReducer, useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { OrderConfirmationModal } from './ui';
import products from './data/data.json';

const initialState = {
  cartItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cartItems.find(
        (item) => item.name === action.payload.name
      );
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.name === action.payload.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }

    case 'INCREMENT':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case 'DECREMENT':
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.name === action.payload.name
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case 'REMOVE':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.name !== action.payload.name
        ),
      };

    case 'CLEAR_CART':
      console.log('Clearing cart...');
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  // Monitor cart state changes
  useEffect(() => {
    console.log('Cart state updated:', state.cartItems);
  }, [state.cartItems]);

  const handleConfirmOrder = () => {
    setOrderItems([...state.cartItems]);
    setOrderTotal(
      state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    setShowConfirmation(true);
  };

  const handleStartNewOrder = () => {
    console.log('Starting new order, current cart items:', state.cartItems);
    dispatch({ type: 'CLEAR_CART' });
    setShowConfirmation(false);
    console.log('Cart cleared, new cart items:', []);
  };

  return (
    <div className="app-container">
      <h1 className="title">Desserts</h1>
      <ProductList
        products={products}
        dispatch={dispatch}
        cartItems={state.cartItems}
      />
      <Cart
        cartItems={state.cartItems}
        dispatch={dispatch}
        onConfirmOrder={handleConfirmOrder}
      />
      {showConfirmation && (
        <OrderConfirmationModal
          orderItems={orderItems}
          total={orderTotal}
          onStartNewOrder={handleStartNewOrder}
        />
      )}
    </div>
  );
}