// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Fundrasing {
    uint256 public targetAmount;
    address public owner;
    mapping(address => uint256) public donations;

    uint256 public currentAmount;

    uint256 public deadline;

    error InvalidTargetAmount(); // "Fundraising period should be at least 1 week"
    error InvalidDeadline(); // "Target amount should be at least 1 wei"
    error FundraisingClosed(); // "Fundraising is closed"
    error NotOwner(); // "Only the owner can call this function"
    error NotEnoughDonations(); // "Not enough donations"
    error NotFinished(); // "Fundraising is not finished"
    error NotDonations(); // "No donations"

    constructor(uint256 _targetAmount, uint256 _weeks) {
        if (_weeks == 0) {
            revert InvalidTargetAmount();
        }
        if (_targetAmount == 0) {
            revert InvalidDeadline();
        }

        owner = msg.sender;
        targetAmount = _targetAmount;
        deadline = block.timestamp + _weeks * 1 weeks;
    }

    receive() external payable {
        if (block.timestamp > deadline) {
            revert FundraisingClosed();
        }
        donations[msg.sender] += msg.value;
        currentAmount += msg.value;
    }

    function withdrawDonations() external payable {
        if (msg.sender != owner) {
            revert NotOwner();
        }
        if (targetAmount != currentAmount) {
            revert NotEnoughDonations();
        }
        // if (block.timestamp < deadline) {
        //     revert NotFinished();
        // }
        payable(owner).transfer(address(this).balance);
    }

    function refund() external {
        if (block.timestamp < deadline) {
            revert NotFinished();
        }
        uint256 amount = donations[msg.sender];

        if (amount == 0) {
            revert NotDonations();
        } else {
            donations[msg.sender] = 0;
            currentAmount -= amount;
            payable(msg.sender).transfer(amount);
        }
    }
}
