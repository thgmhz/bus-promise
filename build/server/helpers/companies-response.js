"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = companiesResponse;
function companiesResponse(data) {
  var companiesByOperationArea = data.e,
      informationDate = data.hr;

  return {
    informationDate: informationDate,
    companiesByOperationArea: companiesByOperationArea.map(function (companyByOperationArea) {
      return {
        operationCode: companyByOperationArea.a,
        companies: companyByOperationArea.e.map(function (company) {
          return {
            operationAreaCode: company.a,
            referenceCode: company.c,
            name: company.n
          };
        })
      };
    })
  };
}