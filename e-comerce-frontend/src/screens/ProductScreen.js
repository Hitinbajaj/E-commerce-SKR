import './ProductScreen.css'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// Actions
import {getProductDetails} from '../redux/actions/productActions'
import {addToCart} from '../redux/actions/cartActions'

const ProductScreen = ({match, history}) => {
  const [qty, setQty] = useState(1)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.getProductDetails)
  const {loading, error, product} = productDetails

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id))
    }
  }, [dispatch, match, product])

  const addToCartHandler = () => {
    if (user.userInfo.isLogin) {
      dispatch(addToCart(product._id, qty))
      history.push(`/cart`)
      return
    } else {
      alert('You need to first login.')
    }
  }
  const generateWhatsAppLink = () => {
    const phoneNumber = '917000933943'; // Replace with the actual WhatsApp phone number
    const encodedMessage = encodeURIComponent(`Order:\n\n${qty} x ${product.name}`);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const buyNowHandler= () => {
    const whatsappLink = generateWhatsAppLink();
    window.location.href = whatsappLink;
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageUrl} alt={product.name} className="img" />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Description: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              
              <p>
                Status:
                <span>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={e => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={buyNowHandler}>
                  Buy Now
                </button>
                
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
                
              </p>
              
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductScreen
