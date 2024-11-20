/**
 * taskService.js
 * This service is responsible for managing tasks by communicating with the backend.
 *
 * @author
 */
class TaskListService {
    constructor(url) {
        this.URL = url;
    }

    async createTaskList(taskList) {
        try {
            const res = await fetch(`${this.URL}/api/lists`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json' },
                body: JSON.stringify(taskList),
                credentials: 'include',
            });

            if (res.ok) {
                return await res.json();
            } else {
                console.error('Failed to create task list:', res);
                return null;
            }
        } catch (error) {
            console.error("Error in createTaskList:", error)
            return null;
        }
    }

    async getTaskLists(user) {
        // Get the shared Lists from the db here\
        if (user.sharedLists && user.sharedLists.length > 0) {
            const listIDs = user.sharedLists.join(',');
            let url = `${this.URL}/api/lists?ids=${listIDs}`;
            //console.log(url);
            let listResponse = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            //console.log("List Response", listResponse)            
    
            if (listResponse.ok) {
                let lists = await listResponse.json();
                return lists;
                //console.log("Shared", lists);
            } else {
                console.error("Error fetching shared lists:", listResponse);
                return null;
            }
        }
    }

    async updateTaskList(id, update) {
        try {
            const res = await fetch(`${this.URL}/api/lists/${id}/add`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskID: update }),
                credentials: 'include',
            });

            if (res.ok) {
                return await res.json();
            } else {
                console.error('Failed to update list:', res);
                return null;
            }
        } catch(error) {
            console.log(error);
            return null;
        }
    }

}

export const taskListService = new TaskListService("http://localhost:5000");