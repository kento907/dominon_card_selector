import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from "uuid";

import SelectButton from './SelectButton';

import { useState, useRef, useContext, useEffect } from 'react';
import CardContext from '.';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


import html2canvas from "html2canvas";


function App() {

  // カード情報
  const cardInfo = useContext(CardContext)
  // 選択されたカードを保持するstate
  const [selectedCards, setSelectedCards] = useState([]);
  // Reactionカードを追加するかどうか
  const [addReaction, setAddReaction] = useState(false)

  const maxAttackRef = useRef();

  const aveCostRef = useRef();
  useEffect(() => {
    const aveCostInput = aveCostRef.current;
    if (aveCostInput) {
      aveCostInput.value = 4.2; // 初期値を設定する
    }
  }, []);

  // Check状態を変更
  const changeChecked = () => {
    setAddReaction(prevState => !prevState);
  }

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handle = (selectedCards) => {
    setSelectedCards(selectedCards);
    handleShow(); // モーダルを表示
  };

  // カードリストをスクショで保存
  const handleSaveAsImage = () => {
    // カードリストの要素を取得
    const cardListElement = document.querySelector(".modal-body");
    // カードリストの要素をキャプチャして画像として保存
    html2canvas(cardListElement).then(canvas => {
      const imageData = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "card_list_image.png";
      link.href = imageData;
      link.click();
    });
  };

  const handleInputChange = () => {
    const currentValue = aveCostRef.current.value;
    document.getElementById("averageCostValue").textContent = currentValue;
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home" className='setting'>Dominion Card Selector</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
      </Navbar>

      <div className='setting'>
        ・Attackカードの上限枚数:<input type="number" ref={maxAttackRef} name="averageCostInput" min="0" max="5" step="1"/>枚
      </div>

      <div className='setting'>
        ・カードの平均コスト：
        <input
        type="range"
        ref={aveCostRef}
        id="averageCostInput"
        name="averageCostInput"
        min="3.5" max="4.7" step="0.1"
        onChange={handleInputChange}
        />
        <span id="averageCostValue">4.2</span>
      </div>

      <div className='setting'>
        <input type="checkbox" onClick={changeChecked}/> "Attack"カードが多いほど"Reaction"カードを選びやすくする
      </div>

      <hr/>
      <div className='setting'>
        <SelectButton
        maxAttackRef={maxAttackRef}
        aveCostRef={aveCostRef}
        setSelectedCards={setSelectedCards}
        addReaction={addReaction}
        handle={handle}
        />
      </div>

      {/* カード情報表示 */}
      {/* <div>
        {selectedCards.map((card, index) => (
          <p key={index}>{card.cost}: {card.name}: {card.type}</p>
        ))}
      </div> */}

      {/* モーダル */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selected Cards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCards.map((card, index) => (
            <p key={index}>{card.cost}: {card.name}: {card.type}</p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Stack direction="horizontal" gap={3}>
            <Button variant="success" className="savebutton" onClick={handleSaveAsImage}>Save as Image</Button>
            <SelectButton className="selectbutton" maxAttackRef={maxAttackRef} aveCostRef={aveCostRef} setSelectedCards={setSelectedCards} addReaction={addReaction} handle={handle} />
            <Button variant="secondary" className="closebutton" onClick={handleClose}>Close</Button>
          </Stack>
        </Modal.Footer>
      </Modal>

    </>

  );
}


export default App;
