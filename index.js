// Handle user interactive
import readline from 'readline';
import inputHandling from './inputHandling.js'

const rdLe = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rdLe.setPrompt('$ ');

// Always waiting user input
rdLe.on('line', (input) => {
    if(input === "quit"){
        rdLe.close();
        process.exit(1);
    }
    console.log('');
    inputHandling(input);
    console.log('');
    rdLe.prompt();
});

// Welcome to Ruri ATM
console.log('                                                        ');
console.log('                                                   ');
console.log('   Welcome to the Ruri ATM.                        ');
console.log('                                                   ');
console.log('                                                        ');
console.log('');

rdLe.prompt();