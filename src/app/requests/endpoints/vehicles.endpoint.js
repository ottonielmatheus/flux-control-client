import request from '../BaseRequest';

class VehiclesAPI {

    constructor() {
        this.uri = 'api/vehicles/';
    }

    async arrival (vehicleId) {

        try {

            const response = await request({
                method: "POST",
                api: this.uri + 'arrival/' + vehicleId
            });

            return response.moment;
        }

        catch (ex) {
            console.error(ex);
            return null;
        }
    }

    async departure (vehicleId) {

        try {

            const response = await request({
                method: "PUT",
                api: this.uri + 'departure/' + vehicleId
            });

            return response.moment;
        }

        catch (ex) {
            console.error(ex);
            return null;
        }
    }

    async search (query) {

        try {

            const response = await request({
                method: "GET",
                api: this.uri + 'search?query=' + query
            });

            return response.items || [];
        }

        catch (ex) {
            console.error(ex);
            return [];
        }
    }

    async garage () {

        try {

            const response = await request({
                method: "GET",
                api: this.uri + 'garage'
            });

            return response.items || [];
        }

        catch (ex) {
            console.error(ex);
            return [];
        }
    }

    async get (id) {

        try {

            const response = await request({
                method: "GET",
                api: this.uri + 'get/' + id
            });

            return response?.vehicle;
        }

        catch (ex) {
            console.error(ex);
            return null;
        }
    }

    async load () {

        try {

            const response = await request({
                method: "GET",
                api: this.uri
            });

            return response.items || [];
        }

        catch (ex) {
            console.error(ex);
            return [];
        }
    }

    async update (company) {

        try {

            const response = await request({
                method: "PATCH",
                api: this.uri + 'change',
                body: company
            });

            return response.message === 'vehicle_updated';
        }

        catch (ex) {
            console.error(ex);
            return null;
        }
    }

    async remove (companyId) {

        try {

            const response = await request({
                method: "DELETE",
                api: this.uri + 'remove/' + companyId,
            });

            return response.message === 'vehicle_deleted';
        }

        catch (ex) {
            console.error(ex);
            return null;
        }
    }
};

export default new VehiclesAPI();