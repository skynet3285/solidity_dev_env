import './env';
import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'Sunnyvale',
  networks: {
    hardhat: {},
    Sunnyvale: {
      url: process.env.SUNNYVALE_RPCURL as string,
      accounts: [
        process.env.SUNNYVALE_PRIVAT_01 as string,
        process.env.SUNNYVALE_PRIVAT_02 as string,
        process.env.SUNNYVALE_PRIVAT_03 as string,
        process.env.SUNNYVALE_PRIVAT_04 as string,
      ],
      chainId: Number(process.env.SUNNYVALE_CHAINID as string),
    },
  },
};

export default config;
