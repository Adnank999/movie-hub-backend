
let io; 

export const setIo = (serverIo) => {
  io = serverIo;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

