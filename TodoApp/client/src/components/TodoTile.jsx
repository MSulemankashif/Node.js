import React from 'react'

function TodoTile({ todo }) {
    return (
        <div className='list-group-item d-flex align-items-center justify-content-between '>
            <div>
                <h5>{todo.title}</h5>
                <div>{todo.desc}</div>
            </div>

            <div className='d-flex gap-3'>
                <button className='btn btn-sm btn-warning'>Edit</button>
                <button className='btn btn-sm btn-danger'>Delete</button>
            </div>
        </div>
    )
}

export default TodoTile