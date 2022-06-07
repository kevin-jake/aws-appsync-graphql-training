/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createACPower = /* GraphQL */ `
  mutation CreateACPower(
    $input: CreateACPowerInput!
    $condition: ModelACPowerConditionInput
  ) {
    createACPower(input: $input, condition: $condition) {
      id
      voltage
      current
      power
      createdAt
      updatedAt
    }
  }
`;
export const updateACPower = /* GraphQL */ `
  mutation UpdateACPower(
    $input: UpdateACPowerInput!
    $condition: ModelACPowerConditionInput
  ) {
    updateACPower(input: $input, condition: $condition) {
      id
      voltage
      current
      power
      createdAt
      updatedAt
    }
  }
`;
export const deleteACPower = /* GraphQL */ `
  mutation DeleteACPower(
    $input: DeleteACPowerInput!
    $condition: ModelACPowerConditionInput
  ) {
    deleteACPower(input: $input, condition: $condition) {
      id
      voltage
      current
      power
      createdAt
      updatedAt
    }
  }
`;
