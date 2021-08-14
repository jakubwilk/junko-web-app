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

export type THistoryOrderData = {
    title: string
    description: string
    date: Date
}

export type TAddOrderHistoryData = {
    id: string
    title: string
    description: string
    time: Date
}

export type TOrderHistoryData = {
    id: string
    order_id: string
    title: string
    created_at: Date
    updated_at: Date
    description: string
}
