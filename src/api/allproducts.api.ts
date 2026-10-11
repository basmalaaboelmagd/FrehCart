


export const getAllProducts = async () => {
    
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/products',{
       next:{revalidate:60}
    })
    let data = await response.json()
    return data

}
