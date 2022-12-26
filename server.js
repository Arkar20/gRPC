import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

const packageDef=protoLoader.loadSync("todo.proto",{});

const grpcObject=grpc.loadPackageDefinition(packageDef)

const todoPackage=grpcObject.todoPackage;

const server=new grpc.Server();

let todos=[];

server.bindAsync('0.0.0.0:4000',grpc.ServerCredentials.createInsecure(),()=>{
    console.log('running on 0.0.0.0:4000')
    server.start();
})

const createTodo=(call,callback)=>{
    todos=[...todos,call.request]
   
    callback(null, call.request);
}

const readTodos=(call,callback)=>{
    console.log('reading todos')
    console.log(todos)
    callback(null,{'items':todos})
}
const readTodosStream=(call,callback)=>{
  todos.forEach(t=>call.write(t))
  call.end();
}

server.addService(todoPackage.Todo.service,{
"createTodo":createTodo,
"readTodos":readTodos,
"readTodosStream":readTodosStream,
})



