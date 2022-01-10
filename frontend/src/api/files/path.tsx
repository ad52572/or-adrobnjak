const path = process.env.REACT_APP_API_PATH || "";

export const dataApi = {
    getJson: `${path}/files`,
    getAllJson: `${path}/datatable/get-all-pjevaci`,

};