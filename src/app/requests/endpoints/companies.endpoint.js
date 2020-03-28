import request from '../BaseRequest';

class CompaniesAPI {

    constructor() {
        this.uri = 'api/companies/';
    }

    async get (id) {

        try {

            const response = await request({
                method: "GET",
                api: this.uri + 'get/' + id
            });

            return response?.company;
        }

        catch (ex) {
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
            return [];
        }
    }

    async getFleet (companyId) {

        try {

            const response = await request({
                method: "GET",
                api: this.uri + 'fleet/' + companyId
            });

            return response.fleet || [];
        }

        catch (ex) {
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

            return response.message === 'company_updated';
        }

        catch (ex) {
            return null;
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

export default new CompaniesAPI();