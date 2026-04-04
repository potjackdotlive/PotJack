/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/raffle.json`.
 */
export type Raffle = {
  "address": "31qdCe9TKthjQGPmZ8ZzoU7KD8vbq1F6Zmo2K4wfERHh",
  "metadata": {
    "name": "raffle",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Multi-token raffle program on Solana"
  },
  "instructions": [
    {
      "name": "buyTicketsSol",
      "discriminator": [
        164,
        132,
        202,
        239,
        186,
        235,
        124,
        176
      ],
      "accounts": [
        {
          "name": "raffleState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "solRaffle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "round",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "solRaffle"
              },
              {
                "kind": "arg",
                "path": "roundId"
              }
            ]
          }
        },
        {
          "name": "roundTickets",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100,
                  95,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "round"
              }
            ]
          }
        },
        {
          "name": "rentVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  110,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "roundTicketsPurchase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100,
                  95,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                  115,
                  95,
                  112,
                  117,
                  114,
                  99,
                  104,
                  97,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "round"
              },
              {
                "kind": "arg",
                "path": "purchaseIndex"
              }
            ]
          }
        },
        {
          "name": "player",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "btcPriceFeed"
        },
        {
          "name": "solPriceFeed"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "roundId",
          "type": "u32"
        },
        {
          "name": "purchaseIndex",
          "type": "u32"
        },
        {
          "name": "count",
          "type": "u32"
        },
        {
          "name": "maxCost",
          "type": "u64"
        }
      ]
    },
    {
      "name": "claimPrizeSol",
      "discriminator": [
        30,
        87,
        95,
        109,
        109,
        76,
        78,
        2
      ],
      "accounts": [
        {
          "name": "raffleState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "solRaffle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "round",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "solRaffle"
              },
              {
                "kind": "arg",
                "path": "roundId"
              }
            ]
          }
        },
        {
          "name": "roundTickets",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100,
                  95,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "round"
              }
            ]
          }
        },
        {
          "name": "winner",
          "writable": true,
          "signer": true
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "rentVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  110,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "beneficiary",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "roundId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "consumeRandomness",
      "discriminator": [
        190,
        217,
        49,
        162,
        99,
        26,
        73,
        234
      ],
      "accounts": [
        {
          "name": "client",
          "signer": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  79,
                  114,
                  97,
                  111,
                  86,
                  114,
                  102,
                  67,
                  98,
                  67,
                  108,
                  105,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  29,
                  238,
                  90,
                  117,
                  110,
                  0,
                  36,
                  220,
                  60,
                  8,
                  142,
                  199,
                  244,
                  240,
                  107,
                  29,
                  228,
                  225,
                  209,
                  126,
                  190,
                  179,
                  45,
                  90,
                  119,
                  170,
                  51,
                  103,
                  146,
                  69,
                  48,
                  16
                ]
              },
              {
                "kind": "account",
                "path": "client.state",
                "account": "client"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                71,
                173,
                29,
                72,
                82,
                82,
                233,
                20,
                120,
                153,
                70,
                121,
                62,
                20,
                190,
                180,
                19,
                90,
                77,
                3,
                51,
                184,
                165,
                67,
                121,
                47,
                165,
                201,
                207,
                23,
                209
              ]
            }
          }
        },
        {
          "name": "clientState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  76,
                  73,
                  69,
                  78,
                  84,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
        },
        {
          "name": "networkState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  79,
                  114,
                  97,
                  111,
                  86,
                  114,
                  102,
                  67,
                  98,
                  67,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                71,
                173,
                29,
                72,
                82,
                82,
                233,
                20,
                120,
                153,
                70,
                121,
                62,
                20,
                190,
                180,
                19,
                90,
                77,
                3,
                51,
                184,
                165,
                67,
                121,
                47,
                165,
                201,
                207,
                23,
                209
              ]
            }
          }
        },
        {
          "name": "request",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  79,
                  114,
                  97,
                  111,
                  86,
                  114,
                  102,
                  67,
                  98,
                  82,
                  101,
                  113,
                  117,
                  101,
                  115,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "client"
              },
              {
                "kind": "account",
                "path": "request"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                71,
                173,
                29,
                72,
                82,
                82,
                233,
                20,
                120,
                153,
                70,
                121,
                62,
                20,
                190,
                180,
                19,
                90,
                77,
                3,
                51,
                184,
                165,
                67,
                121,
                47,
                165,
                201,
                207,
                23,
                209
              ]
            }
          }
        },
        {
          "name": "solRaffle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "round",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "solRaffle"
              },
              {
                "kind": "arg",
                "path": "roundId"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "roundId",
          "type": "u32"
        }
      ]
    },
    {
      "name": "fundRentVault",
      "discriminator": [
        244,
        253,
        189,
        13,
        179,
        95,
        31,
        3
      ],
      "accounts": [
        {
          "name": "rentVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  110,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "fundVrfVault",
      "discriminator": [
        157,
        124,
        39,
        208,
        227,
        106,
        171,
        242
      ],
      "accounts": [
        {
          "name": "funder",
          "writable": true,
          "signer": true
        },
        {
          "name": "vrfFeeVault",
          "docs": [
            "PDA for storing funds for VRF"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  114,
                  102,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "getCurrentRaffleRoundId",
      "discriminator": [
        141,
        75,
        189,
        206,
        206,
        91,
        23,
        21
      ],
      "accounts": [
        {
          "name": "solRaffle",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": "u32"
    },
    {
      "name": "getRaffleRoundCount",
      "discriminator": [
        176,
        188,
        197,
        73,
        66,
        119,
        61,
        5
      ],
      "accounts": [
        {
          "name": "solRaffle",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": "u32"
    },
    {
      "name": "getRaffleRoundData",
      "discriminator": [
        47,
        97,
        138,
        249,
        89,
        171,
        155,
        159
      ],
      "accounts": [
        {
          "name": "solRaffle",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "round",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "solRaffle"
              },
              {
                "kind": "arg",
                "path": "roundId"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "roundId",
          "type": "u32"
        }
      ],
      "returns": {
        "defined": {
          "name": "roundDataView"
        }
      }
    },
    {
      "name": "getRaffleRoundResult",
      "discriminator": [
        245,
        203,
        162,
        129,
        107,
        148,
        112,
        54
      ],
      "accounts": [
        {
          "name": "solRaffle",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "round",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "solRaffle"
              },
              {
                "kind": "arg",
                "path": "roundId"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "roundId",
          "type": "u32"
        }
      ],
      "returns": {
        "defined": {
          "name": "roundResultView"
        }
      }
    },
    {
      "name": "getRaffleState",
      "discriminator": [
        239,
        174,
        166,
        93,
        167,
        51,
        94,
        224
      ],
      "accounts": [
        {
          "name": "raffleState",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "raffleStateView"
        }
      }
    },
    {
      "name": "getTicketPrice",
      "discriminator": [
        55,
        148,
        245,
        154,
        119,
        254,
        55,
        48
      ],
      "accounts": [
        {
          "name": "btcPriceFeed"
        },
        {
          "name": "solPriceFeed"
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getTicketPriceInBtc",
      "discriminator": [
        139,
        10,
        86,
        191,
        207,
        93,
        60,
        229
      ],
      "accounts": [],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "getTokenRaffle",
      "discriminator": [
        182,
        225,
        154,
        248,
        119,
        241,
        162,
        65
      ],
      "accounts": [
        {
          "name": "solRaffle",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "tokenRaffleView"
        }
      }
    },
    {
      "name": "initializeClientState",
      "discriminator": [
        135,
        57,
        192,
        113,
        176,
        11,
        209,
        132
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "clientState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  76,
                  73,
                  69,
                  78,
                  84,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeRaffle",
      "discriminator": [
        110,
        142,
        92,
        16,
        15,
        58,
        89,
        229
      ],
      "accounts": [
        {
          "name": "raffleState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "entranceFeePercentage",
          "type": "u8"
        },
        {
          "name": "beneficiary",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "initializeSolRaffle",
      "discriminator": [
        73,
        0,
        235,
        207,
        121,
        115,
        50,
        23
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "solRaffle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "requestRandomness",
      "discriminator": [
        213,
        5,
        173,
        166,
        37,
        236,
        31,
        18
      ],
      "accounts": [
        {
          "name": "raffleState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "solRaffle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "vrfFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  114,
                  102,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "vrf",
          "address": "VRFCBePmGTpZ234BhbzNNzmyg39Rgdd6VgdfhHwKypU"
        },
        {
          "name": "clientState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  67,
                  76,
                  73,
                  69,
                  78,
                  84,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              }
            ]
          }
        },
        {
          "name": "client",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  79,
                  114,
                  97,
                  111,
                  86,
                  114,
                  102,
                  67,
                  98,
                  67,
                  108,
                  105,
                  101,
                  110,
                  116
                ]
              },
              {
                "kind": "const",
                "value": [
                  29,
                  238,
                  90,
                  117,
                  110,
                  0,
                  36,
                  220,
                  60,
                  8,
                  142,
                  199,
                  244,
                  240,
                  107,
                  29,
                  228,
                  225,
                  209,
                  126,
                  190,
                  179,
                  45,
                  90,
                  119,
                  170,
                  51,
                  103,
                  146,
                  69,
                  48,
                  16
                ]
              },
              {
                "kind": "account",
                "path": "clientState"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                71,
                173,
                29,
                72,
                82,
                82,
                233,
                20,
                120,
                153,
                70,
                121,
                62,
                20,
                190,
                180,
                19,
                90,
                77,
                3,
                51,
                184,
                165,
                67,
                121,
                47,
                165,
                201,
                207,
                23,
                209
              ]
            }
          }
        },
        {
          "name": "networkState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  79,
                  114,
                  97,
                  111,
                  86,
                  114,
                  102,
                  67,
                  98,
                  67,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                7,
                71,
                173,
                29,
                72,
                82,
                82,
                233,
                20,
                120,
                153,
                70,
                121,
                62,
                20,
                190,
                180,
                19,
                90,
                77,
                3,
                51,
                184,
                165,
                67,
                121,
                47,
                165,
                201,
                207,
                23,
                209
              ]
            }
          }
        },
        {
          "name": "treasury",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "seeds",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    },
    {
      "name": "setWinnerAddress",
      "discriminator": [
        155,
        18,
        56,
        22,
        22,
        1,
        188,
        125
      ],
      "accounts": [
        {
          "name": "raffleState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "solRaffle",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  111,
                  108,
                  95,
                  114,
                  97,
                  102,
                  102,
                  108,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "round",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "solRaffle"
              },
              {
                "kind": "arg",
                "path": "roundId"
              }
            ]
          }
        },
        {
          "name": "roundTicketsPurchase",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  117,
                  110,
                  100,
                  95,
                  116,
                  105,
                  99,
                  107,
                  101,
                  116,
                  115,
                  95,
                  112,
                  117,
                  114,
                  99,
                  104,
                  97,
                  115,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "round"
              },
              {
                "kind": "arg",
                "path": "purchaseIndex"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "raffleState"
          ]
        }
      ],
      "args": [
        {
          "name": "roundId",
          "type": "u32"
        },
        {
          "name": "purchaseIndex",
          "type": "u32"
        }
      ]
    },
    {
      "name": "withdrawRentVault",
      "discriminator": [
        102,
        130,
        133,
        24,
        194,
        221,
        219,
        45
      ],
      "accounts": [
        {
          "name": "raffleState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "rentVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  110,
                  116,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "raffleState"
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawVrfVault",
      "discriminator": [
        14,
        31,
        4,
        129,
        171,
        151,
        32,
        83
      ],
      "accounts": [
        {
          "name": "raffleState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  102,
                  102,
                  108,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "raffleState"
          ]
        },
        {
          "name": "vrfFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  114,
                  102,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "client",
      "discriminator": [
        221,
        237,
        145,
        143,
        170,
        194,
        133,
        115
      ]
    },
    {
      "name": "clientState",
      "discriminator": [
        147,
        10,
        249,
        80,
        145,
        124,
        219,
        60
      ]
    },
    {
      "name": "networkState",
      "discriminator": [
        212,
        237,
        148,
        56,
        97,
        245,
        51,
        169
      ]
    },
    {
      "name": "raffleState",
      "discriminator": [
        160,
        186,
        30,
        174,
        174,
        156,
        156,
        244
      ]
    },
    {
      "name": "requestAccount",
      "discriminator": [
        108,
        23,
        6,
        158,
        184,
        6,
        152,
        121
      ]
    },
    {
      "name": "round",
      "discriminator": [
        87,
        127,
        165,
        51,
        73,
        78,
        116,
        174
      ]
    },
    {
      "name": "roundTickets",
      "discriminator": [
        100,
        189,
        20,
        223,
        39,
        44,
        161,
        211
      ]
    },
    {
      "name": "roundTicketsPurchase",
      "discriminator": [
        46,
        50,
        110,
        225,
        226,
        249,
        150,
        135
      ]
    },
    {
      "name": "tokenRaffle",
      "discriminator": [
        10,
        32,
        165,
        142,
        80,
        191,
        11,
        4
      ]
    }
  ],
  "events": [
    {
      "name": "allRequestsCompleted",
      "discriminator": [
        206,
        125,
        191,
        52,
        97,
        111,
        59,
        207
      ]
    },
    {
      "name": "firstTicketBonusAwarded",
      "discriminator": [
        29,
        247,
        196,
        38,
        112,
        13,
        88,
        238
      ]
    },
    {
      "name": "prizeClaimed",
      "discriminator": [
        213,
        150,
        192,
        76,
        199,
        33,
        212,
        38
      ]
    },
    {
      "name": "statusChanged",
      "discriminator": [
        146,
        235,
        222,
        125,
        145,
        246,
        34,
        240
      ]
    },
    {
      "name": "ticketPurchased",
      "discriminator": [
        108,
        59,
        246,
        95,
        84,
        145,
        13,
        71
      ]
    },
    {
      "name": "winnerPicked",
      "discriminator": [
        147,
        193,
        81,
        221,
        165,
        98,
        201,
        233
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "roundDoesNotExist",
      "msg": "Round does not exist"
    }
  ],
  "types": [
    {
      "name": "allRequestsCompleted",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "client",
      "docs": [
        "This PDA represents a state of a registered client."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "owner",
            "docs": [
              "The owner is able to manage the client:",
              "",
              "-   withdraw client funds",
              "-   transfer ownership"
            ],
            "type": "pubkey"
          },
          {
            "name": "program",
            "docs": [
              "An address of a registered program."
            ],
            "type": "pubkey"
          },
          {
            "name": "state",
            "docs": [
              "An arbitrary PDA that belongs to the client program.",
              "",
              "This is the request authority."
            ],
            "type": "pubkey"
          },
          {
            "name": "numRequests",
            "docs": [
              "Number of requests made by the client."
            ],
            "type": "u64"
          },
          {
            "name": "callback",
            "docs": [
              "An optional client-level callback.",
              "",
              "**Note:** this callback does not apply to [`RequestAlt`].",
              "",
              "If it is `None`, then no callback will be called upon request fulfill, but you can",
              "override this using the request-level callback (see [`RequestParams::callback`]).",
              "",
              "You can update this value using the [`SetCallback`] instruction.",
              "",
              "[`RequestParams::callback`]: crate::RequestParams::callback",
              "[`SetCallback`]: crate::SetCallback",
              "[`RequestAlt`]: crate::RequestAlt"
            ],
            "type": {
              "option": {
                "defined": {
                  "name": "validatedCallback"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "clientState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "firstTicketBonusAwarded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": "pubkey"
          },
          {
            "name": "roundId",
            "type": "u32"
          },
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "roundStartTime",
            "type": "i64"
          },
          {
            "name": "roundEndTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "fulfilled",
      "docs": [
        "Fulfilled request representation."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "randomness",
            "docs": [
              "Generated randomness.",
              "",
              "It is validated within the fulfill instruction. Please look into the account history logs",
              "and VRF events to observe the individual components."
            ],
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          },
          {
            "name": "responses",
            "docs": [
              "Individual responses constituting the randomness.",
              "",
              "This going to be `Some` within the callback invocation, and `None` afterwards."
            ],
            "type": {
              "option": {
                "vec": {
                  "defined": {
                    "name": "response"
                  }
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "networkConfiguration",
      "docs": [
        "Oracle configuration"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "An authority."
            ],
            "type": "pubkey"
          },
          {
            "name": "treasury",
            "docs": [
              "Treasury account address."
            ],
            "type": "pubkey"
          },
          {
            "name": "requestFee",
            "docs": [
              "Per-request fee paid by a client."
            ],
            "type": "u64"
          },
          {
            "name": "callbackDeadline",
            "docs": [
              "Callback deadline measured in slots (1 slot is approximately 400ms).",
              "",
              "If callback keeps failing util this deadline reached, then the request",
              "will be fulfilled without calling the callback.",
              "",
              "Note that well-written callback should never fail, so this should never",
              "apply to your client."
            ],
            "type": "u64"
          },
          {
            "name": "fulfillAuthorities",
            "docs": [
              "This parties are authorized to fulfill requests."
            ],
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "networkState",
      "docs": [
        "This PDA holds oracle state and configuration."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Account bump."
            ],
            "type": "u8"
          },
          {
            "name": "config",
            "docs": [
              "Active configuration."
            ],
            "type": {
              "defined": {
                "name": "networkConfiguration"
              }
            }
          },
          {
            "name": "numRequests",
            "docs": [
              "Total number of received requests."
            ],
            "type": "u64"
          },
          {
            "name": "numRegistered",
            "docs": [
              "Total number of registered clients."
            ],
            "type": "u64"
          },
          {
            "name": "numTerminated",
            "docs": [
              "Total number of terminated clients."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "pending",
      "docs": [
        "Pending randomness request."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "responses",
            "docs": [
              "Responses collected so far."
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "response"
                }
              }
            }
          },
          {
            "name": "callback",
            "docs": [
              "Callback (if any)."
            ],
            "type": {
              "option": {
                "defined": {
                  "name": "validatedCallback"
                }
              }
            }
          },
          {
            "name": "callbackOverride",
            "docs": [
              "If `true` then [`Pending::callback`] is a request-level callback."
            ],
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "prizeClaimed",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "roundId",
            "type": "u32"
          },
          {
            "name": "winner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "raffleState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "entranceFeePercentage",
            "type": "u8"
          },
          {
            "name": "beneficiary",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "vrfRequestCounter",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "raffleStateView",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "entranceFeePercentage",
            "type": "u8"
          },
          {
            "name": "beneficiary",
            "type": "pubkey"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "vrfRequestCounter",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "requestAccount",
      "docs": [
        "The account holding a randomness request state."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "PDA bump."
            ],
            "type": "u8"
          },
          {
            "name": "slot",
            "docs": [
              "The slot this request was created at."
            ],
            "type": "u64"
          },
          {
            "name": "client",
            "docs": [
              "The client created the request."
            ],
            "type": "pubkey"
          },
          {
            "name": "seed",
            "docs": [
              "Request seed."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "state",
            "docs": [
              "The state of this randomness request."
            ],
            "type": {
              "defined": {
                "name": "requestState"
              }
            }
          }
        ]
      }
    },
    {
      "name": "requestState",
      "docs": [
        "Randomness request state."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "pending",
            "fields": [
              {
                "defined": {
                  "name": "pending"
                }
              }
            ]
          },
          {
            "name": "fulfilled",
            "fields": [
              {
                "defined": {
                  "name": "fulfilled"
                }
              }
            ]
          }
        ]
      }
    },
    {
      "name": "response",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "pubkey"
          },
          {
            "name": "randomness",
            "type": {
              "array": [
                "u8",
                64
              ]
            }
          }
        ]
      }
    },
    {
      "name": "round",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "tokenRaffle",
            "type": "pubkey"
          },
          {
            "name": "roundId",
            "type": "u32"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "roundStatus"
              }
            }
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "prizeAmount",
            "type": "u64"
          },
          {
            "name": "commissionBalance",
            "type": "u64"
          },
          {
            "name": "purchasesCount",
            "type": "u32"
          },
          {
            "name": "totalTickets",
            "type": "u32"
          },
          {
            "name": "winnerTicketIndex",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "winnerPurchaseIndex",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "winnerAddress",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "prizeClaimed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "roundDataView",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "roundId",
            "type": "u32"
          },
          {
            "name": "tokenRaffle",
            "type": "pubkey"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "roundStatus"
              }
            }
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "prizeAmount",
            "type": "u64"
          },
          {
            "name": "commissionBalance",
            "type": "u64"
          },
          {
            "name": "winnerAddress",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "winnerPurchaseIndex",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "winnerTicketIndex",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "roundPlayers",
            "type": {
              "vec": {
                "defined": {
                  "name": "roundPlayerDataWithAddress"
                }
              }
            }
          },
          {
            "name": "prizeClaimed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "roundPlayerDataWithAddress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "pubkey"
          },
          {
            "name": "ticketsCount",
            "type": "u32"
          },
          {
            "name": "hasBonusTicket",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "roundResultView",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "winnerAddress",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "winnerTicketIndex",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "roundPlayers",
            "type": {
              "vec": {
                "defined": {
                  "name": "roundPlayerDataWithAddress"
                }
              }
            }
          },
          {
            "name": "prizeAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "roundStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "open"
          },
          {
            "name": "completed"
          }
        ]
      }
    },
    {
      "name": "roundTickets",
      "serialization": "bytemuck",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "round",
            "type": "pubkey"
          },
          {
            "name": "cumulativeTickets1",
            "type": {
              "array": [
                "u32",
                1024
              ]
            }
          },
          {
            "name": "cumulativeTickets2",
            "type": {
              "array": [
                "u32",
                1024
              ]
            }
          },
          {
            "name": "len",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "padding",
            "type": {
              "array": [
                "u8",
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "roundTicketsPurchase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "round",
            "type": "pubkey"
          },
          {
            "name": "player",
            "type": "pubkey"
          },
          {
            "name": "purchaseIndex",
            "type": "u32"
          },
          {
            "name": "ticketsCount",
            "type": "u32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "statusChanged",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "roundId",
            "type": "u32"
          },
          {
            "name": "oldStatus",
            "type": {
              "defined": {
                "name": "roundStatus"
              }
            }
          },
          {
            "name": "newStatus",
            "type": {
              "defined": {
                "name": "roundStatus"
              }
            }
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "ticketPurchased",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": "pubkey"
          },
          {
            "name": "roundId",
            "type": "u32"
          },
          {
            "name": "buyer",
            "type": "pubkey"
          },
          {
            "name": "count",
            "type": "u32"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "prizeAmount",
            "type": "u64"
          },
          {
            "name": "commissionAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "tokenRaffle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "currentRoundId",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "currentRoundStatus",
            "type": {
              "defined": {
                "name": "roundStatus"
              }
            }
          },
          {
            "name": "currentRoundEndTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "totalRounds",
            "type": "u32"
          },
          {
            "name": "pendingRounds",
            "type": {
              "vec": "u32"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tokenRaffleView",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "tokenMint",
            "type": "pubkey"
          },
          {
            "name": "currentRoundId",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "currentRoundStatus",
            "type": {
              "defined": {
                "name": "roundStatus"
              }
            }
          },
          {
            "name": "currentRoundEndTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "totalRounds",
            "type": "u32"
          },
          {
            "name": "pendingRounds",
            "type": {
              "vec": "u32"
            }
          }
        ]
      }
    },
    {
      "name": "validatedCallback",
      "docs": [
        "See [`Callback`]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "remainingAccounts",
            "docs": [
              "See [`Callback::remaining_accounts`]."
            ],
            "type": {
              "vec": {
                "defined": {
                  "name": "validatedRemainingAccount"
                }
              }
            }
          },
          {
            "name": "data",
            "docs": [
              "See [`Callback::data`]."
            ],
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "validatedRemainingAccount",
      "docs": [
        "Validated [`RemainingAccount`]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "pubkey"
          },
          {
            "name": "isWritable",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "winnerPicked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": "pubkey"
          },
          {
            "name": "round",
            "type": "pubkey"
          },
          {
            "name": "roundId",
            "type": "u32"
          },
          {
            "name": "winnerPurchaseIndex",
            "type": "u32"
          },
          {
            "name": "winnerTicketIndex",
            "type": "u32"
          },
          {
            "name": "prizeAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
