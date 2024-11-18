import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */

const externalContracts = {
  base: {
    CBETH: {
      address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
      abi: [
        {
          inputs: [{ internalType: "address", name: "_admin", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "previousAdmin",
              type: "address",
            },
            { indexed: false, internalType: "address", name: "newAdmin", type: "address" },
          ],
          name: "AdminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: true, internalType: "address", name: "implementation", type: "address" }],
          name: "Upgraded",
          type: "event",
        },
        { stateMutability: "payable", type: "fallback" },
        {
          inputs: [],
          name: "admin",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "_admin", type: "address" }],
          name: "changeAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "implementation",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "_implementation", type: "address" }],
          name: "upgradeTo",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_implementation",
              type: "address",
            },
            { internalType: "bytes", name: "_data", type: "bytes" },
          ],
          name: "upgradeToAndCall",
          outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
          stateMutability: "payable",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ],
    },
    USDC: {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      abi: [
        {
          inputs: [{ internalType: "address", name: "implementationContract", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "address", name: "previousAdmin", type: "address" },
            { indexed: false, internalType: "address", name: "newAdmin", type: "address" },
          ],
          name: "AdminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "address", name: "implementation", type: "address" }],
          name: "Upgraded",
          type: "event",
        },
        { stateMutability: "payable", type: "fallback" },
        {
          inputs: [],
          name: "admin",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
          name: "changeAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "implementation",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newImplementation", type: "address" }],
          name: "upgradeTo",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newImplementation", type: "address" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "upgradeToAndCall",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
    },
    CBBTC: {
      address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
      abi: [
        {
          inputs: [{ internalType: "address", name: "implementationContract", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "address", name: "previousAdmin", type: "address" },
            { indexed: false, internalType: "address", name: "newAdmin", type: "address" },
          ],
          name: "AdminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "address", name: "implementation", type: "address" }],
          name: "Upgraded",
          type: "event",
        },
        { stateMutability: "payable", type: "fallback" },
        {
          inputs: [],
          name: "admin",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
          name: "changeAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "implementation",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newImplementation", type: "address" }],
          name: "upgradeTo",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newImplementation", type: "address" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "upgradeToAndCall",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
    },
  },
  baseSepolia: {
    CBETH: {
      address: "0xCaB42f74e47B5f9A4FCBC5C1DfC4C9210626511C",
      abi: [
        {
          inputs: [{ internalType: "address", name: "_admin", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "previousAdmin",
              type: "address",
            },
            { indexed: false, internalType: "address", name: "newAdmin", type: "address" },
          ],
          name: "AdminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: true, internalType: "address", name: "implementation", type: "address" }],
          name: "Upgraded",
          type: "event",
        },
        { stateMutability: "payable", type: "fallback" },
        {
          inputs: [],
          name: "admin",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "_admin", type: "address" }],
          name: "changeAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "implementation",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "_implementation", type: "address" }],
          name: "upgradeTo",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_implementation",
              type: "address",
            },
            { internalType: "bytes", name: "_data", type: "bytes" },
          ],
          name: "upgradeToAndCall",
          outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
          stateMutability: "payable",
          type: "function",
        },
        { stateMutability: "payable", type: "receive" },
      ],
    },
    USDC: {
      address: "0x081827b8C3Aa05287b5aA2bC3051fbE638F33152",
      abi: [
        {
          inputs: [{ internalType: "address", name: "implementationContract", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "address", name: "previousAdmin", type: "address" },
            { indexed: false, internalType: "address", name: "newAdmin", type: "address" },
          ],
          name: "AdminChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "address", name: "implementation", type: "address" }],
          name: "Upgraded",
          type: "event",
        },
        { stateMutability: "payable", type: "fallback" },
        {
          inputs: [],
          name: "admin",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
          name: "changeAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "implementation",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "newImplementation", type: "address" }],
          name: "upgradeTo",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newImplementation", type: "address" },
            { internalType: "bytes", name: "data", type: "bytes" },
          ],
          name: "upgradeToAndCall",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
