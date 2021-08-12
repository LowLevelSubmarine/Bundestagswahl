import {Party} from "./party.dto";
import {Tasker} from "./tasker.dto";
import {Institute} from "./institute.dto";
import {SurveyPoint} from "./survey-point.dto";

export interface ResultDto{
  points: SurveyPoint[]
  parties: any
  taskers: any
  institutes: any
}
