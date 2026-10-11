export const getspecificbrand= async(id:string)=>{
    const response =await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    const  payLoad = await response.json()
    return payLoad
    
    
    }