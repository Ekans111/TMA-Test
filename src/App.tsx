import { useEffect, useState } from "react";
import "./App.css";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const address = useTonAddress();

  const [ton, setTon] = useState(0);
  const [ethAddress, setEthAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskCompletion, setTaskCompletion] = useState({
    followOnX: false,
    joinGroup: false,
    provideEth: false,
  });
  const [isAdded, setIsAdded] = useState(false);

  const handleFollowOnX = async () => {
    if (!taskCompletion.followOnX) {
      setTon(ton + 10);
      toast("You gained extra token!", { type: "success" });
    } else {
      toast("You are already following on X!", { type: "info" });
    }
    setTaskCompletion({...taskCompletion, followOnX: true });
    setIsModalOpen(false);
  };

  const handleJoinGroup = async () => {
    if (!taskCompletion.joinGroup) {
      setTon(ton + 10);
      toast("You gained extra token!", { type: "success" });
    } else {
      toast("You are already joining the group!", { type: "info" });
    }
    setTaskCompletion({...taskCompletion, joinGroup: true });
    setIsModalOpen(false);
  };

  const handleProvideEth = async () => {
    if (!taskCompletion.provideEth) {
      setTon(ton + 10)
      toast("You gained extra token!", { type: "success" });
    } else {
      toast("Your ETH address is updated!", { type: "info" });
    }
    setTaskCompletion({...taskCompletion, provideEth: true });
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isAdded) {
      setTimeout(() => {
        setIsAdded(false);
      }, 200);
    }
  }, [isAdded]);

  const handlePlus = () => {
    setIsAdded(true);
    setTon(ton + 1);
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
          { isAdded && <img src="/TMA-Test/image/plus.png" alt="plus" className={`animate-fadeInMoveUp absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 max-sm:w-20 max-sm:h-20 transition-opacity duration-500 ease-in-out z-20 ${isAdded? '' : 'hidden'}`} />}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-full cursor-pointer transition hover:scale-110 hover:opacity-50 active:opacity-80"
            onClick={handlePlus}
          >
            <img src="/TMA-Test/image/toncoin.svg" alt="toncoin" className="w-40 h-40 max-sm:w-20 max-sm:h-20" />{" "}
          </div>
          <section className="tasks absolute bottom-4 left-1/2 -translate-x-1/2">
            <h2 className="text-2xl mb-5">
              Earn extra 10 tokens per each action
            </h2>
            <ul className="flex gap-4 relative">
              <li>
                <button
                  onClick={() => handleFollowOnX()}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src="/TMA-Test/image/Twitter_3D.png"
                    alt="telegram"
                    className="w-10 h-10"
                  />
                  Follow on
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleJoinGroup()}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src="/TMA-Test/image/Telegram_3D.png"
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
                    src="/TMA-Test/image/Ethereum_3D.png"
                    alt="Ethereum"
                    className="w-10 h-10"
                  />
                  Provide ETH
                </button>
                <div
                  className={`p-3 rounded-lg bg-slate-400 absolute -top-[100px] right-0 flex flex-col transition-all ease-out duration-300 ${
                    isModalOpen
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 translate-y-10 -z-10"
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
                    disabled={!ethAddress}
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
