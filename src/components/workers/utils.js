function drop(e,board_id=null) {
  if(!board_id || board_id!=4){
    const card_id = e.dataTransfer.getData('card_id');
    const card = document.getElementById(card_id);
    card.style.display = "block";    
  }
    
}

const performSearch = (rows, term) => {
    const results = rows.filter(
      row => row.join(" ").toLowerCase().includes(term.toLowerCase())
    )
    return results;
  }

export default {drop, performSearch};