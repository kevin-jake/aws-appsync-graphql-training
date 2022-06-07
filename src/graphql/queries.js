/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getACPower = /* GraphQL */ `
  query GetACPower($id: ID!) {
    getACPower(id: $id) {
      id
      voltage
      current
      power
      createdAt
      updatedAt
    }
  }
`;
export const listACPowers = /* GraphQL */ `
  query ListACPowers(
    $filter: ModelACPowerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listACPowers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        voltage
        current
        power
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
