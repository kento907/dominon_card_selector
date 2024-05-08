import React from 'react'
import { useContext } from 'react';
import CardContext from '.';
import Button from 'react-bootstrap/Button';


const SelectButton = ({ maxAttackRef, aveCostRef, setSelectedCards, addReaction, handle}) => {

	// 複製
	const cardInfo = useContext(CardContext)

	const handleSelect = () => {
		// 設定
		const MAX_ATTACK = parseInt(maxAttackRef.current.value);
		const AVE_COST = parseFloat(aveCostRef.current.value);

		let cardList = [...cardInfo]
		let countAttack = 0;
		let moatFlag = false;
		let selectedCards = [];
		let averageCost = 0

		console.log("OK")
		while (true) {

			// カード選択
			const index = Math.floor(Math.random() * cardList.length); // cards.lengthは可変
      		const card = cardList[index];
			if ( selectedCards.includes(card) || (MAX_ATTACK === 0 && card.type === "Attack") ) {
				continue; // "すでに選択済み" or "Attackカードの上限0のときのAttack選択"：カード選ばない
			} else {
				// カード追加
				selectedCards.push(card);
			}

			// Attack選択時処理
			if (card.type === "Attack") {
				countAttack++;

				// Attackカードの上限処理
				if (countAttack === MAX_ATTACK) {
					cardList = cardList.filter(c => c.type !== "Attack");
				}

				// Attackカード選択：堀追加
				if (addReaction === true && moatFlag === false) {
					cardList.push({ number: 1, name: "堀", type: "Reaction", cost: 2 });
				}
			}
			// 堀選択：堀削除
			if (card.name === "堀") {
				moatFlag = true;
				cardList = cardList.filter(c => c.name !== "堀");
			}

			// 終了判定
			if (selectedCards.length === 10) {

				// 平均コスト計算
				averageCost = 0
				for(let i = 0; i < 10; i++) {
					averageCost += selectedCards[i].cost
				}
				averageCost /= 10;

				// 平均コスト一致：完了
				if (averageCost === AVE_COST) {
					break
				}

				// リセット
				selectedCards = []
				countAttack = 0;
				moatFlag = false;
				cardList = [...cardInfo]
			}
		};

		// カード情報を更新
		setSelectedCards(selectedCards, addReaction);
		// コスト順に並べ替え
		selectedCards.sort((a, b) => a.cost - b.cost);
		handle(selectedCards)
  };

  return (
		<Button variant="outline-primary" onClick={handleSelect} >Select</Button>
  )
}

export default SelectButton