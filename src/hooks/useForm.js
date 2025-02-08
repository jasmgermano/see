import React, { useState } from 'react'

const types = {
    username: {
        regex: /^[a-zA-Z0-9._-]{3,16}$/,
        message: "O username deve ter entre 3 e 16 caracteres, apenas letras, números, pontos, traços e sublinhados."
    },
    password: {
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: "A senha deve ter no mínimo 8 caracteres, incluindo letras e números."
    },
    email: {
        regex: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
        message: "E-mail inválido."
    },
    profilePicture: {
        regex: /\.(gif|jpe?g|tiff|png|webp|bmp)$/i,
        message: "Imagem inválida."
    },
    emailOrUsername: {}
}

function useForm(type, useRegex = false) {
    const [value, setValue] = useState("");
    const [error, setError] = useState(null);

    function validate(value) {
        console.log("value", value);
        console.log("useRegex", useRegex);
        
        if (type === false) return true;
        
        if (value.length === 0) {
            setError("Preencha um valor.");
            return false;
        }
        
        if (useRegex && types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            console.log("types[type].message", types[type].message);
            return false;
        }
    
        setError(null);
        return true;
    }    

    function onChange({ target }) {
        if (error) validate(target.value);
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value)
    }
}

export default useForm