class Message {
   constructor(messageName, commands) {
     this.name = messageName;
       if (!messageName) {
       throw Error("Message name required.");
   }
   this.commands = commands;
   }

}


module.exports = Message;