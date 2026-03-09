import React, { useState } from 'react'
import { createRol } from '../../../../services/rolesService'
import AdminForm from '../../../../components/AdminForm'


const CreateRole = () => {
    //usestate para guardar el valor del input
    const [nombre, setNombre] = useState('')

    const campos = {
        //nombre de bd 
        nombre: {
            //la funcion que va a cambiar el dato
			onChange: setNombre,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'nombre',
            //nombre visible 
			titulo: 'Nombre',
		}
    }

    async function sendData(){
        try {
            let res = await createRol( nombre )
        
            if(!res?.valid) return res?.error
        
            } catch (error) {
                return error.message
            }
    }

    return (
		<div>
			<AdminForm 
				titulo={'Crear role'}
                campos={campos}
                linkRegresar={"/admin/roles"}
                onSendForm={sendData}
			></AdminForm>
		</div>
  	)
}

export default CreateRole