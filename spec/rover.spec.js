const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let message = new Message("New Message", ["MOVE", 20])
    let rover = new Rover(1234)
    expect(rover.position).toEqual(1234);
    expect(typeof rover.mode).toEqual("string");
    expect(typeof rover.generatorWatts).toEqual("number");
  });

  it("response returned by receiveMessage contains name of message", function() {
    let message = new Message("New Message", ["MOVE", 20])
    let rover = new Rover(1234);
    let roverMsg = rover.receiveMessage(message);
    
    expect(roverMsg.message).toEqual(message.name);
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(1234)
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message("New Message!", commands);

    expect(rover.receiveMessage(message).results.length).toEqual(2)
   
  });

  it("responds correctly to status check command", function() {
    let rover = new Rover(1234)
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("New Message!", commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
  }
  );

   it("responds correctly to mode change command", function() {
    let rover = new Rover(1234);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message("New Message!", commands) 
    let beforeModeChangeRoverMode = rover.mode
    rover.receiveMessage(message);
    let afterModeChangeRoverMode = rover.mode
    let response = rover.receiveMessage(message)
    expect(response.results[0].completed).toBeTrue()
    expect(beforeModeChangeRoverMode === afterModeChangeRoverMode).toBeFalse();
  });

 it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(1234, "LOW_POWER", 50);
    let command = [new Command('MOVE', 20)];
    let message = new Message("New Message!", command);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeFalse();
  });

  it("responds with position for move command", function() {
    let rover = new Rover(1234);
    let command = [new Command('MOVE', 20), new Command('STATUS_CHECK')];
    let message = new Message("New Message!", command);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.position).toEqual(20);
  });


});
