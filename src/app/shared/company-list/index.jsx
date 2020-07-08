import React from "react";
import "./index.scss";

import VehicleList from "../../shared/vehicle-list";


function CompanyList ({ companies }) {

  return (
    <>
      {companies.map(company => (
        <div key={company.id}>
          {company.fleet.length ?
            <div className="company v-box">
              <div className="company-info h-box">
                <div className="company-thumbnail"
                  style={{
                    borderColor: company.color,
                    backgroundImage: `url('${company.thumbnail || 'images/no-image.jpg'}')`
                  }}
                ></div>
                <h4 className="company-name">{company.name}</h4>
              </div>
              <VehicleList company={company}/>
            </div> : null
          }
        </div>
      ))}
    </>
  );
}

export default CompanyList;