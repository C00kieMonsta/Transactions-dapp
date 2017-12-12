# Smart contract in Solidity

## Basic nodejs setup
So, the first thing you will do, is downloading Node.js because we are going to work with libraries that are compatible with Node.

Go to this website to download Node: https://nodejs.org/en/download/

## Setup of testrpc
Once node is installed, you should have npm (node package manager) installed on your computer, which is a package manager for JavaScript packages.
Then, with the npm tool, inside your terminal you will install the package called `ethereumjs-testrpc`, which is an in-memory blockchain that we are going to use for testing out the smart contracts without having to download the actual blockchain.

```npm install -g ethereumjs-testrpc```

We can use testrpc to deploy our smart contract on a simulated blockchain network. We can run testrpc in a new terminal and leave it running

```testrpc```

## Setup of truffle
The next step is to install an environment that will facilitate the deployment of the contract on either the simulated or real blockchain network.

We are using the truffle, which is a development framework that facilitates the creation of smart contracts.

```npm install -g truffle```

Now you are good to go.
