// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {
    constructor() ERC20("MockToken", "MTK") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}