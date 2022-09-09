<script lang="ts">
    import { init, createBoard } from "./Minesweeper";
    import Dropdown from "./lib/Dropdown.svelte";
    import Modal from "./lib/Modal.svelte";

    let difficulty:string;
    $: difficulty = "Easy";
    
    let showGame:boolean;
    $: showGame = false;
    let winModal:Modal;
    let lossModal:Modal

    async function start() { showGame = true; init(setWin, setLoss); await createBoard(difficulty); }

    const setWin = (stat:boolean) => { winModal.show(stat); };
    const setLoss = (stat:boolean) => { lossModal.show(stat); };

    async function callback(e:Event) { const elem = <HTMLElement>e.currentTarget; difficulty = elem.innerHTML; await createBoard(difficulty); }
</script>

<div id="minesweeperCont">
	<div class="game-container{showGame ? '' : ' hidden'}">
        <div id="ms-header" class="header">
            <div class="diff-menu" style="width: min(22.222vw, 100px); height: min(8vw, 36px); margin: 0px 10px;">
                <Dropdown config={{
                    "default": "Easy",
                    "values": [
                        "Easy",
                        "Medium",
                        "Hard"
                    ]
                }} clickCallback={callback} />
            </div>
            <div class="flags-left">
                <img src="/img/flag.png" alt="flags" class="flags-left__img">
                <h2 id="flagsLeft" style="color: white; font-size: min(4.314159292035399vw, 19.5px); font-family: 'Baloo Tamma 2'">0</h2>
            </div>
        </div>
        <div id="canvas-container" class="canvas-container">
            <canvas id="gameBoard" style="position: absolute;"></canvas>
        </div>

        <Modal id="looseModal" bind:this={lossModal} showing='{false}'>
            <div class="modal">
                <h1 class="modalH1">Game Over</h1>
                <h3>Time: </h3>
                <div type="button" class="newGameButton" id="newGameOnLooseButton">NEW GAME</div>
            </div>
        </Modal>
    
        <Modal id="winModal" bind:this={winModal} showing='{false}'>
            <div class="modal">
                <h1 class="modalH1">Game Over</h1>
                <h3>Time: </h3>
                <div type="button" class="newGameButton" id="newGameOnWinButton">NEW GAME</div>
            </div>
        </Modal>
    </div>
    <div class="start-cont{!showGame ? '' : ' hidden'}">
        <div class="btn" on:click|stopPropagation="{start}">
            <div>Click to Start</div>
        </div>
    </div>
	<div class="rights">© Travis Lane 2022</div>
</div>

<style>
	@import "/theme.css";

    #minesweeperCont {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        position: relative;
    }

    .game-container {
        margin-top: 10%;

        position: relative;
    }

    .header {
        height: 40px;
        background-color: var(--bud-green);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .diff-menu { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .flags-left { width: 50%; height: 50%; display: flex; flex-direction: row; align-items: center; }
    .flags-left__img { height: 93.33%; }
    
    .canvas-container { position: relative; }

    .modal {
        width: auto;
        height: auto;

        background-color: var(--grey-secondary);

        padding: 7px 14px;
        border-radius: 4px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .modalH1 { margin: 5px 0px; }
    .newGameButton {
        height: 30px;
        width: 100px;

        cursor: pointer;
        background-color: var(--bud-green);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border-radius: 10px;
    }
    .newGameButton:hover { background-color: var(--bud-green__hover); }

    .start-cont {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .hidden { display: none; }

    .btn {
        height: 30px;
        width: 100px;

        cursor: pointer;
        background-color: var(--bud-green);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border-radius: 10px;
    }
    .btn:hover { background-color: var(--bud-green__hover); }

    .rights {
		position: absolute;
		right: 7px;
		bottom: 7px;

		color: #e7e7e7;
		font-size: 10px;
		
		opacity: 0.4;
	}
</style>