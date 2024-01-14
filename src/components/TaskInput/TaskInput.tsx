import styles from './taskInput.module.scss'

// gõ nhanh h1.{styles.title}
// Thêm icon từ window với cú pháp là : window + ';' 

export default function TaskInput() {
    return (
        <div className='mb-2'>
            <h1 className={styles.title}>To do list typescript</h1>
            <form className={styles.form}>
                <input type="text" placeholder='cation goes here' />
                <button type='submit'>➕</button>
            </form>
        </div>
    )
}