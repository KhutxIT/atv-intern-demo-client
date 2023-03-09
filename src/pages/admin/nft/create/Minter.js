import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { uploadImage } from '../../../../action';
import { readImage } from '../../../../utils/fileUtil';
import Notification from '../../../../utils/notification';
import './index.scss';
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from './utils/interact';

const Minter = () => {
  //State variables
  const history = useHistory();
  const [walletAddress, setWallet] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    if (url === '' || name === '' || description === '') {
      Notification.failure('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus('👆🏽 Nhập vào các thông tin trên');
        } else {
          setWallet('');
          setStatus('🦊 Click vào nút "Kết nối Wallet" để tiếp tục');
        }
      });
    } else {
      setStatus(
        <p>
          {' '}
          🦊{' '}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            Bạn cần cài đặt Metamask, một loại ví Ethereum ảo, trên trình duyệt
            của bạn
          </a>
        </p>,
      );
    }
  }

  const attachImages = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    uploadedFiles.forEach((file) => {
      const readImageCallback = (processedFile, fileReaderEvent) => {
        uploadImage(processedFile).then((res) => {
          setURL(res.data?.data.fileUrl);
        });
      };
      readImage(file, readImageCallback);
    });
    e.target.value = '';
  };

  return (
    <React.Fragment>
      <div className="Minter">
        <div
          className="accountant-bread-crumb"
          onClick={() => history.push('/admin/nfts')}
        >
          <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: '10px' }} />
          <span>Danh sách NFT</span>
        </div>
        <button
          className="minter-button"
          id="walletButton"
          onClick={connectWalletPressed}
        >
          {walletAddress.length > 0 ? (
            'Connected: ' +
            String(walletAddress).substring(0, 6) +
            '...' +
            String(walletAddress).substring(38)
          ) : (
            <span>Kết nối Wallet</span>
          )}
        </button>
        <br></br>
        <h1 className="minter-h1" id="title">
          🧙‍♂️ Alchemy NFT Minter
        </h1>
        <p>Thêm thông tin Đường dẫn tới NFT, Tên, Mô tả, và ấn Đúc</p>
        <form>
          <h2 className="minter-h2">🖼 Ảnh chọn làm NFT: </h2>
          <label for="upload-photo-nft" style={{ cursor: 'pointer'} }>Click để chọn ảnh</label>
          <input
            type="file"
            accept="image/*"
            name="test"
            id="upload-photo-nft"
            onChange={(e) => attachImages(e)}
          />
          {!!url ? (
            <img
              src={url}
              alt="nft-imag"
              style={{ maxHeight: '100%', height: 'auto' }}
            />
          ) : null}
          <h2 className="minter-h2">🤔 Tên: </h2>
          <input
            className="minter-input"
            type="text"
            placeholder="e.g. My first NFT!"
            onChange={(event) => setName(event.target.value)}
          />
          <h2 className="minter-h2">✍️ Mô tả: </h2>
          <input
            className="minter-input"
            type="text"
            placeholder="e.g. Nhập mô tả cho NFT)"
            onChange={(event) => setDescription(event.target.value)}
          />
        </form>
        <button
          className="minter-button"
          id="mintButton"
          onClick={onMintPressed}
        >
          Đúc NFT
        </button>
        <p id="status">{status}</p>
      </div>
    </React.Fragment>
  );
};

export default Minter;
