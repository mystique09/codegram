export default function redirectTo(destination: string) {
    return {
        redirect: {
            destination,
                status: 301
        }
    }
}