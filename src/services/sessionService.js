export class sessionService {

    RESOURCES_URL;
    BROWSER_STORAGE_ITEM_NAME;

    constructor(resourcesUrl, browserStorageItemName) {
        this.BROWSER_STORAGE_ITEM_NAME = browserStorageItemName;
        this.RESOURCES_URL = resourcesUrl;

        this.getTokenFromBrowserStorage();
    }

    async asyncSignIn(email, password) {
        const body = JSON.stringify({email: email, password: password})
        let req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            credentials: 'include',
        }

        let response = await fetch(this.RESOURCES_URL + "/loginForm", req);

        if (response.ok) {
            let user = await response.json();
            this.saveTokenIntoBrowserStorage(
                response.headers.get('Authorization'),
                user
            );
            return user;
        } else {
            console.log(response)
            return null;
        }
    }


    async asyncRegister(email, username, password) {
        const body = JSON.stringify({email: email, username: username, password: password})
        let req = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
            credentials: 'include',
        }

        let response = await fetch(this.RESOURCES_URL + "/register", req);

        if (response.ok) {
            let user = await response.json();
            this.saveTokenIntoBrowserStorage(
                response.headers.get('Authorization'),
                user
            );
            return user;
        } else {
            console.log(response)
            return null;
        }
    }
    async updateUserProfile(userId, updatedProfile) {
        const url = `${this.RESOURCES_URL}/api/users/${userId}/profile`;

        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.getCurrentToken()
                },
                body: JSON.stringify(updatedProfile),
                credentials: 'include',
            });

            if (response.ok) {
                let updatedUser = await response.json();
                this.saveTokenIntoBrowserStorage(this.getCurrentToken(), updatedUser);
                return updatedUser;
            } else {
                console.log('Profile update failed:', response.status, response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            return null;
        }
    }

    signOut() {
        // Remove token from service
        window.sessionStorage.removeItem("token");
        // Remove user from service
        window.sessionStorage.removeItem("user");
    }

    saveTokenIntoBrowserStorage(token, user) {
        window.sessionStorage.setItem("token", token);
        window.sessionStorage.setItem("user", JSON.stringify(user));
    }

    getTokenFromBrowserStorage() {
        console.log("SessionSbService recovered token: ", window.sessionStorage.getItem("token"))
    }

    getCurrentToken() {
        return window.sessionStorage.getItem("token");
    }

    isAuthenticated() {
        return !!window.sessionStorage.getItem("token");
    }

    getUserFromBrowserStorage() {
        if (this.isAuthenticated()) {
            return window.sessionStorage.getItem("user");
        }
    }

    getUserId() {
        if (this.isAuthenticated()) {
            return JSON.parse(window.sessionStorage.getItem("user")).id;
        }
    }
}