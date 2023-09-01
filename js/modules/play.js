export default function initPlay(){
    const playDivs = document.querySelectorAll('[data-play=div]')
    const playTurn = document.querySelector('[data-play=turn]')
    const playReset = document.querySelector('[data-play=reset]')
    const playResult = document.querySelector('[data-play=result]')
    let currentSelectionX = []
    let currentSelectionO = []
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
    let canPlay = true
    let count = 0
    let countEqual = 0

    playDivs.forEach((div, index) => {
        div.addEventListener('click', (e) => {
            if(canPlay){
                divHandleClick(e, index)
            }
        })
    })

    playReset.addEventListener('click', resetHandleClick)

    function divHandleClick(e, index){
        if(count % 2 == 0 && !isSelected(index)){
            e.currentTarget.innerText = 'X'
            currentSelectionX.push(index)
            verifyWin(currentSelectionX, e.currentTarget.innerText)
            count++
            console.log(count)
        }else if(count % 2 != 0 && !isSelected(index)){
            e.currentTarget.innerText = 'O'
            currentSelectionO.push(index)
            verifyWin(currentSelectionO, e.currentTarget.innerText)
            count++
            console.log(count)
        } 
        nextTurn(index)
    }

    function nextTurn(index){
        verifyDraw()
        if(currentSelectionO.includes(index)){
            playTurn.innerText = 'Jogando: X'
        }else if (currentSelectionX.includes(index)){
            playTurn.innerText = 'Jogando: O'
        } 
    }

    function resetHandleClick(){
        if(canPlay){
            playDivs.forEach(div => {
                div.innerText = ''
            })
            playTurn.innerText = 'Jogando: X'
            currentSelectionX = []
            currentSelectionO = []
            count = 0
            countEqual = 0
        }
    }

    function verifyDraw(){
        if(currentSelectionO.length + currentSelectionX.length === 9){
            playResult.innerText = 'EMPATE!'
            finishedGame()
        }
    }

    function verifyWin(array, winner){
        win.forEach(possibilityWin => {
            array.forEach(a => {
                if (possibilityWin.includes(a)){
                    countEqual++
                    if(countEqual == 3){
                        canPlay = false
                        playResult.innerText = 'Vencedor: ' + winner
                        finishedGame()
                    }
                }
            })
            countEqual = 0
        })
    }

    function finishedGame(){
        setTimeout(() => {
            count = 0
            countEqual = 0
            currentSelectionX = []
            currentSelectionO = []
            window.location.reload()
        }, 1500)
    }

    function isSelected(index){
        if(currentSelectionO.includes(index) || currentSelectionX.includes(index)){
            return true
        }else if(!currentSelectionO.includes(index) && !currentSelectionX.includes(index)){
            return false
        }
    }
}