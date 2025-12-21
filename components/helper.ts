 export const extractNumber = (value: string): number  =>{
  return Number(value.replace(/\D/g, ''))
  }