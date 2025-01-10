export interface TRateItem {
    Id: number
    Title: string
    SchoolboyId: number
    ColumnId: number
}

export interface TRate {
    Items: TRateItem[]
    Quantity: number
}
