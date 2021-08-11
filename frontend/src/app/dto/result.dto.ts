import {SurveyPoint} from "./survey-point";
import {Party} from "./party.dto";
import {Tasker} from "./tasker.dto";
import {Institute} from "./institute.dto";

export interface ResultDto{
  points: SurveyPoint[]
  parties: Map<number, Party>
  taskers: Map<number, Tasker>
  institutes: Map<number,Institute>
}
