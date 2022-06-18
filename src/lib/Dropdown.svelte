<script lang="ts">
    export let config:Config;
    export let clickCallback:Function;

    interface Config {
        default:string,
        values:string[]
    }

    const body = document.getElementsByTagName('body')[0];
        
    if (!body.hasAttribute('data-select-close')) {
        document.addEventListener("click", closeAllSelect);
        body.setAttribute('data-select-close', '');
    }

    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) { if (elmnt == y[i]) { arrNo.push(i) } else { y[i].classList.remove("select-arrow-active"); } }
        for (i = 0; i < xl; i++) { if (arrNo.indexOf(i)) { x[i].classList.add("select-hide"); } }
    }

    function aHandleClick(e:Event) {
        const target = <HTMLDivElement>e.currentTarget;
        closeAllSelect(target);
        target.nextElementSibling.classList.toggle("select-hide");
        target.classList.toggle("select-arrow-active");
    }

    function eHandleClick(e: Event) {
        const elem = <HTMLElement>e.currentTarget;
        let s = elem.parentElement.parentElement.parentElement.getElementsByTagName("select")[0];
        let sl = s.length;
        let h = elem.parentElement.previousElementSibling;

        for (let i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == elem.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = elem.innerHTML;

                let y = elem.parentElement.getElementsByClassName("same-as-selected");
                let yl = y.length;
                for (let k = 0; k < yl; k++) {
                    y[k].classList.toggle('same-as-selected');
                }

                elem.classList.toggle('same-as-selected');

                break;
            }
        }

        clickCallback(e);

        (h as HTMLElement).click();
    }
</script>

<div class="custom-select">
    <select>
        <option value="default">{config.default}</option>
        {#each config.values as val}
            <option value="{val.toLowerCase()}">{val}</option>
        {/each}
    </select>
        
    <div class="select-selected" on:click|stopPropagation="{aHandleClick}">{config.default}</div>
    <div class="select-items select-hide">
        {#each config.values as val}
            {#if val == config.default}
                <div id="{val}" class="same-as-selected" on:click|stopPropagation="{eHandleClick}">{val}</div>
            {:else}
                <div id="{val}" on:click|stopPropagation="{eHandleClick}">{val}</div>
            {/if}
        {/each}
    </div>
</div>

<style>
	@import "/theme.css";
    
    .custom-select {
        position: relative;
        font-size: 16px;
        width: 100px;
    }
    .custom-select > select { display: none; }
    
    .select-selected {
        background-color: var(--grey-secondary);
    }
    .select-selected::after {
        position: absolute;
        content: "";
        top: 38.88%;
        right: 10%;
        width: 0;
        height: 0;
        border: min(1.333vw, 6px) solid transparent;
        border-color: var(--font-color) transparent transparent transparent;
    }
    :global(.select-arrow-active::after) {
        border-color: transparent transparent var(--font-color) transparent !important;
        top: 7px !important;
    }
    .select-items > div, .select-selected {
        color: var(--font-color);
        padding: 2px 4px;
        border: 1px solid transparent;
        cursor: pointer;
    }
    .select-items {
        position: absolute;
        background-color: var(--grey-primary);
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
    }
    .select-items > div:hover { background-color: var(--grey-primary__hover); cursor: pointer; }

    .select-hide { display: none; }
    .same-as-selected {
        background-color: var(--grey-primary__hover);
        cursor: pointer;
    }
</style>