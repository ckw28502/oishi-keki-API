const convertCakeToDto = (cake) => {
    return {
        id: cake.id,
        name: cake.name,
        price: cake.price
    };
};

const convertCakesToDtos = (cakes) => {
    return cakes.map(cake => convertCakeToDto(cake));
};

export { convertCakeToDto, convertCakesToDtos };