import * as types from './types'

export const get_book = () => async dispatch => {
    try {
        const res = await fetch("/api/01/wordbook/", {
            method: "GET",
            headers: {
                "Action": "application/json",
                "Content-Type": "application/json"
            },
        })
        const userData = await res.json()
        // resultado exitoso o fail

        if (res.status === 200) {
            dispatch({
                type: types.GET_BOOK_SUCCESS,
                payload: userData.success  // => res wordbook user data user
            })
        } else {
            dispatch({
                type: types.GET_BOOK_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type: types.GET_BOOK_FAIL
        })


    }
}

export const set_current = (data) => dispatch => {

    if (data === 0) {
        dispatch({
            type: types.RESET_CURRENT,
        })
    }else if (data > 0){
        dispatch({
            type: types.ADD_TO_CURRENT,
            payload: data
        })
    }else if (data < 0) {
        dispatch({
            type: types.SUBTRACT_TO_CURRENT,
            payload: data
        })
    }else {
        console.log("que pasa")
        dispatch({
            type: types.SET_CURRENT_FAIL,
        })
    }
}


export const add_word = (formData) => async dispatch => {
    const const_body = JSON.stringify(formData)
    try {
        const res = await fetch("/api/01/wordbook/addword/", {
            method: "POST",
            headers: {
                "Action": "application/json",
                "Content-Type": "application/json"
            },
            body: const_body
        })

        // resultado si agrega al libro o se tomo uno existente o fail
        dispatch(get_book())
        if (res.status === 201) { // create and adde to userbook
            dispatch({
                type: types.WORD_BOOK_ADD_SUCCESS
            })
        } else {
            dispatch({
                type: types.WORD_BOOK_ADD_FAIL
            })

        }

    } catch (error) {
        console.log(const_body)
        dispatch({
            type: types.AUTH_FAIL
        })


    }
}