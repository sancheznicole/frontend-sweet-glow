import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllImages(){
 try{

  const res = await axios.get(`${API_URL}/images`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }
}

export async function getImage(id){

 try{

  const res = await axios.get(`${API_URL}/images/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }
}

export async function createImage(file,id_producto){

 try{

  const formData = new FormData()

  formData.append("filename",file)
  formData.append("id_producto",id_producto)

  const res = await axios.post(`${API_URL}/images`,formData)

  if(res?.status !== 201){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function updateImage(id,file){

 try{

  const formData = new FormData()

  formData.append("filename",file)

  const res = await axios.put(`${API_URL}/images/${id}`,formData)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function deleteImage(id){

 try{

  const res = await axios.delete(`${API_URL}/images/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}
//