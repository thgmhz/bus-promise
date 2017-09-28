const getCompany = company => ({
  operationAreaCode: company.a,
  referenceCode: company.c,
  name: company.n
})

const getCompaniesByOperationArea = data =>
  data.map(companyByOperationArea =>
    companyByOperationArea.e.map(company => getCompany(company)))
    .reduce((pos, nextPos) => pos.concat(nextPos))

export default function companiesResponse (data) {
  return {
    hour: data.hr,
    companies: getCompaniesByOperationArea(data.e)
  }
}
