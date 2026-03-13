import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllPremios(){
 try{

  const res = await axios.get(`${API_URL}/premios`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }
}

export async function getPremio(id){

 try{

  const res = await axios.get(`${API_URL}/premios/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function createPremio(id_producto){

 try{

  const payload = { id_producto }

  const res = await axios.post(`${API_URL}/premios`,payload)

  if(res?.status !== 201){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function updatePremio(id,id_producto){

 try{

  const payload = { id_producto }

  const res = await axios.put(`${API_URL}/premios/${id}`,payload)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function deletePremio(id){

 try{

  const res = await axios.delete(`${API_URL}/premios/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}
//