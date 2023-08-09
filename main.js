import './src/css/style.scss'

const battleground = document.querySelector('.battleground')
const playSections = battleground.querySelectorAll('.clickable')

let currentTurn = 'x';
let winner;

const battlegroundValues = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const updateBattlegroundValues = ()=>{
  if(playSections.length !== battlegroundValues.length) throw new Error()
}

playSections.forEach(item => {
  item.addEventListener("mouseenter", () => {
    if (item.className.includes("fill")) return
    item.classList.add(`hover-${currentTurn}`)
  })
})

playSections.forEach(item => {
  item.addEventListener("mouseleave", () => {
    if (item.className.includes("fill")) return
    item.classList.remove(`hover-${currentTurn}`)
  })
})

playSections.forEach(item => {
  item.addEventListener("click", () => {
    if (item.className.includes("fill")) return

    item.classList.remove("hover-x");
    item.classList.remove("hover-o");
    item.classList.add(`fill-${currentTurn}`)
    currentTurn = currentTurn === 'o' ? 'x' : 'o';
  })
})