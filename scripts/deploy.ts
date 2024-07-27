import {ethers} from 'hardhat';

async function main() {
  // 1. Hardhat Runtime Environment (HRE) 가져오기
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  // 2. 배포할 스마트 계약 가져오기
  const ContractFactory = await ethers.getContractFactory('Fundrasing');

  // 3. 스마트 계약 배포
  const contract = await ContractFactory.deploy(
    '1000000000000000000', // 1 ETH
    1, // 1weeks
  );
  // 4. 배포 완료 대기
  await contract.waitForDeployment();

  // 5. 배포된 계약 주소 출력
  console.log('Contract deployed to:', contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// how to run
// npx hardhat run scripts/deploy.ts --network localhost
