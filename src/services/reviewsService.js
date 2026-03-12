import axios from "axios"

const API = "http://localhost:8000/api/reviews"

export const getAllReviews = async () => {

    try{

        const res = await axios.get(API)

        return {
            valid:true,
            reviews:res.data
        }

    }catch(error){

        return {
            valid:false,
            error:error.response?.data || error.message
        }

    }

}

export const getReview = async (id) => {

    try{

        const res = await axios.get(`${API}/${id}`)

        return {
            valid:true,
            review:res.data
        }

    }catch(error){

        return {
            valid:false,
            error:error.response?.data || error.message
        }

    }

}

export const createReview = async (resena, id_producto, id_usuario) => {

    try{

        const res = await axios.post(API,{
            resena,
            id_producto,
            id_usuario
        })

        return {
            valid:true,
            review:res.data
        }

    }catch(error){

        return {
            valid:false,
            error:error.response?.data || error.message
        }

    }

}

export const updateReview = async (id, resena, id_producto, id_usuario) => {

    try{

        const res = await axios.put(`${API}/${id}`,{
            resena,
            id_producto,
            id_usuario
        })

        return {
            valid:true,
            review:res.data
        }

    }catch(error){

        return {
            valid:false,
            error:error.response?.data || error.message
        }

    }

}

export const deleteReview = async (id) => {

    try{

        await axios.delete(`${API}/${id}`)

        return { valid:true }

    }catch(error){

        return {
            valid:false,
            error:error.response?.data || error.message
        }

    }

}