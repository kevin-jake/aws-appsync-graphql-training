Object.defineProperty(exports,"__esModule",{value:true})
exports.deleteSensorValue=exports.updateTodo=exports.createTodo=void 0
var createTodo="\n  mutation CreateTodo(\n    $input: CreateTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    createTodo(input: $input, condition: $condition) {\n      id\n      voltage\n      current\n      power\n      createdAt\n      updatedAt\n    type\n    }\n  }\n"
exports.createTodo=createTodo
var updateTodo="\n  mutation UpdateTodo(\n    $input: UpdateTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n    updateTodo(input: $input, condition: $condition) {\n      id\n      voltage\n      current\n      power\n      createdAt\n      updatedAt\n    type\n    }\n  }\n"
exports.updateTodo=updateTodo
var deleteTodo="\n  mutation DeleteTodo(\n    $input: DeleteTodoInput!\n    $condition: ModelTodoConditionInput\n  ) {\n      id\n      voltage\n      current\n      power\n      createdAt\n      updatedAt\n    type\n    }\n  }\n"
exports.deleteTodo=deleteTodo