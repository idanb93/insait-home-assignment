import { FETCH_ALL, CREATE, UPDATE_POST, UPDATE_FILTER, APPLY_FILTERS, DELETE, LIKE } from '../constants/actionTypes';
import { BALANCE_LOW, BALANCE_UPPER, CITIES, MORTAGE, NUM_OF_CREDIT_CARDS } from '../constants/filtersTypes';
import { filterPosts } from '../services/postsService';

const initialState = {
  filters: {
    [BALANCE_LOW]: null,
    [BALANCE_UPPER]: null,
    [CITIES]: [],
    [MORTAGE]: false,
    [NUM_OF_CREDIT_CARDS]: null,
  },
  cities: [],
  filteredPosts: [],
  posts: [], 

}

export default (state = initialState, action) => {

  switch (action.type) {

    case FETCH_ALL:

      const cities = action.payload.reduce((cities, post) => {
        if (cities.includes(post.city)) {
          return cities;
        } else {
          return [...cities, post.city];
        }
      }, [])

      cities.sort();

      return { ...state, posts: action.payload, filteredPosts: action.payload, cities };

    case LIKE:
      const updatedPosts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      return { ...state, posts: updatedPosts, filteredPosts: updatedPosts }

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload], filteredPosts: [...state.posts, action.payload]}

    case UPDATE_POST:
      const updatedPosts2 = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      return { ...state, posts: updatedPosts2, filteredPosts: updatedPosts2 }

    case UPDATE_FILTER:
      if (!action?.payload?.filterName || !Object.keys(state.filters).includes(action?.payload?.filterName)) {
        throw new Error('Filter is not supported!');
      }
      return { ...state, filters: { ...state.filters, [action.payload.filterName]: action.payload.filterValue } }

    case APPLY_FILTERS:
      return { ...state, filteredPosts: filterPosts(state.posts, state.filters) }

    case DELETE:
      const updatedPosts3 = state.posts.filter((post) => post._id !== action.payload);
      return { ...state, posts: updatedPosts3, filteredPosts: updatedPosts3 }

    default:
      return state;
  }
};

