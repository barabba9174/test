const errorMessages = {
    format: 'Format error: insert a number',
    range: 'Out of range error: min is 1 and max is 20'
}

const checkRange = (value) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(value))) {
        return true;
    }

    return ((Number(value) > 1 && Number(value) <= 20));
}

export default(value, regex) => {
    if (!checkRange(value)) {
        return {error: errorMessages.range};
    }
    if (regex.test(value)) {

        return {
            value: value.toUpperCase(),
            error: false
        }

    }
    return {error: errorMessages.format};

}