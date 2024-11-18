// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/interfaces/IQuoter.sol";

interface IAerodromeRouter {
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}

contract ClamAggregator is Pausable, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    ISwapRouter public immutable uniswapRouter;
    IAerodromeRouter public immutable aerodromeRouter;
    IQuoter public immutable quoter;

    event TokensSwapped(address indexed user, uint amountIn, uint amountOut, bool usedUniswap, address[] path);

    constructor(address _uniswapRouter, address _aerodromeRouter, address _quoter) {
        uniswapRouter = ISwapRouter(_uniswapRouter);
        aerodromeRouter = IAerodromeRouter(_aerodromeRouter);

        quoter = IQuoter(_quoter);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    function getBestPrice(uint amountIn, address[] calldata path) public returns (uint bestAmountOut, bool isUniswap) {
        uint[] memory aerodromeAmountsOut = aerodromeRouter.getAmountsOut(amountIn, path);
        uint256 aerodromeOut = aerodromeAmountsOut[aerodromeAmountsOut.length - 1];

        // Use the Quoter contract for a read-only quote from Uniswap V3
        uint256 uniswapOut = quoter.quoteExactInputSingle(
            path[0],
            path[1],
            3000,  // 0.3% fee tier
            amountIn,
            0
        );

        return (uniswapOut > aerodromeOut ? uniswapOut : aerodromeOut, uniswapOut > aerodromeOut);
    }

    function swapTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external whenNotPaused {
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountIn);

        (uint bestAmountOut, bool isUniswap) = getBestPrice(amountIn, path);
        require(bestAmountOut >= amountOutMin, "DexAggregator: insufficient output");

        if (isUniswap) {
            // Execute Uniswap V3 swap
            IERC20(path[0]).approve(address(uniswapRouter), amountIn);
            ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
                tokenIn: path[0],
                tokenOut: path[1],
                fee: 3000,
                recipient: to,
                deadline: deadline,
                amountIn: amountIn,
                amountOutMinimum: amountOutMin,
                sqrtPriceLimitX96: 0
            });

            uniswapRouter.exactInputSingle(params);
        } else {
            // Execute Aerodrome swap
            IERC20(path[0]).approve(address(aerodromeRouter), amountIn);
            aerodromeRouter.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
        }

        emit TokensSwapped(msg.sender, amountIn, bestAmountOut, isUniswap, path);
    }

    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }
}
