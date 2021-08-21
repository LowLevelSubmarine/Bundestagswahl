export interface GroupDto {
  group: string,
  color: string,
  values: GroupValueDto[]
}

export interface GroupValueDto {
  position: number,
  x: any,
  y: any,
  info: Map<string,string>,
}
