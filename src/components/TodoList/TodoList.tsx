import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'

import { Todo } from '../../@types/todo.type';
import { useEffect, useState } from 'react';

// Nếu ta không truyền gì từ thằng cha xuống thằng con thì sẽ mặc định là undifined => false
// Nếu có doneTaskList thì sẽ mặc định là true ( doneTaskList  = {false} )

// Bài 112 : Tạo thư mục mới là @types

// interface HandleNewTodos {
//     (todos: Todo[]): Todo[]
// }

type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]') // use the JavaScript function JSON.parse() to convert text into a JavaScript object (todosString maybe is null)
    const newTodosObj = handleNewTodos(todosObj);
    localStorage.setItem('todos', JSON.stringify(newTodosObj)) // when sending data to a web server, the data has to be a string. Convert a JavaScript object into a string with JSON.stringify().
}

export default function TodoList() {

    const [todos, setTodos] = useState<Todo[]>([]);

    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)  // đang ở chế độ Add nên xét là null

    const doneTodos = todos.filter((todo) => todo.done);

    const notdoneTodos = todos.filter((todo) => !todo.done);

    useEffect(() => {
        const todosString = localStorage.getItem('todos');
        const todosObj: Todo[] = JSON.parse(todosString || '[]')
        setTodos(todosObj)
    }, [])

    const addTodo = (name: string) => {

        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString()
        }
        //save to RAM and show in Browser
        //setTodos((prev) => [...prev, todo])

        const handleAdd = (todosObj: Todo[]) => {
            return [...todosObj, todo]
        }

        setTodos(handleAdd)
        syncReactToLocal(handleAdd)

        //Short hand
        //syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])

    }

    const handleDoneTodo = (id: string, done: boolean) => {
        // const newTodos = todos.map((todo) => {
        //     if (todo.id === id) return { ...todo, done }
        //     return todo
        // })
        // setTodos(newTodos)
        // localStorage.setItem('todos', JSON.stringify(newTodos))
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === id) return { ...todo, done }
                return todo
            })
        }
        setTodos(handler);
        syncReactToLocal(handler);
    }

    //Phải để trong if để đúng về mặt logic
    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id);
        //do findedTodo có kiểu dữ liệu là Todo hoặc undifined nên nếu chỉ để setCurrentTodo(findedTodo) sẽ không đúng do currentTodo có kiểu dữ liệu là Todo hoặc null
        if (findedTodo) {
            setCurrentTodo(findedTodo);//ta phải để findedTodo trong if để findedTodo lúc nào cũng sẽ có giá trị => đảm bảo về mặt typescript
        }
    }

    //do ta chỉ change mỗi name nên cập nhật mỗi name
    //do currentTodo có thể là Todo hoặc null nên phải có if
    //phải có hàm này để ta có thể tự do chỉnh sửa input nếu không sẽ chỉ có current.name trên input
    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, name }
            return null
        })

        //đoạn code bên dưới bị lỗi do prev có thể là null , nếu ta để ... => lỗi => ta phỉa sử dụng đoạn code bên trên
        //setCurrentTodo((prev) => ({...prev,name}))
    }

    //change state tổng và setCurrentodo là null
    const finishEditTodo = () => {
        // setTodos((prev) => {
        //     return prev.map((todo) => {
        //         //phải có dấu ? vì currentTodo có trường hợp currentTodo là null (hoặc để (currentTodo as Todo).id) => return currentTodo as Todo
        //         if (todo.id === currentTodo?.id) {
        //             return currentTodo
        //         }
        //         return todo
        //     })
        // })
        const handleEdit = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                //phải có dấu ? vì currentTodo có trường hợp currentTodo là null (hoặc để (currentTodo as Todo).id) => return currentTodo as Todo
                // node : sau khi ta viết xong currentTodo.id ta phải gõ Enter để nó tự có thể thêm dấu ?
                if (todo.id === currentTodo?.id) {
                    return currentTodo
                }
                return todo
            })
        }
        setTodos(handleEdit);
        setCurrentTodo(null);
        syncReactToLocal(handleEdit)
    }

    const deleteTodo = (id: string) => {
        // bug nhỏ
        // Chúng ta đang có input do bấm edit
        // Khi delete item đó thì data của item vẫn còn trên input
        // Ta muốn khi delete thì ở trên input cũng mất
        if (currentTodo) {
            setCurrentTodo(null)
        }
        // setTodos((prev) => {
        //     const findIndexTodo = prev.findIndex((todo) => todo.id === id)
        //     if (findIndexTodo > -1) {
        //         const result = [...prev]
        //         result.splice(findIndexTodo, 1)
        //         return result;
        //     }
        //     return prev
        // })
        const handleDelete = (todosObj: Todo[]) => {
            const findIndexTodo = todosObj.findIndex((todo) => todo.id === id)
            if (findIndexTodo > -1) {
                const result = [...todosObj]
                result.splice(findIndexTodo, 1)
                return result;
            }
            return todosObj
        }
        setTodos(handleDelete);
        syncReactToLocal(handleDelete)
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