import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "hardhat-deploy";

const config: HardhatUserConfig = {

	networks: {
		hardhat: {
		  	// allowUnlimitedContractSize: true,

		}
	},

	solidity: {
		version: "0.8.17",
		settings: {
			optimizer: {
				enabled: true,
				runs: 1
			}
		}
	},

	namedAccounts: {
		deployer: 0,
		alice: 1,
		bob: 2,
		carol: 3,
		derrick: 4,
	},
};

export default config;
