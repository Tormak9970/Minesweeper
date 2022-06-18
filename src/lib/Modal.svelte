<script lang="ts">
    export let id:string;
    export let showing:boolean;

    export function show(stat:boolean) {
        showing = stat;
    }

    export function isShowing() { return showing; }
</script>

<div id="{id}" class="modal-container{showing ? "" : " hidden"}">
    <slot>

    </slot>
</div>

<style>
    .modal-container {
        z-index: 100;
        width: 100%;
        height: 100%;

        position: absolute;
        top: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgba(0.0, 0.0, 0.0, 0.7);
    }

    .hidden { display: none; }
</style>