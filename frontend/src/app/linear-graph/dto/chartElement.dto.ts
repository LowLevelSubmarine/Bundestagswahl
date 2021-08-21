export interface ChartElement {
  chartGroups: ChartElementGroup[],
  yLines: YLines[]
}

export interface YLines {
  position: number,
  name: string,
  stroke: number|undefined

}

export interface ChartElementGroup {
  name: string
  color:string
  points: ChartElementValue[]
}

export interface ChartElementValue {
  name: string,
  position: number,
  y: number
  info: Map<string,string>
}
