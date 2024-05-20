import axios from "axios";


axios.defaults.baseURL = 'https://api.unsplash.com/';
export const fetchImg = async (searchQuery, page = 1) => {
    const respons = await axios.get('search/photos', {
      params: {
        query: searchQuery,
        page,
            client_id: 'rRJel7RfIpFJgDKG4Vcau-opNeRR1-kVfSX3149L5Fk',
        per_page: 10,
      },
    }
    );

    return respons.data.results;
}