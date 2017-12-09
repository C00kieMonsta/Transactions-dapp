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

    // state variables
    Client[] arrayOfClients;
    Transaction[] arrayOfTransactions;
    address owner;
    mapping (address => uint) clientBalance;

    function Transactions(address _clientId, bytes32 _firstName, bytes32 _lastName) public {
      Client memory newClient = Client(_clientId, _firstName, _lastName);
      arrayOfClients.push(newClient);
      owner = _clientId;
      clientBalance[_clientId] = 10000;
    }

    function addClientToBank(address _clientId, bytes32 _firstName, bytes32 _lastName) public returns (bool success) {
        if (address(_clientId) == 0) {
            return false;
        }
        Client memory newClient = Client(_clientId, _firstName, _lastName);
        if (_clientId != owner) {
            clientBalance[_clientId] = 0;
        }
        arrayOfClients.push(newClient);
        return true;
    }

    function getBalance(address _clientId) public view returns (uint _balance) {
        return clientBalance[_clientId];
    }

    function getClients() public view returns (bytes32[], bytes32[], uint[]) {
      uint length = arrayOfClients.length;
      bytes32[] memory firstNames = new bytes32[](length);
      bytes32[] memory lastNames = new bytes32[](length);
      uint[] memory balances = new uint[](length);

      for (uint i = 0; i < length; i++) {
        Client memory currentClient = arrayOfClients[i];
        firstNames[i] = currentClient.firstName;
        lastNames[i] = currentClient.lastName;
        balances[i] = getBalance(currentClient.clientId);
      }
      return (firstNames, lastNames, balances);
    }

    function clientExists(address _clientId) public view returns (bool) {
      uint length = arrayOfClients.length;
      for (uint i = 0; i < length; i++) {
        Client memory currentClient = arrayOfClients[i];
        if (currentClient.clientId == _clientId) {
          return true;
        }
      }
      return false;
    }

    function getTransactions() public view returns (address[], address[], uint[]) {

      uint length = arrayOfTransactions.length;
      address[] memory senders = new address[](length);
      address[] memory receivers = new address[](length);
      uint[] memory timestamps = new uint[](length);

      for (uint i = 0; i < length; i++) {
        Transaction memory currentTransaction = arrayOfTransactions[i];
        senders[i] = currentTransaction.senderId;
        receivers[i] = currentTransaction.receiverId;
        timestamps[i] = currentTransaction.timestamp;
      }
      return (senders, receivers, timestamps);
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