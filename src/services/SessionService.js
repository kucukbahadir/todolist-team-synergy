/**
 * This service is responsible for managing the session of the user.
 *
 * @author Yassin Rahou
 */
import { taskListService } from "./TaskListService";

class Session {

    URL;
    STORAGE_NAME;

    /**
     * Constructor
     *
     * @param url - URL of the server
     * @param storageName - Name of the item e.g. "token"
     */
    constructor(url, storageName) {
        this.STORAGE_NAME = storageName;
        this.URL = url;
    }

    /**
     * Method verifies the code sent to the user.
     *
     * @async
     * @param email - Email of the user
     * @param code - Code sent to the user
     * @returns {Promise<any|null>}
     */
    async verifyCode(email, code) {
        const body = JSON.stringify({email: email, code: code})
        let req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            credentials: 'include',
        }

        let response = await fetch(this.URL + "/auth/verify-code", req);
        //console.log("Response", response);

        if (response.ok) {
            let user = await response.json();
            console.log("Res ok")
            

            // Get the shared Lists from the db here\
            /* if (user.sharedLists && user.sharedLists.length > 0) {
                const listIDs = user.sharedLists.join(',');
                let url = `${this.URL}/lists?ids=${listIDs}`;
                //console.log(url);
                let listResponse = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log("List Response", listResponse)            
        
                if (listResponse.ok) {
                    // TODO: Technically already needs token here to acces /api/
                    // Temp fix: Removed /api/ from route
                    let lists = await listResponse.json();
                    //const sharedLists = await listResponse.json();
                    console.log("Shared", lists);

                    
                } else {
                    console.error("Error fetching shared lists:", listResponse.status);
                }
            } */
            this.saveToken(
                response.headers.get('Authorization'),
                user,
                null
            );

            let lists = await taskListService.getTaskLists(user);

            this.saveToken(
                null,
                null,
                lists
            )
            
            return user;
        } else {
            console.error(response)
            return null;
        }
    }

    /**
     * Sends a verification code to the given email.
     *
     * @async
     * @param email - Email of the user
     * @returns {Promise<any|null>}
     */
    async requestCode(email) {
        const body = JSON.stringify({email: email});

        let req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            credentials: 'include',
        }

        return await fetch(this.URL + "/auth/request-code", req);
    }

    /**
     * Method Registers the user.
     *
     * @async
     * @param email - Email of the user
     */
    async registerUser(email) {
        const body = JSON.stringify({email: email});

        let req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            credentials: 'include',
        }

        return await fetch(this.URL + "/auth/register", req);
    }

    /**
     * Method signs out the user.
     *
     * @returns {void}
     */
    signOut(){
        // Remove token from service
        localStorage.removeItem("token");

        // Remove user from service
        localStorage.removeItem("user");

        // Remove task lists from service
        localStorage.removeItem("temp");
    }

    /**
     * Method saves the token and user to the session storage.
     * @param token - Token to save
     * @param user - User to save
     */
    saveToken(token, user, lists) {
        console.log("Saving")
        if (token)  {localStorage.setItem("token", token);}
        if (user)   {localStorage.setItem("user", JSON.stringify(user));}
        if (lists)  {localStorage.setItem("lists", JSON.stringify(lists));}
    }

    /**
     * Method returns the token.
     * @returns {string | null}
     */
    getToken() {
        return localStorage.getItem("token");
    }

    /**
     * Method returns the user.
     * @returns {boolean}
     */
    isAuthenticated() {
        return !!localStorage.getItem("token");
    }

    /**
     * Method returns the user.
     * @returns {string | null}
     */
    getUserId() {
        if (this.isAuthenticated()) {
            return JSON.parse(localStorage.getItem("user")).id;
        }
    }

}
// Export a singleton instance in the same file
export const SessionService = Object.freeze(new Session("http://localhost:5000", "token"));


