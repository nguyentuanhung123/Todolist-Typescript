import styles from './taskList.module.scss'

// Phải thêm đoạn bên dưới khi truyền props ( ? -> có cũng được , không có cũng được)
interface TaskListProps {
    doneTaskList?: boolean
}

export default function TaskList(props: TaskListProps) {

    const { doneTaskList } = props

    return (
        <div className='mb-2'>
            <h2 className={styles.title}>
                {
                    doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'
                }
            </h2>
            <div className={styles.tasks}>
                <div className={styles.task}>
                    <input type='checkbox' className={styles.taskCheckbox} />
                    <span className={styles.taskName}>Học bài</span>
                    <div className={styles.taskActions}>
                        <button className={styles.taskBtn}>🖊️</button>
                        <button className={styles.taskBtn}>✖️</button>
                    </div>
                </div>
                <div className={styles.task}>
                    <input type='checkbox' className={styles.taskCheckbox} />
                    <span className={`${styles.taskName} ${styles.taskNameDone}`}>Học bài</span>
                    <div className={styles.taskActions}>
                        <button className={styles.taskBtn}>🖊️</button>
                        <button className={styles.taskBtn}>✖️</button>
                    </div>
                </div>
            </div>
        </div>
    )
}