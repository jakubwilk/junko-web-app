export type TOrdersTableHeader = {
    id: number
    name: string
}

export type TOrdersTableData = {
    id: number
    client: string
    createdAt: string
    updatedAt: string
    owner: string
    status: number
}

export type TAddOrderData = {
    employeeId: string
    customerEmail: string
    title: string
    issueTime: Date
    details: string
}

export type TOrderEmployees = {
    id: string
    firstName: string
    lastName: string
}

export type TAddOrderResponse = {
    statusCode: number
}
