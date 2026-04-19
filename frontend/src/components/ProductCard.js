import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <div style={styles.imgContainer}>
        {product.image
          ? <img src={product.image} alt={product.name} style={styles.img} />
          : <div style={styles.noImg}>No image</div>
        }
      </div>
      <div style={styles.info}>
        <p style={styles.category}>{product.category.name}</p>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>KSh {Number(product.price).toLocaleString()}</span>
          <button
            style={styles.btn}
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    border: '1px solid #eee',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  imgContainer: {
    height: '200px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  noImg: {
    color: '#aaa',
    fontSize: '13px',
  },
  info: {
    padding: '12px 16px 16px',
  },
  category: {
    fontSize: '11px',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  name: {
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#333',
  },
  description: {
    fontSize: '13px',
    color: '#777',
    marginBottom: '12px',
    lineHeight: '1.5',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  btn: {
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default ProductCard;