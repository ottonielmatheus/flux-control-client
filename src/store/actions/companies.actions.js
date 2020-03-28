export function setCompanies (companies) {
    return {
        type: 'SET_COMPANIES',
        source: companies
    };
}

export function selectVehicle (vehicle) {
    return {
        type: 'SELECT_VEHICLE',
        selectedVehicle: vehicle
    };
}

export function selectCompany (company) {
    return {
        type: 'SELECT_COMPANY',
        selectedCompany: company
    };
}