const FAVOURITES_KEY = 'SIMPLI_FAVOURITES';

const setFavourites = (favourites) => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
}

const isFav = (stopId, favourites) => {
    return favourites && favourites.findIndex(fav => fav.stopId === stopId) > -1;
}

export const getFavourites = () => {
    const favouritesString = localStorage.getItem(FAVOURITES_KEY); 
    let favourites;
    try {
        favourites = JSON.parse(favouritesString) || [];
    } catch(err) {
        favourites = [];
        return favourites; 
    }

    return favourites;
};

export const isFavourite = stopId => {
    const favourites = getFavourites(); 
    return isFav(stopId, favourites);
};

export const updateFavourite = (stop, isFavourite) => {
    const favourites = getFavourites(); 

    if (isFavourite && !isFav(stop.stopId, favourites)) {
        favourites.push(stop);
    } else if (!isFavourite && isFav(stop.stopId, favourites)) {
        favourites.splice(favourites.findIndex(fav => fav.stopId === stop.stopId), 1);
    }

    setFavourites(favourites);
};