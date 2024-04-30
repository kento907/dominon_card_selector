import React from 'react'
import { useContext } from 'react';
import CardContext from '.';
import Button from 'react-bootstrap/Button';


const SelectButton = ({ maxAttackRef, aveCostRef, setSelectedCards, addReaction, handle}) => {

	// 複製
	const cardInfo = useContext(CardContext)
	let cardList = cardInfo

	const handleSelect = () => {

		// 以前の追加分削除
		if (cardList.length > 25) {
			cardList = cardList.slice(0, 25);
		}

		// 設定
		const MAX_ATTACK = maxAttackRef.current.value;
		const AVE_COST = aveCostRef.current.value;

		let countAttack = 0;
		let moatFlag = false;

		let selectedCards = [];
		while (selectedCards.length < 10) {

			// カード選択
			const index = Math.floor(Math.random() * cardList.length); // cards.lengthは可変
      		const card = cardList[index];
			if (selectedCards.includes(card)) {
				continue; // すでに選択済みのカードは選ばない
			} else {
				// カード追加
				selectedCards.push(card);
			}

			console.log(card)
			console.log(cardList)
			console.log(cardList.length)

			// Attackカード多い：堀選ばれやすくする
			if (addReaction === true) {
				// Attackカード選択：堀追加
				if (card.type === "Attack" && moatFlag === false) {
					cardList.push({ number: 1, name: "堀", type: "Reaction", cost: 2 });
					countAttack++;

					// Attack枚数が上限：cardsからAttackカード削除
					if (countAttack === MAX_ATTACK) {
						cardList = cardList.filter(c => c.type !== "Attack");
					}
				}
				// 堀選択：堀削除
				if (card.name === "堀") {
						moatFlag = true;
						cardList = cardList.filter(c => c.name !== "堀");
				}
			}

		};

		// カード情報を更新
		setSelectedCards(selectedCards, addReaction);

		// ------------------------- 表示 ---------------------------
		// コスト順に並べ替え
		selectedCards.sort((a, b) => a.cost - b.cost);
		// 選ばれたカードを表示
		let i=0;
		while (i < 10) {
			console.log(selectedCards[i].cost,selectedCards[i].name)
			i++
		}
		// ---------------------------------------------------------
		console.log(addReaction)

		handle(selectedCards)
  };


  return (
		<Button variant="outline-primary" onClick={handleSelect} >Select</Button>
  )
}

export default SelectButton