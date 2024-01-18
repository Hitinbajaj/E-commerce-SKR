import './HomeScreen.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProducts as listProducts } from '../redux/actions/productActions';
import { setUserDeatils } from '../redux/actions/userAction';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const allCategories = ['Sports', 'Speakers', 'Kitchen', 'Home Decors', 'Mobiles', 'Laptops'];
  const [selectedCategory, setSelectedCategory] = useState(null);



  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUserDeatils());
  }, [dispatch]);

  useEffect(() => {
    const filteredBySearch = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredByCategory = selectedCategory
      ? filteredBySearch.filter(
          
          (product) => {
            console.log(product.category);
           return product.category === selectedCategory
          }
        )
      : filteredBySearch;

    setFilteredProducts(filteredByCategory);
  }, [products, searchQuery, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="homescreen">
      <div className="homescreen__search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="homescreen__search-button"
          onClick={handleClearSearch}
        >
          {'Clear'}
        </button>
      </div>
      <div className="homescreen__filters">

        <select
          value={selectedCategory || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="" className="options">All Categories</option>
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <h2 className="homescreen__title">Latest Products</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          filteredProducts.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
