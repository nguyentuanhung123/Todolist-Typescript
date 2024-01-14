import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

// Nếu ta không truyền gì từ thằng cha xuống thằng con thì sẽ mặc định là undifined => false
// Nếu có doneTaskList thì sẽ mặc định là true ( doneTaskList  = {false} )


export default function TodoList() {
    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput />
                <TaskList />
                <TaskList doneTaskList />
            </div>
        </div>
    )
}