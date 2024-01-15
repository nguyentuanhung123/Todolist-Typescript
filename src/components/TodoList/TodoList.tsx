import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

import { Todo } from '../../@types/todo.type';
import { useState } from 'react';

// Nếu ta không truyền gì từ thằng cha xuống thằng con thì sẽ mặc định là undifined => false
// Nếu có doneTaskList thì sẽ mặc định là true ( doneTaskList  = {false} )

// Bài 112 : Tạo thư mục mới là @types

export default function TodoList() {

    const [todos, setTodos] = useState<Todo[]>([]);

    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)  // đang ở chế độ Add nên xét là null

    const doneTodos = todos.filter((todo) => todo.done);

    const notdoneTodos = todos.filter((todo) => !todo.done);

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        setTodos((prev) => [...prev, todo])
    }

    const handleDoneTodo = (id: string, done: boolean) => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return todo
            })
        })
    }

    //Phải để trong if để đúng về mặt logic
    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id);
        if (findedTodo) {
            setCurrentTodo(findedTodo);
        }
    }

    //do currentTodo có thể là Todo hoặc null nên phải có if
    //phải có hàm này để ta có thể tự do chỉnh sửa input nếu không sẽ chỉ có current.name trên input
    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, name }
            return null
        })
    }

    const finishEditTodo = () => {
        setTodos((prev) => {
            return prev.map((todo) => {
                //phải có dấu ? vì currentTodo có trường hợp currentTodo là null (hoặc để (currentTodo as Todo).id) => return currentTodo as Todo
                if (todo.id === currentTodo?.id) {
                    return currentTodo
                }
                return todo
            })
        })
        setCurrentTodo(null)
    }

    const deleteTodo = (id: string) => {
        // bug nhỏ
        // Chúng ta đang có input do bấm edit
        // Khi delete item đó thì data của item vẫn còn trên input
        // Ta muốn khi delete thì ở trên input cũng mất
        if (currentTodo) {
            setCurrentTodo(null)
        }
        setTodos((prev) => {
            const findIndexTodo = prev.findIndex((todo) => todo.id === id)
            if (findIndexTodo > -1) {
                const result = [...prev]
                result.splice(findIndexTodo, 1)
                return result;
            }
            return prev
        })
    }


    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
                <TaskList todos={notdoneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
                <TaskList doneTaskList todos={doneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
            </div>
        </div>
    )
}
