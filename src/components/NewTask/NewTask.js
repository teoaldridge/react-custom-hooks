import Section from '../UI/Section';
import TaskForm from './TaskForm';
//we import useHttp 
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  //we call useHttp here
  //We no longer need to add any parameters, 
  //because of the refactoring work we have already done.
  //we still get back an object which we can destructure:
  //here I rename sendRequest to sendTaskRequest
  const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {

    //we call sendTaskRequest() here, because we want to call this fucntion 
    //every time enterTaskHandler is triggered.
    //We need to make sure we pass in the proper configuration and data handling to sendTaskRequest
    sendTaskRequest(
      {
        url: 'https://react-http-2-23484-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText }
      },
      //we add createTask as a second argument to SendTaskRequest
      //here we add the JS .bind method which helps us to pre-configure a function
      //1st argument we assign to .bind is to set the 'this'keyword in the to-be-used function- 
      //we set it to null here because doesn't matter here.
      //2d argument- has to be the 1st argument, passed to this to-be-called function
      //so here it will be taskText
      createTask.bind(null, taskText)
    );

    //We don't need to work with useCallback or alternatives to it here, 
    //because we are only calling sendTaskRequest in the enterTaskHandler.
    //we don't use useEffect() and therefore we don't have the problem of an infinite loop 

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
