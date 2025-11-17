import { connect } from "http2";
import { Server } from "socket.io";


let connections={};
let messages={};
let timeOnline={};

export const connectToSocket = (server) => {
    const io=new Server(server,{    //not for production use
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
        });


    io.on("connection",(socket)=>{
        console.log(`New client connected: ${socket.id}`);

        socket.on("join-call",(path)=>{
            if(connections[path]===undefined){
                connections[path]=[];
            }
            connections[path].push(socket.id);

            timeOnline[socket.id]= new Date();

            for(let a=0;a<connections[path].length;a++){
                io.to(connections[path][a]).emit("user-joined",socket.id,connections[path], messages[path] || []);
            }

            if(messages[path]===undefined){
                for(let a=0;a<connections[path].length;a++){
                    io.to(socket.id).emit("chat-messages", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender']);
                }
            }
        });

        socket.on("signal",(toId, message)=>{
            io.to(toId).emit("signal",socket.id, message);
        });

        socket.on("chat-message",(data, sender)=>{

            const [matchingRoom, found]=Object.entries(connections)
            .reduce(([room, isfound], [roomKey, roomValue])=>{

                if(isfound && roomValue.includes(socket.id)){
                    return [roomKey, true];
                }
                return [room, isfound];
            },['', false]);

            if(found==true){
                if(messages[matchingRoom]===undefined){
                    messages[matchingRoom]=[];
                }
                messages[matchingRoom].push({
                    'sender': sender,
                    'data': data,
                    'socket-id-sender': socket.id
                });
                for(let a=0;a<connections[matchingRoom].length;a++){
                    io.to(connections[matchingRoom][a]).emit("chat-messages", data, sender, socket.id);
                }
            }
        });

        socket.on("disconnect",()=>{

            var diffTime=Math.abs(timeOnline[socket.id]- new Date());

            var key

            for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
                for(let a=0;a<v.length;++a){
                    if(v[a]===socket.id){
                        key=k;

                        for(let a=0;a<connections[key].length;a++){
                            io.to(connections[key][a]).emit("user-left",socket.id);
                        }

                        var index=connections[key].indexOf(socket.id);
                        connections[key].splice(index,1);

                        if(connections[key].length==0){
                            delete connections[key];
                        }
                    }
                }
            }

        });
    });

    return io;
};
