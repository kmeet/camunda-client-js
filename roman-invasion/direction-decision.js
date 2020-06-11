const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Workflow Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);
const processVariables = new Variables();

// susbscribe to the topic: 'DecideOnRomanExpansion'
client.subscribe("DecideOnRomanExpansion", async function ({ task, taskService }) {
    // Put your business logic
    var north = Math.random() >= 0.5;
    console.log(north);
    processVariables.set("north", north);
    // complete the task
    await taskService.complete(task, processVariables);
});