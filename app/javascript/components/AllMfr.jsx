const AllMfr = {
    getManufacturersList() {
        // function handleErrors(response) {
        //     if (!response.ok) {
        //         throw Error(response.statusText);
        //     }
        //     return response.json();
        // };
        fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=jso`)
        .then(jsonResponse => {
            return jsonResponse.Results.map(result => ({
                Mfr_ID: result.Mfr_ID,
                Mfr_Name: result.Mfr_Name
            }));
        }).catch(error => console.log(error.message));
    }
};

export default AllMfr;