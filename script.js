// get form,expense list and total amount element

const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmountElement = document.getElementById('total-amount');

// initialise expenses array from localHost

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// function to render expenses in tabular form
function renderExpenses(){
    // clear expense list
    expenseList.innerHTML = ""

    // initialise total amount
    let totalAmount = 0;
    // loop through expenses array amd create table rows
    for(let i =0; i<expenses.length; i++){
        const expense = expenses[i]
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = `<td>${expense.name}</td> <td> $${expense.amount}</td> <td class="delete-btn" data-id="$[i]">Delete</td>`;
        
        expenseList.appendChild(expenseRow);
        // update total amount
        totalAmount += expense.amount;

    }
    // update total amount display
    totalAmountElement.textContent = totalAmount.toFixed(2);

    // save expenses to localHost
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// function to add expenses
function addExpense(event){
    event.preventDefault();
    // get expense and amount from form
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseName = expenseNameInput.value
    const expenseAmount = parseFloat(expenseAmountInput.value)

    // clear form input
    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    // validate inputs

    if(expenseName === "" || isNaN(expenseAmount)){
        alert("Please enter valid expense details")
        return
    }

    // create new expense object
    const expense = {
        name: expenseName,
        amount: expenseAmount,
    };

    // add expense to expenses array
    expenses.push(expense);

    // render expenses

    renderExpenses()

}

// function to delete expenses

function deleteExpenses(event){
    if(event.target.classList.contains("delete-btn")){
        // get expense index from data-id attribute

        const expenseIndex = parseInt(event.target.getAttribute("data-id"));
        
        // remove expense from expenses array
        expenses.splice(expenseIndex, 1);

        // render expenses
        renderExpenses();
    }
}

// add event listeners
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpenses);

// render initial expenses on page load
renderExpenses();
