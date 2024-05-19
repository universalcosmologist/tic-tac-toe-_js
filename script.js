// placemark-->checkforwin-->end-->or switch turns-->if game till 9th draw-->restart
// listen all the boxes only once in one game
// placemark needs to know turn
// if marked cannot be changed 
// win--> row or column or diagonal
const board=document.querySelector('.board');
const cellElements=document.querySelectorAll('.cell');
const winning_msg=document.querySelector('.winning-message');
const restart_btn=document.querySelector('#restart_btn');
const winning_combn=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const msg=document.querySelector('[data-winning-message]');
let circleturn;
const circleClass='o';
const xClass='x';
startGame();
function startGame(){
    circleturn=false;
    cellElements.forEach((cell)=>{
        cell.addEventListener('click',clickhandler,{once:true});
    })
    hover_effect();
}
function clickhandler(e){
   const cell=e.target;
   let currClass=circleturn?circleClass:xClass;
   placemark(cell,currClass);
   if(checkwin(currClass)){
     endgame(false);
   }
   else if(checkdraw()){
      endgame(true);
   }
   swapTurns();
   hover_effect();
}
function placemark(cell,currClass){
    cell.classList.add(currClass);
}
function swapTurns(){
    circleturn=!circleturn;
}
function hover_effect(){
    // board should contain class acc to turn remove both if any already there
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if(circleturn){
        board.classList.add(circleClass);
    }
    else{
        board.classList.add(xClass);
    }
}
function checkwin(currClass){
    return winning_combn.some((combination)=>{
       return combination.every((index)=>{
             return cellElements[index].classList.contains(currClass);
        })
    })
}
function endgame(draw){
   if(draw){
        msg.innerText="draw!";
   }
   else{
    msg.innerText=`${circleturn?"O's":"X's"}wins!`;
   }
   winning_msg.classList.add('show');
}
function checkdraw(){
   return Array.from(cellElements).every((cell)=>{
        return cell.classList.contains(xClass)||cell.classList.contains(circleClass);
    })
}
restart_btn.addEventListener('click',new_game);
function new_game(){
    winning_msg.classList.remove('show');
    circleturn=false;
    cellElements.forEach((cell)=>{
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.addEventListener('click',clickhandler,{once:true});
    })
    hover_effect();
}