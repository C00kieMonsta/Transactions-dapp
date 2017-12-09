pragma solidity ^0.4.4;

contract Transactions {

    struct Client {
        address clientId;
        bytes32 firstName;
        bytes32 lastName;
    }

    struct Transaction {
        address senderId;
        address receiverId;
        uint timestamp;
        uint amount;
    }

    Client[] arrayOfClients;
    Transaction[] arrayOfTransactions;
    address owner;
    mapping (address => uint) clientBalance;

    function Transactions() public {
        owner = msg.sender;
        clientBalance[msg.sender] = 10000;
    }

    function addClientToBank(address _clientId, bytes32 _firstName, bytes32 _lastName) public returns (bool success) {
        if (address(_clientId) == 0) {
            return false;
        }
        Client memory newClient = Client(_clientId, _firstName, _lastName);
        if (_clientId != msg.sender) {
            clientBalance[_clientId] = 0;
        }
        arrayOfClients.push(newClient);
        return true;
    }

    function getBalance(address _clientId) public constant returns (uint _balance) {
        return clientBalance[_clientId];
    }

    function getClients() public constant returns (Client[]) {
        uint length = arrayOfClients.length;
        Client[] memory clients = new Client[](length);
        for (uint i = 0; i < length; i++) {
            clients[i] = arrayOfClients[i];
        }
        return clients;
    }

    function getTransactions() public constant returns (Transaction[]) {
        uint length = arrayOfTransactions.length;
        Transaction[] memory transactions = new Transaction[](length);
        for (uint i = 0; i < length; i++) {
            transactions[i] = arrayOfTransactions[i];
        }
        return transactions;
    }

    function transfer(address _from, address _to, uint _money) public returns(bool) {
        if (clientBalance[_from] == 0 || clientBalance[_from] < _money) {
            return false;
        }
        Transaction memory newTransaction = Transaction(_from, _to, now, _money);
        clientBalance[_from] -= _money;
        clientBalance[_to] += _money;
        arrayOfTransactions.push(newTransaction);
        return true;
    }
}