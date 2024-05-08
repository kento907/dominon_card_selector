import React from 'react'
import { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SelectButton from './SelectButton';

import html2canvas from "html2canvas";

const CardListModal = ({maxAttackRef, aveCostRef}) => {

	const [showModal, setShowModal] = useState(false);
	// 選択されたカードを保持するstate
	const [selectedCards, setSelectedCards] = useState([]);
	// Reactionカードを追加するかどうか
	const [addReaction, setAddReaction] = useState(false)
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

  return (
    <div>
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
            <Button className="p-2" variant="primary" onClick={handleSaveAsImage}>Save as Image</Button>
            <SelectButton className="p-2" maxAttackRef={maxAttackRef} aveCostRef={aveCostRef} setSelectedCards={setSelectedCards} addReaction={addReaction} handle={handle} />
            <Button className="p-2" variant="secondary" onClick={handleClose}>Close</Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CardListModal