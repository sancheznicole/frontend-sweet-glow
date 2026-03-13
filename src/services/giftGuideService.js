import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllGuias(){

 try{

  const res = await axios.get(`${API_URL}/gift_guide`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function getGuia(id){

 try{

  const res = await axios.get(`${API_URL}/gift_guide/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function createGuia(nombre,descripcion){

 try{

  const payload={
   nombre,
   descripcion
  }

  const res = await axios.post(`${API_URL}/gift_guide`,payload)

  if(res?.status !== 201){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function updateGuia(id,nombre,descripcion){

 try{

  const payload={
   nombre,
   descripcion
  }

  const res = await axios.put(`${API_URL}/gift_guide/${id}`,payload)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function deleteGuia(id){

 try{

  const res = await axios.delete(`${API_URL}/gift_guide/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}
//