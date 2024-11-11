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
    async getAllTasks() {
        try {
            const response = await fetch(`${this.URL}/tasks`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error('Failed to fetch tasks:', response);
                return null;
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return null;
        }
    }

    /**
     * Fetch a single task by ID.
     * @param {string} id - Task ID
     * @returns {Promise<any|null>}
     */
    async getTaskById(id) {
        try {
            const response = await fetch(`${this.URL}/tasks/${id}`, {
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
    
}
export const taskService = new TaskService("http://localhost:5000");