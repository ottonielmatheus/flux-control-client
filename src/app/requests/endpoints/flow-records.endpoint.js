import request from '../BaseRequest';

class FlowRecordsAPI {

    constructor() {
        this.uri = 'api/flow-records/';
    }

    async get (id) {

        try {

            const response = await request({
                method: "GET",
                api: this.uri + 'get/' + id
            });

            return response?.flowRecord;
        }

        catch (ex) {
            return null;
        }
    }

    async getHistoric (vehicleId) {

        try {

            const response = await request({
                method: "GET",
                api: this.uri + 'historic/' + vehicleId
            });

            return response.items || [];
        }

        catch (ex) {
            return [];
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
            return [];
        }
    }

    async remove (companyId) {

        try {

            const response = await request({
                method: "DELETE",
                api: this.uri + 'remove/' + companyId,
            });

            return response.message === 'company_deleted';
        }

        catch (ex) {
            return null;
        }
    }
};

export default new FlowRecordsAPI();