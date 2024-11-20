let prompt = require("prompt-sync")()
const slotArr = [["","",""],
                 ["","",""],
                 ["","",""]
];
const symbols = ["🍒", "🍉", "⭐"];

// 1) total game money input
const userBalance = 0;
const totalMoneyinput = prompt("Enter total amount for game: $")
let totalMoney = parseInt(totalMoneyinput,10)
if(isNaN(totalMoney) || totalMoney <= 0) {
    throw new Error("Invalid input: Please Enter a valid amount for balance")
} 

let bank = 0
let userWinMoney = 0

// 2) Spinning Slot
function spinnedSlot(symbols,slotArr) {
    for(let i = 0; i < symbols.length; ++i) {
        for(let j = 0; j < symbols.length; ++j) {
            let randomIndex = Math.floor(Math.random() * symbols.length)
            slotArr[i][j] = symbols[randomIndex]
        }
    }
    slotArr.forEach(row => {
        console.log(row.join("|"))
    });
    return slotArr;
}
// 3)Calculate Income
function calculateIncome(performedSlot) {
    let payout = 0
    if(performedSlot[1][0] == performedSlot[1][1] && performedSlot[1][1] == performedSlot[1][2]) {
        let symbol = performedSlot[1][0]
        if(symbol == "🍉") {
            payout = 3
        } else if(symbol == "🍒") {
            payout = 5
        } else if(symbol == "⭐") {
            payout = 10
        }
    }
    return payout    
}

while(true) {
    // for one spin inputed money
    const spinInput = prompt("Enter amount for SPIN: $");
    const spinAmount = parseInt(spinInput,10);
    
    if(isNaN(spinAmount) ||  spinAmount < 0) {
        console.error("Invalid input: Please Enter a valid amount for a SPIN!");
    } else if(spinAmount > totalMoney ) {
        console.error("You don't have enough money")
        break;
    } else {
        totalMoney -= spinAmount
        bank += spinAmount
    }

    let spinnedslot = spinnedSlot(symbols,slotArr);
    let payoutAmount = calculateIncome(spinnedslot);

    if(payoutAmount > 0) {
        userWinMoney = payoutAmount * spinAmount
        totalMoney += userWinMoney 
        console.log(`You win: $ ${userWinMoney}`)
        console.log("Your balance is $",totalMoney)
    } else {
        console.log("Try Again!")
        console.log("Your balance is $",totalMoney)
    }
    if(totalMoney == 0 && payoutAmount > 0) {
        console.log("Your Balance is $", totalMoney)
        console.error("You are out money: Game Over!")
        break;
    }else if(totalMoney == 0) {
        break;
    }
    const playAgain = prompt("Do you want to play again? (y/n): ")
    if(playAgain.toLowerCase() !== "y" && playAgain.toLowerCase() !== "yes") {
        console.log("Your final balance is: $",totalMoney)
        break;
    }
}
// For star 10x, for cherry 5x, for watermelon 3x
// first user inputs money for his balance
// then input the money for one spin
// the slot spinned and calculating the payout 
// Then changing the User balance money providing for his winning payout
// If not user will loose and loose his balance