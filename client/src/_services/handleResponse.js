import authenticationService from './authentication.service'

export function handleResponse(response) {
    return response.text().then(text => {
        let data = text && JSON.parse(text);
        if (!response.ok || data.error != null) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            } 
 
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    }).catch(reason => {
        console.log(reason);
        // window.location.reload(true);
    });
}

export default handleResponse;