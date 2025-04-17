// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthTipping {
    address public owner;

    event TipReceived(address indexed from, uint amount);
    event Withdrawn(uint amount);

    constructor() {
        owner = msg.sender;
    }

    // allow plain ETH
    receive() external payable {
        emit TipReceived(msg.sender, msg.value);
    }

    // owner-only withdrawal
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        uint bal = address(this).balance;
        payable(owner).transfer(bal);
        emit Withdrawn(bal);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
