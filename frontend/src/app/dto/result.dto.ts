import { DataPoint } from "./data-point.dto";
import { Changes } from "./changes.dto";

export interface ResultDto {
  changes: Changes
  seatDistribution: Map<number, number>
  points: DataPoint[]
  parties: any
  taskers: any
  institutes: any
}
