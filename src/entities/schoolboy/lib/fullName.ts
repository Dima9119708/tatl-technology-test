export const fullName = ({ lastName, firstName, secondName }: { lastName: string; firstName: string; secondName: string }) => {
    if (firstName && lastName) {
        return `${firstName} ${lastName}`
    }

    if (firstName) {
        return `${firstName}`
    }

    if (lastName) {
        return `${lastName}`
    }

    if (secondName) {
        return `${secondName}`
    }
}
