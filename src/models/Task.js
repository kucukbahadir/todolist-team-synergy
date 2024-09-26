class Task {
    taskName;
    taskDescription;
    taskDone;

    // Why no overload :cry:
    /*constructor(name, description) {
        this.taskName = name;
        this.taskDescription = description;
        this.taskDone = false;
    }*/

    constructor(name, description, done) {
        this.taskName = name;
        this.taskDescription = description;
        this.taskDone = done;
    }

    setDescription(description) {
        this.taskDescription = description;
    }

    setDone() {
        this.taskDone = true;
    }

    toJSON() {
        return JSON.stringify(this);
    }

    static fromJSON(string) {
        //let newTask = {...JSON.parse(string)};
        const parsedString = JSON.parse(string);
        const newTask = new Task(parsedString.taskName, parsedString.taskDescription, parsedString.taskDone);
        return newTask;
    }
}

module.exports = Task