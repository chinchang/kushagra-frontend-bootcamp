import { useState, useEffect } from "react";
import "/src/index.css";
import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUaDj0wftUqiMTXWvR_Sk1xZxxkrfzGog",
  authDomain: "bootcamp-todo-app-82dd5.firebaseapp.com",
  projectId: "bootcamp-todo-app-82dd5",
  storageBucket: "bootcamp-todo-app-82dd5.firebasestorage.app",
  messagingSenderId: "833192370090",
  appId: "1:833192370090:web:6288ec2f6f6855138a15d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

const TASKS_COLLECTION = "tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          console.log("Successfully signed in", result.user);
          setUser(result.user);
          // You can access the new user by importing getAdditionalUserInfo
          // and calling it with result:
          // getAdditionalUserInfo(result)
          // You can access the user's profile via:
          // getAdditionalUserInfo(result)?.profile
          // You can check if the user is new or existing:
          // getAdditionalUserInfo(result)?.isNewUser
        })
        .catch((error) => {
          alert(error.message);
        });
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        setUser(null);
      }
    });
  }, []);

  async function addTaskToDatabase(task) {
    // add the `task` to `tasks` firestore db
    const tasksCollection = collection(db, TASKS_COLLECTION);
    console.log(99);
    try {
      await setDoc(doc(tasksCollection, task.id), task);
      setMessage("Task added successfully!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log("error", error);
      alert("Task could not be added. Try again later.");
    }
  }
  function handleAddTask(event) {
    event.preventDefault();

    // update the state
    let newTask = {
      id: Math.random().toString(36).substring(2, 9),
      title: taskTitle,
      isCompleted: false,
      userId: user.uid,
      // randomKey:
      // "nsaiodnasodnasiodnioasnd oiasndio nasiod nasiodn iaosndioasn dioasnd ionasdoina siodnaoisni aosndioasndionasdoinasiodnasiondioasndioasndioasndioasndoiasnd",
    };

    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);

    addTaskToDatabase(newTask);
  }

  function handleTaskInput(event) {
    setTaskTitle(event.target.value);
  }

  async function fetchTasks() {
    // fetch the Todos from API, when initializing the app
    try {
      // read tasks from `tasks` firestore collection
      const tasksCollection = collection(db, TASKS_COLLECTION);

      console.log("current user", user);
      const q = query(tasksCollection, where("userId", "==", user.uid));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => doc.data());

      console.log("data from DB", data);
      // state being updated
      setTasks(data);
      console.log("tasks in the state", tasks);
    } catch (e) {
      console.log(e);
    }
  }

  // effect for onMounted lifecycle hook
  useEffect(() => {
    console.log("effect called");
    if (user) {
      fetchTasks();
    }
  }, [user]);

  function handleRemoveTask(documentId) {
    deleteDoc(doc(db, TASKS_COLLECTION, documentId));
    const newTasks = tasks.filter((task) => task.id !== documentId);

    setTasks(newTasks);
  }

  let feedback = "";
  if (message) {
    feedback = <p>{message}</p>;
  }

  return (
    <>
      <header>
        <h1>Best TODO Apppppp</h1>
      </header>

      {feedback}

      {user ? (
        <Todo
          tasks={tasks}
          handleAddTask={handleAddTask}
          handleRemoveTask={handleRemoveTask}
          handleTaskInput={handleTaskInput}
          taskTitle={taskTitle}
        />
      ) : (
        <Login />
      )}
    </>
  );
}

function Todo({
  tasks,
  handleAddTask,
  handleRemoveTask,
  handleTaskInput,
  taskTitle,
}) {
  return (
    <>
      <form>
        <input
          type="text"
          className="input"
          value={taskTitle}
          onInput={handleTaskInput}
        />
        <button onClick={handleAddTask}>Add task</button>
      </form>

      <ol id="js-task-list">
        {tasks.map(function (task) {
          return (
            <li key={task.id}>
              <label>
                <input type="checkbox" />
                {task.title}
              </label>

              <button
                type="button"
                onClick={() => {
                  handleRemoveTask(task.id);
                }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function Login() {
  const [email, setEmail] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:5173",
      // This must be true.
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        alert("Email sent, check your inbox");
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
      });
  }

  return (
    <section>
      <h2>Please login to continue</h2>

      <form onSubmit={submitHandler}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button>Login</button>
        </label>
      </form>
    </section>
  );
}

export default App;
