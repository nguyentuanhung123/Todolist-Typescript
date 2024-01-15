import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'

// gõ nhanh h1.{styles.title}
// Thêm icon từ window với cú pháp là : window + ';'

interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  currentTodo: Todo | null
}

export default function TaskInput(props: TaskInputProps) {

  const { addTodo, currentTodo, editTodo, finishEditTodo } = props

  const [name, setName] = useState<string>('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentTodo) {
      finishEditTodo()

      // bug nhỏ
      // input đang có giá trị mà chúng ta bấm edit ở List thì nó hiển thị current.name cần chỉnh sửa
      // Khi chúng ta edit xong bấm Enter thì giá trị input mà chúng ta đang nhập dở sẽ được hiển thị lại
      // Ta muốn khi edit xong thì thanh input phải rỗng
      if (name) setName('')
    } else {
      addTodo(name);
      setName('');
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput} />
        <button type='submit'>
          {
            currentTodo ? '✔️' : '➕'
          }
        </button>
      </form>
    </div>
  )
}
