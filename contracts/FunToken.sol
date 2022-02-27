//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FunToken is ERC20, Ownable, ERC20Burnable {
    uint constant _initial_supply = 100 * (10**18);
    constructor() ERC20("Fun Token", "FUN") {
        _mint(msg.sender, _initial_supply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public onlyOwner override {
        _burn(msg.sender, amount);
    }

}
