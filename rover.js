
class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110){
   this.position = position;
   this.mode = mode;
   this.generatorWatts = generatorWatts;
  }
 receiveMessage(message) {
    let messageName = message.name;
    let messageCommands = message.commands;
    let finalResults = {
      message: message.name,
      results: []
    }
      for (let i = 0; i < messageCommands.length; i++){
        let completedStatus = {completed: ''}
        if (messageCommands[i].commandType === 'MODE_CHANGE') {
           this.mode = messageCommands[i].value;
            completedStatus.completed = true;
            finalResults.results.push(completedStatus)
        } else if (messageCommands[i].commandType === 'MOVE') {
            if (this.mode === "LOW_POWER") {
              completedStatus.completed = false;
              finalResults.results.push(completedStatus);
            } else {
              this.position = messageCommands[i].value;
              completedStatus.completed = true;
              finalResults.results.push(completedStatus)
            }
        } else if (this.mode === "LOW_POWER" && messageCommands[i].commandType === 'MOVE') {
            
        } else if (messageCommands[i].commandType === 'STATUS_CHECK'){
            let roverStatus = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          } 
            finalResults.results.push({roverStatus});
        }
        
      }
      return finalResults;

  }
}


module.exports = Rover;