import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllPremiados(){

 try{

  const res = await axios.get(`${API_URL}/premiados`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function getPremiado(id){

 try{

  const res = await axios.get(`${API_URL}/premiados/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true,data:res.data}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function createPremiado(id_premio,id_usuario,id_inscripcion){

 try{

  const payload={
   id_premio,
   id_usuario,
   id_inscripcion
  }

  const res = await axios.post(`${API_URL}/premiados`,payload)

  if(res?.status !== 201){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function updatePremiado(id,id_premio,id_usuario,id_inscripcion){

 try{

  const payload={
   id_premio,
   id_usuario,
   id_inscripcion
  }

  const res = await axios.put(`${API_URL}/premiados/${id}`,payload)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}

export async function deletePremiado(id){

 try{

  const res = await axios.delete(`${API_URL}/premiados/${id}`)

  if(res?.status !== 200){
   return {valid:false,error:res.data}
  }

  return {valid:true}

 }catch(error){
  return {valid:false,error:error.message}
 }

}
//