/**
 * taskService.js
 * This service is responsible for managing tasks by communicating with the backend.
 *
 * @author
 */
class TaskService {
    constructor(url) {
        this.URL = url;
    }

    /**
     * Fetch all tasks.
     * @returns {Promise<any|null>}
     */
    async getTasks(taskIDs) {
        let url = `${this.URL}/api/tasks?ids=${taskIDs}`;
        console.log("url", url);
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            let tasks = await response.json();
            console.log("Tasks", tasks)
            return tasks;
        } else {
            console.error("No tasks found");
        }
    }

    /**
     * Fetch a single task by ID.
     * @param {string} id - Task ID
     * @returns {Promise<any|null>}
     */
    async getTaskById(id) {
        try {
            const response = await fetch(`${this.URL}/api/tasks/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Failed to fetch task with ID ${id}:`, response);
                return null;
            }
        } catch (error) {
            console.error('Error fetching task by ID:', error);
            return null;
        }
    }

    /**
     * Create a new task.
     * @param {object} task - Task data
     * @returns {Promise<any|null>}
     */
    async createTask(task) {
        try {
            const response = await fetch(`${this.URL}/api/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task),
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed to create task:', response);
                return null;
            }
        } catch (error) {
            console.error('Error creating task:', error);
            return null;
        }
    }

    /**
     * Update an existing task by ID.
     * @param {string} id - Task ID
     * @param {object} taskUpdates - Object containing fields to update
     * @returns {Promise<any|null>}
     */
    async updateTask(id, taskUpdates) {
        try {
            const response = await fetch(`${this.URL}/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskUpdates),
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Failed to update task with ID ${id}:`, response);
                return null;
            }
        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    }

    /**
     * Delete a task by ID.
     * @param {string} id - Task ID
     * @returns {Promise<boolean>}
     */
    async deleteTask(id) {
        try {
            const response = await fetch(`${this.URL}/api/tasks/${id}`, {  // Corrected API URL
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                return true;
            } else {
                console.error(`Failed to delete task with ID ${id}:`, response);
                return false;
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            return false;
        }
    }

    /**
     * Assign a user to a task by task ID.
     * @param {string} id - Task ID
     * @param {string} userId - User ID to assign
     * @returns {Promise<any|null>}
     */
    async assignUserToTask(id, userId) {
        try {
            const response = await fetch(`${this.URL}/api/tasks/${id}/assign`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Failed to assign user to task with ID ${id}:`, response);
                return null;
            }
        } catch (error) {
            console.error('Error assigning user to task:', error);
            return null;
        }
    }
}

export const taskService = new TaskService("http://localhost:5000");
