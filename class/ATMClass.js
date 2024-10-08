
/******************************************************************************************
* ATM class, defines ATM routine
*******************************************************************************************/

class ATMClass {

  /**
    Initialize user parameters
    @param {string} name - The name of the user.
  */

  constructor(name) {
      this.name = name;
      this.balance = 0;
      this.owedToName = "";
      this.owedToValue = 0;
      this.owedFromName = "";
      this.owedFromValue = 0;
      this.transferValue=0;
      this.depositLogin=null;
      this.withdrawAmount=0;
  }

  /**
    Specifiy amount. If user owed then pay owe amount first
    @param {number} amount - amount 
    @param {object} users - all users index
  */

  deposit(amount, users) {

    let targetUser = users[this.owedToName];

    if (this.owedToValue > 0) {
      if (amount === this.owedToValue) {

        // Fully payid debt
        this.depositModel = "debt-paid";
        this.balance = 0;
        this.owedToValue = 0;
        this.owedToName = null;
        targetUser.owedFromName = null;
        targetUser.owedFromValue = 0;
        
      } else if (amount < this.owedToValue) {

        // Paid partially, still have debt
        this.depositModel = "still-have-debt";
        this.balance = 0;
        this.owedToValue -= amount;
        this.transferValue = amount;
        targetUser.owedFromValue -= amount;
        targetUser.balance += amount;
      } else if (amount > this.owedToValue) {

        // Debt paid and balance added
        this.depositModel = "debt-paid-have-balance";
        this.balance = amount - this.owedToValue;
        this.transferValue = this.owedToValue;
        this.owedToValue = 0;
        targetUser.owedFromName = "";
        targetUser.owedFromValue = 0;
      }
      
    } else {
      // Balance added if no debt
      this.balance += amount;
    }
    
  }

  /**
    Withdraw amount
    @param {number} amount - Amount to withdraw
    @returns {boolean} - Withdraw status true is success
  */

  withdraw(amount) {
    if (this.balance < amount) {
      return false;
    }

    this.withdrawAmount = amount;
    this.balance -= amount;
    return true;
  }

  /**
    Transfers the specified amount from this user's account to another user's account, if possible.
    If the transfer amount exceeds the balance, the user may owe the difference as debt to the target user.
    @param {object} target - The user to transfer the amount to.
    @param {number} amount - The amount to transfer.
  */

  transfer(target, amount) {
    if (amount > this.balance) {

      // If the deposited amount is greater than the balance, the remaining amount is owed to the target user
      const owedAmount = amount - this.balance;
      this.owedToValue = owedAmount;
      this.owedToName = target.name;
      this.transferValue = this.balance;
      target.owedFromName = this.name;
      target.owedFromValue = owedAmount;
      target.balance += this.transferValue;
      this.balance = 0;
    } else if (target.owedToValue > 0) {

      // If the target user owes the depositing user, the deposit is used to pay off some of the debt
      const paidAmount = Math.min(target.owedToValue, amount);
      target.owedToValue -= paidAmount;
      this.owedFromValue -= paidAmount;
      this.balance = paidAmount;
      this.transferValue = paidAmount;
      target.balance += paidAmount;
    } else if (target.owedToValue === amount) {

      // If the deposited amount is exactly equal to the target user's debt, the debt is paid off completely
      target.owedToValue = 0;
      this.owedFromValue = 0;
      target.owedToName = null;
      this.owedFromName = null;
    } else {

      // Otherwise, the deposit is added to the balance
      this.balance -= amount;
      this.transferValue = amount;
      target.balance += amount;
    }
  }
}
  
export default ATMClass;