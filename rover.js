
class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110){
   this.position = position;
   this.mode = mode;
   this.generatorWatts = generatorWatts;
  }
 receiveMessage(message) {
    let messageName = message.name;
    let messageCommands = message.commands;
    let completedStatus = {completed: false};
    let finalResultsArray = [];
    let statusChecked = false;
      for (let i = 0; i < messageCommands.length; i++){
        if (messageCommands[i].commandType === 'MODE_CHANGE') {
          this.mode = messageCommands[i].value;
          completedStatus.completed = true;
          finalResultsArray.push(completedStatus);
        } else if (messageCommands[i].commandType === 'STATUS_CHECK'){
          completedStatus.completed = true;
          statusChecked = true;          
        } else if (messageCommands[i].commandType === 'MOVE' && this.mode === "NORMAL") {
          this.position = messageCommands[i].value;
          completedStatus.completed = true;
          finalResultsArray.push(completedStatus.completed)
        } else if (messageCommands[i].commandType === 'MOVE' && this.mode === "LOW_POWER") {
          completedStatus.completed = false;
          finalResultsArray.push(completedStatus);
        }
      }
      let roverStatusReport = {
          completed: completedStatus.completed,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        }

      if (statusChecked) {
        
        finalResultsArray.push(roverStatusReport)
      }
      
    return {message: messageName, results: finalResultsArray};
  }
}


module.exports = Rover;