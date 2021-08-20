import { Survey } from "./survey.dto";

export interface DataPoint {
  date: Date,
  values: Map<number, number>,
  surveys: Survey,
}
