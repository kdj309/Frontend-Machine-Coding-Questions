export   const validations = {
    email: (value: string) => /@/.test(value),
    number: (value: string) => /^\d{10}$/.test(value),
    name:(value:string)=>value.length>3,
    city:(value:string)=>value.trim()==="",
    address:(value:string)=>value.trim()===""
  }