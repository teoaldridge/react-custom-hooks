
import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http'; 

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = ((tasksObj) => {
    const loadedTasks = [];

    for (const taskKey in tasksObj) {
      loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
    }

    setTasks(loadedTasks);
  //we get rid of the dependencies here
  });

  //we delete transformTasks as a parameter of useHttp
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    //we use transformTasks as a second argument for fetchTasks()
    fetchTasks({ url: 'https://react-http-2-23484-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'}, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
