
function drop(e) {
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = "block";
    
}

export default drop;