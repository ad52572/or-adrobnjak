const path = process.env.REACT_APP_API_PATH || "";

// ovo je primejr endpointova za pojedini feature to se kasnije koristi u metodi pr. fetch(apiEndpoints.signUp)
// export const apiEndpoints = {
//     signUp: `${path}signup`,
//     login: `${path}users/login`,
//     getCurrentUser: `${path}whoAmI`,
// }

export const dataApi = {
    getPjesma: `${path}/datatable/get-all-pjesma`,
    getPjevaci: `${path}/datatable/get-all-pjevaci`,
    getPjevaciJSON: `${path}/public/pjevaci.json`,
};