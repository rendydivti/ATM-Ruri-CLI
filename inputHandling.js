// import classes
import CoreClass from './class/ATMClass.js';
import MessageHandlerClass from './class/MessageHandlerClass.js';

const messageHandler = new MessageHandlerClass();
let isSessionActive = false;

// handle Input Function
const inputHandling = (input)  => {

    const [command, ...args] = input.trim().split(' ');

    try {
      switch (command) {
          case 'login' || 'Login':
              let name = args[0];
          
              if (isSessionActive && name) {
                  console.log(messageHandler.otherInfo(90001));
              } else if (name) {
                  console.log(messageHandler.login(name));
              } else {
                  console.log(messageHandler.otherInfo(90002));
              }
  
              isSessionActive = name ? true : false;
  
          break;
          case 'deposit' || 'Deposit':
              const amount = Number(args[0]);
              if (isSessionActive && amount) {
                  console.log(messageHandler.deposit(amount));
              } else if (!isSessionActive) {
                  console.log(messageHandler.otherInfo(90003));
              } else {
                  console.log(messageHandler.otherInfo(90004));
              }
  
          break;
          case 'withdraw' || 'Withdraw':
              const withdrawAmount = Number(args[0]);
              if (isSessionActive && withdrawAmount) {
                  try {
                    console.log(messageHandler.withdraw(withdrawAmount));
                  } catch (error) {
                    console.log(error.message);
                  }
              } else if (!isSessionActive) {
                  console.log(messageHandler.otherInfo(90005));
              } else {
                  console.log(messageHandler.otherInfo(90004));
              }
  
          break;
          case 'transfer' || 'Transfer':
              const targetName = args[0];
              const transferAmount = args[1];
              if (isSessionActive && targetName && transferAmount) {
                  try {
                      const target = new CoreClass(targetName);
                      console.log(messageHandler.transfer(target, Number(transferAmount)));
                  } catch (error) {
                    console.log(error.message);
                  }
              } else if (!isSessionActive) {
                  console.log(messageHandler.otherInfo(90006));
              } else {
                  console.log(messageHandler.otherInfo(90007));
              }
  
          break;
          case 'check' || 'Check':
              if (isSessionActive) {
                  console.log(messageHandler.check());
              } else {
                  console.log(messageHandler.otherInfo(90008));
              }
          break;
          case 'balance' || 'Balance':
            if (isSessionActive) {
                console.log(messageHandler.balance());
            } else {
                console.log(messageHandler.otherInfo(90008));
            }
        break;
          case 'logout' || 'Logout':
  
              if (!isSessionActive) {
                  console.log(messageHandler.otherInfo(90001));
              } else {
                  console.log(messageHandler.getLogoutInfo());
                  isSessionActive = false;
              }
  
          break;
          case 'help' || 'Help':
              console.log('Available commands:\n');
              console.log('  login <name>      User Login');
              console.log('  deposit <amount>  Deposit amount');
              console.log('  withdraw <amount> Withdraw amount');
              console.log('  balance           Show balance')
              console.log('  transfer <name> <amount> Transfer amount to the given name');
              console.log('  help              List of available commands');
              console.log('  quit              Exit from ATM Ruri Cli');
          break;
        
          default:
              console.log(messageHandler.otherInfo());
          break;
       
      }
    } catch (error) {
      console.log(error.message);
    }
  }

export default inputHandling;