export const validate = (value, verifications) => {
    return verifications
        .filter(item => {
            if (item.type == 'isLength') {
                if (value.length >= item.arguments[0] && value.length <= item.arguments[1]) {
                    return false
                }
                else { return true }
            }
            return false
        })
        .map(item => {
            return item.message
        })
}



