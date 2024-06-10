import * as c from './constants';

let initialState = {
    categories: [],
    recent_posts: []
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case c.HEADLINES_AVAILABLE: {
            return {
                ...state,
                categories: action.headlines
            };
        }
        case c.RECENT_POSTS: {
            return {
                ...state,
                recent_posts: action.recent_posts
            }
        }
        case c.CATEGORY_HEADLINES_AVAILABLE: {
            let { category, headlines, page } = action;
            const { articles } = headlines;

            if (page > 1) {
                let data = state[category.toLowerCase()];
                let clone = JSON.parse(JSON.stringify(data));
                let articles_ = clone['articles'];
                clone['articles'] = [...articles_, ...articles];
                return {...state, [category.toLowerCase()]:clone};
            }else{
                return {...state, [category.toLowerCase()]:headlines};
            }
        }
        default:
            return state;
    }
};

export default newsReducer;