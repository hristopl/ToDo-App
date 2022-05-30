import { isNil } from "ramda";
import {add} from '../models/todo'

// Todo => [string]

  const {title, description} = todo
  if ([title, description].some(isNil)) {
    return ['Title or discription is Nil!']
  }

  return []
}
const create = todo => {
  const errors = validateTodo(todo)

  if (errors.length > 0) {
    return Promise.reject(new Error(errors.join(' ')))
  }

  return add(todo)
}

export {
  create
}
