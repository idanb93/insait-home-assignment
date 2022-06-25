import { BALANCE_LOW, BALANCE_UPPER, CITIES, MORTAGE, NUM_OF_CREDIT_CARDS } from "../constants/filtersTypes";

export const filterPosts = (posts, filters) => {

    const filtersNames = Object.keys(filters);

    filtersNames.forEach((filterName) => {

        switch (filterName) {
            case BALANCE_LOW:
                if (filters[BALANCE_LOW]) {
                    posts = posts.filter((post) => {
                        return parseInt(post.balance) >= parseInt(filters[filterName]);
                    })
                }
                break;
            case BALANCE_UPPER:
                if (filters[BALANCE_UPPER]) {
                    posts = posts.filter((post) => {
                        return parseInt(post.balance) <= filters[filterName];
                    })
                }
                break;
            case CITIES:
                if (filters[CITIES].length) {
                    posts = posts.filter((post) => {
                        return filters[filterName].includes(post.city);
                    })
                }
                break;
            case MORTAGE:
                if (filters[MORTAGE]) {
                    posts = posts.filter((post) => {
                        return post.haveMortgage === 'Yes';
                    })
                }
                break;
            case NUM_OF_CREDIT_CARDS:
                if (filters[NUM_OF_CREDIT_CARDS]) {
                    posts = posts.filter((post) => {
                        return post.numCreditCards === parseInt(filters[filterName]);
                    })
                }
                break;
            default:
                break;
        }
    })

    return posts;
}