import favoritesReducer, {addFavorite, removeFavorite} from "../store/favoritesSlice"
const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "Test description",
  category: "test category",
  image: "test.jpg",
  rating: {
    rate: 4.5,
    count: 100
  }
};

describe('favorites reducer', () => {
  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: '' })).toEqual({
      items: []
    });
  });

  it('should handle adding a favorite', () => {
    const initialState = { items: [] };
    const nextState = favoritesReducer(initialState, addFavorite(mockProduct));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(mockProduct);
  });

  it('should not add duplicate favorites', () => {
    const initialState = { items: [mockProduct] };
    const nextState = favoritesReducer(initialState, addFavorite(mockProduct));
    expect(nextState.items).toHaveLength(1);
  });

  it('should handle removing a favorite', () => {
    const initialState = { items: [mockProduct] };
    const nextState = favoritesReducer(initialState, removeFavorite(mockProduct.id));
    expect(nextState.items).toHaveLength(0);
  });
});