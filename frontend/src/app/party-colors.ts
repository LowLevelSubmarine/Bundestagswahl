export class PartyColors{
  static partyColors: Map<number,string> = new Map([
    [1,"#1A1A1A"],
    [2,"#9E2A2A"],
    [3,"#E3D025"],
    [4,"#2E942A"],
    [5,"#ff0000"],
    [7,"#4396DF"],
    [8,"#e28a3b"]
  ])

  static placeholderPartyColor = "#636363"


  static getColorByParty(partyId: number): string {
    if (this.partyColors.has(partyId)) {
      return this.partyColors.get(partyId)!
    } else{
      return this.placeholderPartyColor
    }
  }
}





