const {
  KeyringController,
  PreferencesController,
} = require("@metamask/controllers");

const controllers = {
  preferencesController: null,
  keyringController: null,
  netwokController: null,
};

const { MetaMaskKeyring } = require("@keystonehq/metamask-airgapped-keyring");
const SimpleEncryptor = require("simple-encryptor");

async function setupControllers(password) {
  const encryptor = SimpleEncryptor(password);

  const baseConfig = {
    encryptor: encryptor,
    keyringTypes: [MetaMaskKeyring],
  };

  controllers["preferencesController"] = new PreferencesController();

  controllers["keyringController"] = new KeyringController(
    {
      setAccountLabel: controllers[
        "preferencesController"
      ].setAccountLabel.bind(controllers["preferencesController"]),
      removeIdentity: controllers["preferencesController"].removeIdentity.bind(
        controllers["preferencesController"]
      ),
      syncIdentities: controllers["preferencesController"].syncIdentities.bind(
        controllers["preferencesController"]
      ),
      updateIdentities: controllers[
        "preferencesController"
      ].updateIdentities.bind(controllers["preferencesController"]),
      setSelectedAddress: controllers[
        "preferencesController"
      ].setSelectedAddress.bind(controllers["preferencesController"]),
    },
    baseConfig
  );
}

async function createNewAccount(password) {
  await setupControllers(password);

  initialState = await controllers[
    "keyringController"
  ].createNewVaultAndKeychain(password);
  console.log(initialState.keyrings[0].accounts);
}

createNewAccount("real secret keys should be long and random").then(
  console.log("Finished")
);
