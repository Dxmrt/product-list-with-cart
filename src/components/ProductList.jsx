import ProductCard from './ProductCard';

export default function ProductList({ products, dispatch, cartItems }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.name}
          product={product}
          dispatch={dispatch}
          cartItems={cartItems}
        />
      ))}
    </div>
  );
}