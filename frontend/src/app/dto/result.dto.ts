import { DataPoint } from "./data-point.dto";
import { Today } from "./today.dto";

export interface ResultDto {
  today?: Today
  seatDistribution: Map<number, number>
  points: DataPoint[]
  parties: any
  taskers: any
  institutes: any
}
