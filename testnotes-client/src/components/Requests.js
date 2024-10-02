import axios from 'axios';

const app_path = 'http://localhost:9999/yii2-project/web/'

    export async function logout(token){
        let response = await axios({
            method: 'post',
            url: `${app_path}site/logout`,
            data: {
                token: token,
            }
        });
        return response
    }
    export async function login(email, password){
        let response = await axios({
            method: 'post',
            mode: 'cors',
            url: `${app_path}site/login`,
            headers: {
                contentType: 'application/json',
            },
            data: {
                email: email,
                password: password,
            }
        })
        return response;
    }

    export async function reg(email, password){
        try{
            let response = await axios({
                method: 'post',
                mode: 'cors',
                url: `${app_path}site/signup`,
                headers: {
                    contentType: 'application/json',
                },
                data: {
                    email: email,
                    password: password,
                }
            })
            return response;
        }
        catch(e){
            console.log(e)
        }
    }

    export async function createNote(user_id, token, label, body){
        try{
            let response = await axios({
                method: 'post',
                mode: 'cors',
                url: `${app_path}site/create-note`,
                headers: {
                    contentType: 'application/json',
                },
                data: {
                    user_id: user_id,
                    token: token,
                    label: label,
                    body: body,
                }
            })
            return response;
        }
        catch(e){
            console.log(e);
        }
    }
    export async function fetchAll(user_id, token){
        try{
            let response = await axios({
                method: 'post',
                mode: 'cors',
                url: `${app_path}fetch-all`,
                headers: {
                    contentType: 'application/json',
                },
                data: {
                    user_id: user_id,
                    token: token,
                }
            })
            return response.data;
        }
        catch(e){
            console.log(e);
        }
    }