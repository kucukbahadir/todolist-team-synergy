# Todolist Project

### Project Overview: **ToDoList with JSON Data Storage**

This project is designed to help interns learn modern web development tools, processes, and teamwork by building a **ToDoList** application. The application will be built using **React** and will follow **GitFlow** processes to teach collaborative development. Users will be able to manage their personal task lists by adding, deleting, and marking tasks as complete. All data will be stored in JSON format, and the application will provide multiple screens to enhance the user experience.

Throughout the project, interns will gain experience in software development processes with collaborative feedback and regular code reviews.

### Milestones Overview:

- **Milestone 1: Frontend**
    - This milestone focuses on building the user interface using React. Interns will create the various screens and functionalities outlined in the project.

- **Milestone 2: Backend**
    - In this milestone, interns will build the backend using a suitable technology stack (e.g., Node.js, Express) to handle data storage, user authentication, and task management.

- **Milestone 3: Connecting Frontend with Backend**
    - During this milestone, the frontend will be connected to the backend through API calls, allowing for dynamic interaction between the user interface and the server.

- **Milestone 4: Testing**
    - The final milestone will involve testing the application to ensure the functionality, performance, and security of both the frontend and backend. This will include unit tests, integration tests, and end-to-end tests.

---

In this repository, we are starting with **Milestone 1**—Frontend development.

# Milestone 1

## Screens:

### **Login Screen:**

- Users will log in by entering a username and access their personalized task lists.
- Login data will be stored in local storage, and after a successful login, the user will be directed to the **ToDoList** screen.

### **ToDoList Screen:**

- On this screen, users will be able to view their tasks, add new tasks, delete existing ones, and mark tasks as completed.
- A task-adding form and a list of current tasks will be presented in a user-friendly interface.

### **Task Detail Screen:**

- Users can view and edit the details of a selected task here.
- Task name, description, due date, and priority level can be modified.

### **Completed Tasks Screen:**

- This screen will display only completed tasks, allowing users to review tasks they have finished.
- The user can see a neatly organized list of completed tasks.

---

### Intern Tasks and Feature Branches:

The project is structured according to **GitFlow** principles. Each intern will work on specific functionalities in separate feature branches. Below are the intern tasks and their respective branches:

### **Intern 1: Task Addition and Deletion Functions**

- **Feature Branch:** `feature/add-task`
    - Create a task-adding form. The user will be able to enter new tasks into the list.
- **Feature Branch:** `feature/delete-task`
    - Add a “Delete” button for each task, allowing users to remove tasks from the list.

### **Intern 2: Task Update and Completion Status**

- **Feature Branch:** `feature/edit-task`
    - Add an “Edit” button for tasks, allowing users to update task information.
- **Feature Branch:** `feature/complete-task`
    - Add a checkbox to control the completion status of tasks. Users will be able to mark tasks as completed.

### **Intern 3: Task Sorting and Filtering**

- **Feature Branch:** `feature/sort-tasks`
    - Implement sorting of tasks based on their creation date. Additionally, tasks can be sorted by other criteria as requested by the user.
- **Feature Branch:** `feature/filter-tasks`
    - Provide filtering options for completed and incomplete tasks.

### **Intern 4: Task Storage in Local Storage and Priority Level**

- **Feature Branch:** `feature/local-storage`
    - Store tasks in local storage so that they are not lost when the session ends.
- **Feature Branch:** `feature/priority-tasks`
    - Add a “priority” level for tasks, allowing users to assign a priority when adding tasks.

### **Intern 5: User-Specific Task List and Due Date Management**

- **Feature Branch:** `feature/user-tasks`
    - Maintain separate task lists for different users, so each user can only see the tasks they have added.
- **Feature Branch:** `feature/due-date-tasks`
    - Add a due date feature to tasks. Tasks past their due date will be highlighted in red for easy visibility.

---

# Rules and Requirements

### GitFlow Explanation:

The **GitFlow** model will be used during the project development process. GitFlow is a branch management strategy that makes the software development process more organized and collaborative. The main flow of the project will proceed through the following branches and processes:

### **master/main Branch:**

The **master** branch always contains stable code, and pushing directly to this branch is not allowed. Only approved code from the release branch is merged into **master**.

### **develop Branch:**

The **develop** branch is where all development work is consolidated. Interns will develop features in their own feature branches and, after a code review, the feature will be merged into the **develop** branch via a pull request (PR). This branch represents the latest development version of the project.

### **feature Branches:**

Each new feature is developed in a separate feature branch. Interns create their own **feature branch**, appropriately named according to the functionality being worked on. Once development is complete, the code is reviewed by another intern and merged into the **develop** branch via a PR.

### **release Branches:**

Once a stable version of the project is ready, a **release branch** is created. After final tests and minor fixes, this branch is merged into **master**.

### **hotfix Branches:**

These branches are created to address urgent bugs found in the **master** branch. Hotfix branches are merged directly into **master**, and the changes are also integrated into **develop**.

---

### Steps in the GitFlow Process:

1. Each intern creates a **feature branch** for the functionality they are working on.
    - For example, if an intern is working on a "Task Adding" feature, they will create a branch named `feature/add-task`.
    - The intern writes code and, once the feature is complete, they open a **pull request (PR)** to merge the feature into the **develop** branch.
2. **Code Review:**
    - Another intern reviews the PR. During the review, they check:
        - Code correctness,
        - Best practices,
        - Code readability and performance.
    - The reviewing intern provides feedback if necessary, and the developer makes adjustments accordingly.
    - Once the code review is complete and approved, the feature branch is merged into the **develop** branch.
    - The code in the **develop** branch is tested for stability and then merged into the **release** branch.
    - After final adjustments in the **release** branch, it is merged into **master**.
    - **Directly pushing code to the master branch is strictly prohibited.** All code must go through the above processes before being merged into **master**.

---

### Daily Workflow for Interns:

### **Daily Stand-ups (Each 15 min):**

Interns will participate in daily stand-up meetings twice a day (for example, morning and afternoon).

- **Morning meeting:** Each intern shares what they did the previous day, what they plan to do that day, and any blockers they are facing.
- **Afternoon meeting:** The day's progress is evaluated, challenges are reviewed, and progress is tracked twice a day to ensure continuous development.

### **Code Refinement:**

There will be at least two **refinement** meetings per week where:

- Everyone discusses the tasks they are working on in detail,
- They assess how tasks might affect each other,
- They evaluate how they can benefit from or avoid conflicts with other tasks,
- Task scope might be updated, or workload may be restructured if necessary.

---

### Expectations for Daily Progress and Commit Policy:

1. Interns must make daily progress and reflect it in their code.
2. **At least several commits per day** are required. Commits should not be limited to the end of the day; rather, they should be made regularly throughout the day as progress is made.
3. **Each commit should begin with the ID of the Notion task**, followed by an informative commit message.
4. A single commit at the end of development is unacceptable. The goal is to track the project’s progress step by step.
5. Even if the code is incomplete or not fully functional, progress should still be committed. This allows for easier debugging and the ability to revert to previous stages if necessary.

---

---

### Pull Request and Code Review Process:

For this project, **each intern is required to submit at least 2 pull requests**, and each pull request must be reviewed by at least one other intern. The pull request and review process will follow these steps:

### **1. Write and Commit Your Code:**

- Each intern must work on their assigned feature in their **feature branch**.
- You must make **multiple commits** every day. This shows your progress throughout the day.
- Commit messages should be clear and meaningful.
- Even if the code is not fully functional, commit your progress frequently to your feature branch.
- If you face issues, document these in the **Notion task comments**. Don’t forget to add details about how you resolved the issue.

### **2. Merge the Develop Branch into Your Feature Branch:**

- Before opening a pull request, merge the **develop** branch into your feature branch.
- This ensures that you're working with the latest code and helps avoid conflicts before creating the PR.
- **Resolving conflicts is your responsibility.** You can request help from teammates or use **AI** tools, and you should document this process in the **Notion task**.

### **3. Create a Pull Request:**

- Once you're finished with your feature, create a **pull request**.
- Add the **PR link as a comment** on the corresponding **Notion task**.
- In the team’s Slack group (where your mentor is also present), share your PR by asking, **"Can someone review my pull request?"** Don’t forget to include a link to the **Notion task** in your message.

### **4. Code Review:**

- Another intern will review your PR. During the review, they will check:
    - Code correctness,
    - Adherence to best practices,
    - Code readability and performance.
- The reviewer will leave feedback directly on the PR.
- If there are issues, the PR author will address them and then ask for a new review by writing in the same **Slack channel**.
- This process continues until the PR is approved. A different intern may also review the updated code.
- Once the review is complete, the reviewer should reply to the original Slack message with **"Review completed."**

### **5. Merging the Pull Request:**

- Once the PR is **approved**, the author merges the PR into the **develop** branch.
- Both the **author** and **reviewer** must check that the code works properly after it is merged into the **develop** branch.
- If the code does not work as expected after being merged into **develop**, **both the author and reviewer are responsible** for fixing the issues.

---

### Daily Workflow:

### **1. Commit and Push:**

- You must make **multiple commits** and **push** your changes every day. This is required so that your progress can be tracked transparently.
- Commit messages should clearly describe what you’ve done at each stage.
- If you encounter issues, document them in **Notion task comments**. You can seek help from teammates or **AI tools**. Don't forget to document how you resolved the problem.

### **2. Merging Develop into Your Feature Branch Before a PR:**

- Before creating a pull request, merge the **develop** branch into your feature branch and resolve any conflicts.
- **Resolving conflicts is your responsibility**, and a PR should not be opened with unresolved conflicts.

### **3. Pull Request and Review Process:**

- After creating a PR, **add the PR link as a comment** on the **Notion task**.
- Then, share the PR in the Slack group and ask for a review by attaching the **Notion task link**.
- When you find a reviewer, they should leave feedback on the PR, and also reply to your Slack message with **"Review completed."**
- If there are problems, the PR author must fix them and ask for another review in the same Slack thread.
- This process continues until the code is properly reviewed.

### **4. Merging the Code:**

- Once the code is **approved**, the PR author merges the code into the **develop** branch.
- After merging, both the PR author and the reviewer should check that the code works correctly in the **develop** branch. If issues arise, **both are responsible** for fixing them.

---

### Process Monitoring and Grading:

Following these processes closely will directly impact your performance during the internship. The mentor will evaluate your performance **weekly**, giving a score out of 10. At the end of the internship, these scores will determine whether you successfully complete the internship.

### **Grading Criteria:**

1. **Writing code and committing/pushing daily**: Regular commits showing your progress are important.
2. **Reviewing another intern’s code**: Reviewing your teammates' code and providing feedback is essential for improving code quality.
3. **Notifying and explaining to those who do not follow the process**: If your teammates are not following the process, politely remind them and show them the proper way.

Meeting these criteria is crucial to successfully completing the internship. Interns who do not follow the processes will be warned by the mentor and given feedback on how to improve.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
