const readline = require('readline');
const fs = require('fs');
const { AiReadIt, createProvider } = require('./lib/ai-read-it');


let providerName = 'OpenAI'; 
const providerArgIndex = process.argv.findIndex(arg => arg === '--provider' || arg === '-p');
if (providerArgIndex !== -1 && process.argv.length > providerArgIndex + 1) {
    providerName = process.argv[providerArgIndex + 1];
}
const aiReadItClient = new AiReadIt(createProvider(providerName));


async function convertTextToSpeech(text) {
    try {
 
        const audioBuffer = await aiReadItClient.smallTextToSpeech(text);


        console.log("Audio Buffer Length:", audioBuffer.length);


        console.log("Audio Buffer Length:", audioBuffer.length);


        const saveToFile = await promptUser(
            'Do you want to save the audio to a file? (y/n):',
            ['y', 'n', 'yes', 'no']
        );

        if (['yes', 'y'].includes(saveToFile.toLowerCase())) {

            const filename = await promptUser('Enter a filename (default: demo.mp3):') || 'demo.mp3';


            fs.writeFileSync(filename, audioBuffer);
            console.log(`Audio saved to ${filename}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function promptUser(question, validResponses) {
    return new Promise(async (resolve) => {
        let response;
        do {
            response = await promptUserInt(question);
            response = response.toLowerCase();
        } while (validResponses && !validResponses.includes(response));

        resolve(response);
    });
}

function promptUserInt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question + ' ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}


const exampleText = "Hello, world! This is an example text that will be converted to speech.";

// Call the function with the example text
convertTextToSpeech(exampleText);
