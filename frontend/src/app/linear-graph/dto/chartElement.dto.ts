export interface ChartElementDto {
  name: string
  color:string
  series: ChartElementValue[]
}

export interface ChartElementValue {
  name: string,
  position: number,
  y: number
  info: Map<string,string>
}
