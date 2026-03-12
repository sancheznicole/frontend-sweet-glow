import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

// --------------------------------------------
// TRAER TODAS LAS MARCAS
// --------------------------------------------
export async function getAllBrands() {
  try {

    const res = await axios.get(`${API_URL}/brands`)

    if (res?.status !== 200) {
      return { valid: false, error: res.data?.errors }
    }

    return { valid: true, brands: res?.data }

  } catch (error) {

    return { valid: false, error: error?.message }

  }
}

// --------------------------------------------
// TRAER UNA MARCA
// --------------------------------------------
export async function getBrand(id_marca) {
  try {

    const res = await axios.get(`${API_URL}/brands/${id_marca}`)

    if (res?.status !== 200) {
      return { valid: false, error: res.data?.errors }
    }

    return { valid: true, brand: res?.data }

  } catch (error) {

    return { valid: false, error: error?.message }

  }
}

// --------------------------------------------
// CREAR MARCA
// --------------------------------------------
export async function createBrand(nombre, pais_origen) {

  try {

    const payload = { nombre, pais_origen }

    const res = await axios.post(`${API_URL}/brands`, payload)

    if (res?.status !== 201) {
      return { valid: false, error: res.data?.errors }
    }

    return { valid: true }

  } catch (error) {

    return { valid: false, error: error?.message }

  }

}

// --------------------------------------------
// ACTUALIZAR MARCA
// --------------------------------------------
export async function updateBrand(id_marca, nombre, pais_origen) {

  try {

    const payload = { nombre, pais_origen }

    const res = await axios.put(`${API_URL}/brands/${id_marca}`, payload)

    if (res?.status !== 200) {
      return { valid: false, error: res.data?.errors }
    }

    return { valid: true }

  } catch (error) {

    return { valid: false, error: error?.message }

  }

}

// --------------------------------------------
// ELIMINAR MARCA
// --------------------------------------------
export async function deleteBrand(id_marca) {

  try {

    const res = await axios.delete(`${API_URL}/brands/${id_marca}`)

    if (res?.status !== 200) {
      return { valid: false, error: res.data?.errors }
    }

    return { valid: true }

  } catch (error) {

    return { valid: false, error: error?.message }

  }

}