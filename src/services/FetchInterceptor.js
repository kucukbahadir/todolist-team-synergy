import fetchIntercept from 'fetch-intercept';

/**
 * Intercepts fetch requests and responses.
 * It adds the Authorization header to the request and redirects to the login page if the response status is 401.
 */
class FetchInterceptor{

    /**
     * @type {this} theInstance - The singleton instance of the FetchInterceptor
     */
    static theInstance;

    session;
    nav;
    unregister;

    constructor(session, nav) {

        this.session = session;
        this.nav = nav;

        FetchInterceptor.theInstance = this;

        this.unregister = fetchIntercept.register(this);

        console.log("FetchInterceptor has been created, current token: ", FetchInterceptor.theInstance.session.getToken());

    }

    request(url, options){
        let token = FetchInterceptor.theInstance.session.getToken();

        if (token == null){
            return[url, options];
        } else if (options == null){
            return [url, { headers: { Authorization: token }}];
        } else {
            let newOptions = { ...options };
            if (!newOptions.headers) {
                newOptions.headers = {};
            }
            newOptions.headers.Authorization = token;
            return [url, newOptions];
        }

    }

    requestError(error) {
        console.error('Request error:', error);
    }

    response(response) {
        if (response.status === 403 || response.status === 401) {
            FetchInterceptor.theInstance.nav("/login");
        }
        return response;
    }

    responseError(error) {
        console.error('Response error:', error);
    }

}

export default FetchInterceptor;