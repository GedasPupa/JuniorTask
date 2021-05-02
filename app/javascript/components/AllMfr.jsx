const AllMfr = {
    getManufacturersList() {
        return fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json`)
        .then(response => response.json())
        .then(jsonResponse => {
            return jsonResponse.Results.map(result => ({
                Mfr_ID: result.Mfr_ID,
                Mfr_Name: result.Mfr_Name
            }));
        })
    }
};

export default AllMfr;