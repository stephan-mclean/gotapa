const FAVOURITES_KEY = 'SIMPLI_FAVOURITES';

const getFavourites = () => {
    const favouritesString = localStorage.getItem(FAVOURITES_KEY); 
    let favourites;
    try {
        favourites = JSON.parse(favouritesString) || [];
        console.log(favourites);
    } catch(err) {
        favourites = [];

        console.log('returning ', favourites);
        return favourites; 
    }

    console.log('Get favourites', favourites);
    return favourites;
};

const setFavourites = (favourites) => {
    console.log('Set favourites', favourites);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
}

export const isFavourite = stopId => {
    const favourites = getFavourites(); 
    return favourites.includes(stopId);
};

export const updateFavourite = (stopId, isFavourite) => {
    const favourites = getFavourites(); 

    if (isFavourite && !favourites.includes(stopId)) {
        favourites.push(stopId)
    } else if (!isFavourite && favourites.includes(stopId)) {
        favourites.splice(favourites.indexOf(stopId), 1);
    }

    setFavourites(favourites);
};