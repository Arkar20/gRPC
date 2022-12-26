import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

const packageDef=protoLoader.loadSync("todo.proto",{});

const grpcObject=grpc.loadPackageDefinition(packageDef)

const todoPackage=grpcObject.todoPackage;

const client=new todoPackage.Todo("0.0.0.0:4000",grpc.credentials.createInsecure());
client.createTodo({
    "id":1,
    "text":'hello'
},
    (err,res)=>{
        if(err){
            console.log(err)
        }
        console.log('success')
        console.log(res)
    }
);

client.readTodos(null,(err,res)=>{
    console.log(res)
})

const call=client.readTodosStream()
call.on("data",item=>{
    console.log('from server recieved',item)
})

call.on('end',()=>{
    console.log('streaming done')
})