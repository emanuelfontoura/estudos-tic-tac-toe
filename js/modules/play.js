export default function initPlay(){
    const playDivs = document.querySelectorAll('[data-play=div]')
    const playTurn = document.querySelector('[data-play=turn]')
    const playReset = document.querySelector('[data-play=reset]')
    var count = 0

    playDivs.forEach(div => {
        div.addEventListener('click', divHandleClick)
    })

    playReset.addEventListener('click', resetHandleClick)

    function divHandleClick(e){
        if(count % 2 == 0){
            playTurn.innerText = 'Jogando: X'
            e.currentTarget.innerText = 'X'
        }else{
            playTurn.innerText = 'Jogando: O'
            e.currentTarget.innerText = 'O'
        } 
        nextTurn()
        count++
    }

    function nextTurn(){
        if((count+1) % 2 == 0){
            playTurn.innerText = 'Jogando: X'
        }else{
            playTurn.innerText = 'Jogando: O'
        } 
    }

    function resetHandleClick(){
        playDivs.forEach(div => {
            div.innerText = ''
            playTurn.innerText = 'Jogando: X'
        })
        count = 0
    }
}

