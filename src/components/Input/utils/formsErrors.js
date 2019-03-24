const errorMessages = {
    format: 'Format error',
    range: 'Out of range error'
}

export const checkInRange = (value, check) => {
    return Number(value) > 0 && Number(value) <= check;
}


export const checkValue = (value, regex, checkRange = () => true) => {
    if (regex.test(value)) {
        if (!checkRange(value)) {
            return {error: errorMessages.range};
        }
        return {
            value: value.toUpperCase(),
            error: false
        }

    }
    return {error: errorMessages.format};

}
