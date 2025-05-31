
const getBlooodGroupEnumFString=(group:string)=>{
      switch (group.trim().toUpperCase()) {
        case "A+VE":
          return "A_POSITIVE";
        case "A-VE":
          return "A_NEGATIVE";
        case "B+VE":
          return "B_POSITIVE";
        case "B-VE":
          return "B_NEGATIVE";
        case "AB+VE":
          return "AB_POSITIVE";
        case "AB-VE":
          return "AB_NEGATIVE";
        case "O+VE":
          return "O_POSITIVE";
        case "O-VE":
          return "O_NEGATIVE";
        default:
          return null; // or throw error / handle unknown
      }
    };
const getBlooodGroupStringFEnum=(group:string)=>{
      switch (group.trim().toUpperCase()) {
        case "A_POSITIVE":
          return "A+ve";
        case "A_NEGATIVE":
          return "A-ve";
        case "B_POSITIVE":
          return "B+ve";
        case "B_NEGATIVE":
          return "B-ve";
        case "AB_POSITIVE":
          return "AB+ve";
        case "AB_NEGATIVE":
          return "AB-ve";
        case "O_POSITIVE":
          return "O+ve";
        case "O_NEGATIVE":
          return "O-ve";
        default:
          return null; // or throw error / handle unknown
      }
    };
const arrToCSV=(arr:string[])=>{
    if(!arr || arr.length===0) return null;
    return arr.join(", ");
}
export {getBlooodGroupEnumFString, getBlooodGroupStringFEnum, arrToCSV};    