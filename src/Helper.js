export async function getUser() {
    return new Promise((resolve, reject) => {
        const mock = {
            role: 'Client',
            fullName: 'testClient',
            userName: 'user',
            password: 'user'
        }
        resolve(mock);
    })
}