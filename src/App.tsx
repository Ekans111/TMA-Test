import { useState } from "react";
import "./App.css";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const address = useTonAddress();

  const [ton, setTon] = useState(0);
  const [ethAddress, setEthAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExtraWorkCompleted, setIsExtraWorkCompleted] = useState([
    false,
    false,
    false,
  ]);

  const handleProvideEth = async () => {
    if (!isExtraWorkCompleted[2]) {
      setTon(ton + 10)
      toast("You gained extra token!", { type: "success" });
    } else {
      toast("Your ETH address is updated!", { type: "info" });
    }
    setIsExtraWorkCompleted([false, false, true]);
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-3xl text-center w-full mb-5">Telegram Mini App</h1>
      <div className="flex w-full relative max-sm:flex-col justify-center items-center gap-5">
        <TonConnectButton className="absolute right-0 max-sm:static" />
        <div className="text-2xl text-center">Token count: {ton}</div>
      </div>
      {address ? (
        <>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-full cursor-pointer transition hover:scale-110 hover:opacity-50 active:opacity-80"
            onClick={() => setTon(ton + 1)}
          >
            <img src="/image/toncoin.svg" alt="toncoin" className="w-40 h-40" />{" "}
          </div>
          <section className="tasks absolute bottom-4 left-1/2 -translate-x-1/2">
            <h2 className="text-2xl mb-5">
              Earn extra 10 tokens per each action
            </h2>
            <ul className="flex gap-4 relative">
              <li>
                <button
                  onClick={() => setTon(ton + 10)}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src="/image/Twitter_3D.png"
                    alt="telegram"
                    className="w-10 h-10"
                  />
                  Follow on
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTon(ton + 10)}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src="/image/Telegram_3D.png"
                    alt="telegram"
                    className="w-10 h-10"
                  />
                  Join Group
                </button>
              </li>
              <li className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src="/image/Ethereum_3D.png"
                    alt="Ethereum"
                    className="w-10 h-10"
                  />
                  Provide ETH
                </button>
                <div
                  className={`p-3 rounded-lg bg-slate-400 absolute -top-[150px] right-0 flex flex-col transition-all ease-out duration-300 ${
                    isModalOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-10"
                  } group-hover:block`}
                >
                  <input
                    value={ethAddress}
                    onChange={(e) => setEthAddress(e.target.value)}
                    className="p-3 rounded-lg mb-3"
                  />
                  <button
                    onClick={() => {
                      handleProvideEth();
                    }} // Toggle modal open/close
                    className="flex flex-col justify-center items-center"
                  >
                    Confirm
                  </button>
                </div>
              </li>
            </ul>
          </section>
        </>
      ) : (
        <div className="text-2xl text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <strong>Welcome!</strong>
          <br /> Please connect TON wallet first
        </div>
      )}
    </>
  );
}

export default App;
