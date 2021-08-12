export interface ChartElementDto {
  name: string
  color:string
  series: ChartElementValue[]
}

export interface ChartElementValue {
  name: string,
  position: number,
  value: number
}
