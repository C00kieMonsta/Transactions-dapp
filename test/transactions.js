var Transactions = artifacts.require("./Transactions.sol");

contract('Transactions', function(accounts) {
    it("should put 10000 MetaCoin in the first account", function() {
        var contract = Transactions.deployed();
        contract.then(function(instance) {
            return instance.getBalance.call(accounts[0])}).then(function(balance) {
                assert.equal(balance.toNumber(), 10000, "10000 wasn't in the first account");
            })
    });
    it("should add new person to the list", function() {
        var contract = Transactions.deployed();
        contract.then(function(instance) {
            return instance.addClientToBank(accounts[1], "Satoshi", "Nakamoto").then(function(success) {
                return instance.clientExists.call(accounts[1]).then(function(success) {
                    assert.equal(success, true, "Satoshi Nakamoto has been added");
                })
            })
        })
    });
    it("should transfer 100 MetaCoin to Satoshi Nakamoto", function() {
        var contract = Transactions.deployed();
        
        var account_one_starting_balance;
        var account_two_starting_balance = 0;
        var account_one_ending_balance;
        var account_two_ending_balance;

        var amount = 100;
        
        contract.then(function(instance) {
            return instance.addClientToBank(accounts[1], "Satoshi", "Nakamoto").then(function(success) {
                return instance.getBalance.call(accounts[0]);
            }).then(function(balance) {
                account_one_starting_balance = balance.toNumber();
                return instance.transfer(accounts[0], accounts[1], amount);
            }).then(function() {
                return instance.getBalance.call(accounts[0]);
            }).then(function(balance) {
                account_one_ending_balance = balance.toNumber();
                return instance.getBalance.call(accounts[1]);
            }).then(function(balance) {
                account_two_ending_balance = balance.toNumber();
                assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
                assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
            })
        })
    })
})