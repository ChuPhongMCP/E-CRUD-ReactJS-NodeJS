const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
});

const convertOptionSelect = (data) => {
    if (!data || data.length === 0) return []

    return data.map((item) => {
        return {
            value: item.id || item._id,
            label: item.name,
        };
    })
};

const fuzzySearch = (text) => {
    const regex = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    return new RegExp(regex, 'gi');
};

export {
    formatter,
    convertOptionSelect,
    fuzzySearch,
}