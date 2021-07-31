export type TOrdersTableHeader = {
    id: number
    name: string
}

export type TOrdersTableData = {
    orderId: string
    client: string
    startDate: Date
    modifyDate: Date
    employee: string
    status: number
}

export type TAddOrderData = {
    employeeId: string
    customerEmail: string
    title: string
    issueTime: Date
    details: string
}

export type TEditOrderData = {
    id: string
    title: string
    clientEmail: string
    employeeId: string
    issueTime: string
    created_at: string
    updated_at: string
    status: number
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

export type TOrderStatus = {
    id: number
    value: number
    name: string
}
