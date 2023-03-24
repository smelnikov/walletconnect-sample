import SignClient from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";

const projectId = "87c667f4a6a9db3d75a0711715b44af1";

export async function pairWallet() {
  const web3Modal = new Web3Modal({
    walletConnectVersion: 2,
    projectId,
    standaloneChains: ["eip155:1"],
  });

  const signClient = await SignClient.init({ projectId });

  const { uri, approval } = await signClient.connect({
    requiredNamespaces: {
      eip155: {
        methods: ["eth_sign"],
        chains: ["eip155:1"],
        events: ["accountsChanged"],
      },
    },
  });

  if (uri) {
    web3Modal.openModal({ uri, standaloneChains: ["eip155:1"] });
    await approval();
    web3Modal.closeModal();
  }
}
