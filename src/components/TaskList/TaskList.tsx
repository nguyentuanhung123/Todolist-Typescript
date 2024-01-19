import { useState } from 'react'
import PropTypes from 'prop-types';

import { Todo } from '../../@types/todo.type'
import { TodoTypes } from '../../PropTypes/todo.proptype';

import styles from './taskList.module.scss'


// Phải thêm đoạn bên dưới khi truyền props ( ? -> có cũng được , không có cũng được)


interface TaskListProps {
    doneTaskList?: boolean
    todos: Todo[]
    handleDoneTodo: (id: string, done: boolean) => void
    startEditTodo: (id: string) => void
    deleteTodo: (id: string) => void
}



export default function TaskList(props: TaskListProps) {

    const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props;

    // const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     handleDoneTodo(idTodo, event.target.checked)
    // }

    // onChange(onChangeCheckbox(todo.id))


    return (
        <div className='mb-2'>
            <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
            <div className={styles.tasks}>
                {
                    todos.map((todo) => {
                        return (
                            <div className={styles.task} key={todo.id}>
                                <input type='checkbox' className={styles.taskCheckbox} checked={todo.done}
                                    onChange={(event) => handleDoneTodo(todo.id, event.target.checked)} />
                                <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
                                <div className={styles.taskActions}>
                                    <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>🖊️</button>
                                    <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>✖️</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

TaskList.propTypes = {
    doneTaskList: PropTypes.bool, //loại có cũng cũng được không có cũng được không cần có reqired
    todos: PropTypes.arrayOf(
        TodoTypes
    ),
    handleDoneTodo: PropTypes.func,
    startEditTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
}
