// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MockRouter {
    function getAmountsOut(uint amountIn, address[] calldata path) external pure returns (uint[] memory amounts) {
        amounts = new uint[](path.length);
        for (uint i = 0; i < path.length; i++) {
            amounts[i] = amountIn * (i + 1); // Arbitrary mock output
        }
    }

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external pure returns (uint[] memory amounts) {
        amounts = new uint[](path.length);
        for (uint i = 0; i < path.length; i++) {
            amounts[i] = amountIn * (i + 1); // Arbitrary mock output
        }
    }

    function quoteExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint24 fee,
        uint256 amountIn,
        uint160 sqrtPriceLimitX96
    ) external pure returns (uint256 amountOut) {
        // Return a mock output that’s proportional to amountIn, for testing
        amountOut = amountIn * 2; // Arbitrary multiplier for mock output
    }
}
